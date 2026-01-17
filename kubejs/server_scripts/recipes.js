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

    // 1. 가죽 도시락 (Lunchbag) - 원시 시대
    // 가죽 3개 + 실(String) -> 초반 인벤토리 압박 해소용
    event.shaped('kubejs:lunchbag', [
        ' S ',
        'LPL',
        ' L '
    ], {
        S: 'minecraft:string',
        L: 'kubejs:tanned_leather',
        P: 'minecraft:paper'
    })

    // 2. 청동 도시락통 (Lunchbox) - 스팀 시대 (Bronze Age)
    // 원래 철이었던 걸 청동(Bronze)으로 변경. 
    // GT 스타일: 판(Plate)과 링(Ring) 혹은 나사(Screw) 사용 (여기선 간단히)
    event.shaped('kubejs:lunchbox', [
        ' R ',
        'PBP',
        'PPP'
    ], {
        R: '#forge:rods/bronze',       // 청동 막대
        P: '#forge:plates/bronze',     // 청동 판
        B: 'kubejs:lunchbag'           // 이전 티어 업그레이드
    })

    // 3. 강철 도시락통 (Steel Lunchbox) - LV 시대
    // 청동 -> 강철 업그레이드
    // LV에 걸맞는 업그레이드!
    event.shaped('kubejs:steel_lunchbox', [
        ' P ',
        'PBP',
        'SPS'
    ], {
        S: '#forge:screws/steel',       // 강철 나사
        P: '#forge:plates/steel',       // 강철 판
        B: 'kubejs:lunchbox'           // 이전 티어
    })

    event.remove({ output: 'sophisticatedbackpacks:feeding_upgrade' })

    // Feeding Upgrade (MV Mid)
    event.shaped('sophisticatedbackpacks:feeding_upgrade', [
        'RCR', // R: 로봇팔, C: 회로
        'PUP', // P: 플라스틱, U: 업그레이드 베이스
        'PBP'  // P: 플라스틱, B: 황금 도시락
    ], {
        R: 'gtceu:mv_robot_arm',
        C: '#gtceu:circuits/mv',        // Good Electronic Circuit
        P: 'gtceu:polyethylene_plate',  // 플라스틱 판 (MV부터 나옴). 없으면 'gtceu:aluminium_plate'
        U: 'sophisticatedbackpacks:upgrade_base',
        B: 'kubejs:steel_lunchbox'     // [핵심] 도시락통을 칩으로 변환!
    })

    event.remove({ output: 'sophisticatedbackpacks:advanced_feeding_upgrade' })

    // Advanced Feeding Upgrade (HV)
    event.shaped('sophisticatedbackpacks:advanced_feeding_upgrade', [
        'RDR', // R: HV로봇팔, D: 데이터/센서
        'SFS', // S: 스테인리스, F: 일반 피딩 업그레이드
        'SCS'  // C: HV 회로
    ], {
        R: 'gtceu:hv_robot_arm',
        D: 'gtceu:hv_sensor',           // 센서 (음식 감지용)
        S: 'gtceu:stainless_steel_plate', // 스테인리스 (위생)
        F: 'sophisticatedbackpacks:feeding_upgrade', // 하위 티어 업그레이드
        C: '#gtceu:circuits/hv'         // Advanced Integrated Circuit
    })

    
    // 가죽 도시락 비우기
    event.shapeless('kubejs:lunchbag', ['kubejs:lunchbag']).id('kubejs:clear_lunchbag')
    // 청동 도시락 비우기
    event.shapeless('kubejs:lunchbox', ['kubejs:lunchbox']).id('kubejs:clear_lunchbox')
    // 황금 도시락 비우기
    event.shapeless('kubejs:steel_lunchbox', ['kubejs:steel_lunchbox']).id('kubejs:clear_steel_lunchbox')
})