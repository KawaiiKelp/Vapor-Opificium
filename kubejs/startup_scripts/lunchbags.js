// kubejs/startup_scripts/items.js

StartupEvents.registry('item', event => {
    // 1티어: 가죽 (3칸)
    event.create('lunchbag').displayName('가죽 도시락 봉투').maxStackSize(1)
    
    // 2티어: 청동 (6칸)
    event.create('lunchbox').displayName('청동 도시락통').maxStackSize(1)
    
    // 3티어: 강철 (9칸) - 기존 황금 대체
    event.create('steel_lunchbox').displayName('강철 도시락통').maxStackSize(1).rarity('rare')
})