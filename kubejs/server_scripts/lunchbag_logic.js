// kubejs/server_scripts/lunchbag_logic.js

const EAT_DELAY = 32; 

const LUNCHBAG_TIERS = {
    'kubejs:lunchbag': { slots: 3, description: '가죽 도시락 가방 (3칸)', autoEat: false },
    'kubejs:lunchbox': { slots: 6, description: '청동 도시락통 (6칸)', autoEat: false },
    'kubejs:steel_lunchbox': { slots: 9, description: '강철 도시락통 (9칸)', autoEat: true }
}

// 1. 우클릭 로직 (기존과 동일 - 유지)
ItemEvents.rightClicked(event => {
    const { player, item, level } = event
    const tier = LUNCHBAG_TIERS[item.id]
    if (!tier) return

    if (player.cooldowns.isOnCooldown(item.item)) return;

    if (!item.nbt) item.nbt = { Inventory: [] }
    let rawList = item.nbt.Inventory || []
    
    let inv = []
    rawList.forEach(tag => {
        if (tag && tag.id && tag.id !== 'minecraft:air') {
            inv.push({ id: tag.id, Count: tag.Count || 1, tag: tag.tag || {} })
        }
    })
    
    if (inv.length > tier.slots) inv = inv.slice(0, tier.slots);
    while(inv.length < tier.slots) inv.push({id: 'minecraft:air', Count: 0})

    // [모드 1] Shift + 우클릭: 충전
    if (player.isCrouching()) {
        let changed = false
        if (rawList.length !== inv.length) changed = true;

        for (let i = 0; i < 36; i++) {
            let pItem = player.inventory.getItem(i)
            if (!pItem.isEmpty() && pItem.id !== item.id) {
                let kStack = Item.of(pItem.id)
                let isFood = false
                if (kStack.foodProperties || kStack.isEdible()) isFood = true
                else if (kStack.item && (kStack.item.foodProperties || (kStack.item.isEdible && kStack.item.isEdible()))) isFood = true
                
                if (isFood) { 
                    let existingIndex = inv.findIndex(x => x.id === pItem.id && x.Count < 64)
                    if (existingIndex !== -1) {
                        let space = 64 - inv[existingIndex].Count
                        let move = Math.min(space, pItem.count)
                        if (move > 0) {
                            inv[existingIndex].Count += move
                            pItem.count -= move
                            changed = true
                        }
                    } else {
                        let emptyIndex = inv.findIndex(x => x.id === 'minecraft:air' || x.Count <= 0)
                        if (emptyIndex !== -1) {
                            inv[emptyIndex] = { id: pItem.id, Count: pItem.count, tag: pItem.nbt || {} }
                            pItem.count = 0
                            changed = true
                        }
                    }
                }
            }
        }
        
        if (changed) {
            let newNbt = item.nbt
            newNbt.Inventory = inv
            item.nbt = newNbt
            player.inventory.setChanged()
            
            level.playSound(null, player.x, player.y, player.z, 'entity.item.pickup', 'players', 0.5, 1.0)
            player.displayClientMessage(Text.of('도시락 충전 완료!').green(), true)
        } else {
            if (rawList.length > tier.slots) {
                 let newNbt = item.nbt
                 newNbt.Inventory = inv
                 item.nbt = newNbt
                 player.inventory.setChanged()
                 player.displayClientMessage(Text.of('슬롯 제한 초과분 삭제됨.').red(), true)
            } else {
                player.displayClientMessage(Text.of('충전할 음식이 없거나 가방이 꽉 찼습니다.').yellow(), true)
            }
        }
    } 
    // [모드 2] 그냥 우클릭: 수동 섭취
    else {
        if (rawList.length > tier.slots) {
             let newNbt = item.nbt
             newNbt.Inventory = inv
             item.nbt = newNbt
             player.inventory.setChanged()
        }

        if (player.foodLevel < 20) {
            let ate = false
            for (let i = 0; i < inv.length; i++) {
                let data = inv[i]
                if (data && data.id && data.id !== 'minecraft:air' && (data.Count || 0) > 0) {
                    
                    let stack = Item.of(data.id)
                    let props = null
                    if (stack.foodProperties) props = stack.foodProperties
                    else if (stack.item && stack.item.foodProperties) props = stack.item.foodProperties
                    else { try { if (stack.getItem().getFoodProperties) props = stack.getItem().getFoodProperties(stack, player) } catch (e) {} }

                    if (props) {
                        let oldFood = player.foodLevel
                        let newFood = Math.min(20, oldFood + props.nutrition)
                        player.foodLevel = newFood
                        
                        let addedSat = props.nutrition * props.saturationModifier * 2.0
                        let newSat = Math.min(newFood, player.saturation + addedSat)
                        player.saturation = newSat
                        
                        level.playSound(null, player.x, player.y, player.z, 'entity.generic.eat', 'players', 0.8, 1.0)
                        
                        player.addItemCooldown(item, EAT_DELAY)
                        
                        data.Count = (data.Count || 1) - 1
                        if (data.Count <= 0) inv[i] = {id: 'minecraft:air', Count: 0}
                        
                        let newNbt = item.nbt
                        newNbt.Inventory = inv
                        item.nbt = newNbt
                        player.inventory.setChanged()
                        
                        player.displayClientMessage(Text.of(`냠냠! (${stack.displayName.string})`).green(), true)
                        ate = true
                        break 
                    }
                }
            }
            if (!ate) player.displayClientMessage(Text.of('가방에 먹을 게 없습니다!').red(), true)
        } 
        else {
            let total = inv.reduce((acc, cur) => acc + (cur.id !== 'minecraft:air' ? cur.Count : 0), 0)
            player.displayClientMessage(Text.of(`${tier.description} - 음식: ${total}개 (배부름)`).aqua(), true)
        }
    }
})

// 2. 자동 취식 로직
PlayerEvents.tick(event => {
    const player = event.player
    if (player.age % 20 != 0) return 
    if (player.foodLevel >= 20) return;

    let bag = null
    for (let i = 0; i < player.inventory.containerSize; i++) {
        let slotItem = player.inventory.getItem(i)
        if (LUNCHBAG_TIERS[slotItem.id] && LUNCHBAG_TIERS[slotItem.id].autoEat) {
            bag = slotItem
            break
        }
    }
    
    if (!bag || !bag.nbt || !bag.nbt.Inventory) return
    let inv = bag.nbt.Inventory
    if (!Array.isArray(inv)) return 

    const tier = LUNCHBAG_TIERS[bag.id];
    const limit = tier ? tier.slots : 3;

    let ate = false
    
    for (let i = 0; i < Math.min(inv.length, limit); i++) {
        let data = inv[i]
        
        if (data && data.id && data.id !== 'minecraft:air' && (data.Count || 0) > 0) {
            
            let stack = Item.of(data.id)
            let props = null
            
            if (stack.foodProperties) props = stack.foodProperties
            else if (stack.item && stack.item.foodProperties) props = stack.item.foodProperties
            else { try { if (stack.getItem().getFoodProperties) props = stack.getItem().getFoodProperties(stack, player) } catch (e) {} }

            if (props) {
                let oldFood = player.foodLevel
                let newFood = Math.min(20, oldFood + props.nutrition)
                player.foodLevel = newFood
                
                let addedSat = props.nutrition * props.saturationModifier * 2.0
                let newSat = Math.min(newFood, player.saturation + addedSat)
                player.saturation = newSat
                
                // [랜덤 사운드 적용] 50% 확률로 extend 또는 contract
                // 피치를 2.0으로 높여서 '치익-!' 하는 기계음 느낌을 살림
                let mechSound = Math.random() > 0.5 ? 'block.piston.extend' : 'block.piston.contract';
                
                // 월드 좌표에 소리 재생 (안전한 방식)
                player.level.playSound(null, player.x, player.y, player.z, mechSound, 'players', 0.5, 2.0)
                player.level.playSound(null, player.x, player.y, player.z, 'entity.generic.eat', 'players', 0.5, 1.0)

                player.displayClientMessage(Text.of('⚡ 영양소 주입 중...').green(), true)

                data.Count = (data.Count || 1) - 1
                if (data.Count <= 0) {
                    inv[i] = {id: 'minecraft:air', Count: 0}
                }
                
                ate = true
                break 
            }
        }
    }
    
    if (ate) {
        let newNbt = bag.nbt
        newNbt.Inventory = inv
        bag.nbt = newNbt
        player.inventory.setChanged()
    }
})