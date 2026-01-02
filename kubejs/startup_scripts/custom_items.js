StartupEvents.registry('item', event => {
    event.create('flint_shears', 'shears') // 타입: 가위(shears)
        .displayName('Flint Shears') // 이름
        .maxDamage(64) // 내구도: 철 가위(238)보다 훨씬 낮게 (창렬하게)
        .tag('minecraft:shears') // 가위 태그 (양털 깎기, 나뭇잎 캐기 가능)
})