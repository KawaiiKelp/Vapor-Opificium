ServerEvents.recipes(event => {
    // 16가지 색깔 루프 돌리기
    const colors = [
        'white', 'orange', 'magenta', 'light_blue', 'yellow', 'lime', 'pink', 'gray',
        'light_gray', 'cyan', 'purple', 'blue', 'brown', 'green', 'red', 'black'
    ]
    
    // 기존 레시피 삭제
    event.remove({ input: '#minecraft:wool', output: 'minecraft:string' })
    event.remove({ id: 'minecraft:white_wool_from_string' })
    event.remove({ id: /minecraft:.*_carpet/ })
    event.remove({ output: 'minecraft:crafting_table' })
    
    // 나무/돌 도구 레시피 삭제 (정규식)
    event.remove({ output: /minecraft:(wooden|stone)_(sword|hoe|axe|pickaxe|shovel)/ })

    // [수정됨] 제작대 레시피
    event.shaped(
        'minecraft:crafting_table', // Item.of 굳이 안 써도 됨
        [
            'FF', // 2글자
            'WW'  // 2글자 (2x2로 딱 맞춤)
        ],
        {
            F: 'minecraft:flint',
            W: '#minecraft:logs'
        }
    ).id('kubejs:crafting_table_from_flint') // 고유 ID 부여 (충돌 방지)

    event.shaped('kubejs:flint_shears', [
        'F ',
        ' F'
    ], {
        F: 'minecraft:flint'
    })

    colors.forEach(color => {
        // [수정됨] 유저 제보 기반 ID: comforts:sleeping_bag_white
        let sleepingBagId = `comforts:sleeping_bag_${color}`
        let woolId = `minecraft:${color}_wool`
        let carpetId = `minecraft:${color}_carpet`

        // 안전장치: 아이템 진짜 있는지 확인하고 넣음
        if (Item.exists(sleepingBagId)) {
            // 1. 기존 레시피 삭제
            event.remove({ output: sleepingBagId })

            // 2. GT 스타일 레시피 추가 (양털 + 양탄자 + 말렛)
            event.shaped(sleepingBagId, [
                'WWW',
                'CCC',
                ' M '
            ], {
                W: woolId,
                C: carpetId,
                M: '#gtceu:tools/crafting_mallets' 
            }).damageIngredient('#gtceu:tools/crafting_mallets' )
        } else {
            // 혹시라도 ID가 틀렸으면 로그에 뜸
            console.warn(`[Warning] 침낭 아이템을 찾을 수 없음: ${sleepingBagId}`)
        }
    })
})