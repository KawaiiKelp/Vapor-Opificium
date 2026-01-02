// 밴 할 아이템 목록 (정규식)
const BANNED_TOOLS = /minecraft:(wooden|stone)_(sword|hoe|axe|pickaxe|shovel)/

BlockEvents.broken(event => { // 여기도 .broken 으로 변경
    let player = event.player
    let heldItem = player.mainHandItem

    if (player.isCreative()) return

    if (BANNED_TOOLS.test(heldItem.id)) {
        event.cancel()
        player.setStatusMessage(Text.of("§c이 도구는 너무 조잡해서 사용할 수 없습니다.").red())
    }
})

// 엔티티 공격 막기 (entityInteracts -> entityInteracted)
ItemEvents.entityInteracted(event => {
    let player = event.player
    let heldItem = player.mainHandItem
    
    if (BANNED_TOOLS.test(heldItem.id)) {
        event.cancel()
        player.setStatusMessage(Text.of("§c이 무기는 사용할 수 없습니다.").red())
    }
})