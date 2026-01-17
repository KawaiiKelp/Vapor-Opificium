// JEI에서 숨기기
JEIEvents.hideItems(event => {
    const hideId = [
        'create:water_wheel',
        'create:large_water_wheel',
        'create:windmill_bearing',
        'create:steam_engine',
        'create:white_sail',
        'create:hand_crank',
        'create:copper_valve_handle',
        'create:valve_handle',
        'create_new_age:generator_coil',
        'create_new_age:carbon_brushes'
    ]

    hideId.forEach(id => {
        event.hide(id)
    })
})

// EMI에서 숨기기
// KubeJS 버전에 따라 EMIEvents가 없을 수도 있는데, 보통 JEI 숨기면 같이 숨겨짐.
// 만약 안 숨겨지면 아래 주석 풀고 적용
/*
EMIEvents.hideItems(event => {
    const hideId = [
       // 위랑 똑같은 리스트
    ]
    hideId.forEach(id => {
        event.hide(id)
    })
})
*/