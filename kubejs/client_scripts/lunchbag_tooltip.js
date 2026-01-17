// kubejs/client_scripts/lunchbag_tooltip.js

const LUNCHBAG_INFO = {
    'kubejs:lunchbag': { 
        name: '가죽 도시락 봉투', 
        slots: 3, 
        auto: false,
        color: 'white' 
    },
    'kubejs:lunchbox': { 
        name: '청동 도시락통', 
        slots: 6, 
        auto: false, 
        color: 'gold' // 청동 느낌
    },
    'kubejs:steel_lunchbox': { 
        name: '강철 도시락통', 
        slots: 9, 
        auto: true, 
        color: 'gray' // 강철 느낌
    }
}

ItemEvents.tooltip(event => {
    event.addAdvanced(Object.keys(LUNCHBAG_INFO), (item, advanced, text) => {
        let info = LUNCHBAG_INFO[item.id]
        
        // 1. 기능 설명
        if (info.auto) {
            text.add(1, Text.of('⚡ 자동 취식 기능 탑재').green())
        } else {
            text.add(1, Text.of('✋ 수동 섭취 (우클릭)').gold())
        }
        
        // 2. 용량 표시
        text.add(2, Text.of(`저장 공간: ${info.slots}칸`).aqua())

        // 3. 조작법
        text.add(3, Text.gray('Shift + 우클릭: 인벤토리 음식 흡수'))
        
        if (!event.isShift()) {
            text.add(4, Text.darkGray('[Shift를 눌러 내용물 보기]'))
            return
        }

        let inv = item.nbt?.Inventory || []
        let foodCount = 0
        let displayLines = []

        inv.forEach(data => {
            if (data.id && data.id !== 'minecraft:air' && data.Count > 0) {
                let stack = Item.of(data.id)
                displayLines.push(Text.of(`- ${stack.displayName.string} x${data.Count}`).white())
                foodCount++
            }
        })
        
        text.add(Text.of('=== 도시락 내용물 ===').blue())
        
        if (foodCount > 0) {
            displayLines.forEach(line => text.add(line))
            if (foodCount >= info.slots) {
                text.add(Text.of('(가방이 꽉 찼습니다)').red())
            } else {
                text.add(Text.of(`(빈 공간: ${info.slots - foodCount}칸)`).gray())
            }
        } else {
            text.add(Text.gray('(비어 있음)'))
        }
    })
})