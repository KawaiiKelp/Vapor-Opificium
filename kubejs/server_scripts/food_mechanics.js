// server_scripts/food_mechanics.js

// 최근 먹은 음식 몇 개까지 기억할지 (GTNH는 보통 5~10개 정도)
const HISTORY_SIZE = 10 

ItemEvents.foodEaten(event => {
    const { player, item } = event
    if (player.level.isClientSide()) return

    // 플레이어 데이터에서 음식 기록 불러오기
    let pData = player.persistentData
    let foodHistory = pData.foodHistory || [] // [ {id: "minecraft:apple", count: 1}, ... ]

    // 현재 먹은 음식 ID
    let currentFoodId = item.id

    // 역사 속에 이 음식이 얼마나 있나 체크 (많을수록 페널티)
    let duplicateCount = foodHistory.filter(h => h === currentFoodId).length
    
    // 페널티 계산 (공식은 네 맘대로 수정 가능)
    // 예: 역사에 1번 있으면 효율 90%, 2번 있으면 80% ... 5번 이상이면 0%
    // GTNH 느낌: 먹을 때마다 배고픔이 덜 차거나, 오히려 "Hunger" 디버프가 걸림
    
    if (duplicateCount > 0) {
        let penaltyLevel = duplicateCount
        
        // 경고 메시지
        player.statusMessage = Text.red(`질린다... (${currentFoodId}) - 맛 효율: ${Math.max(0, 100 - penaltyLevel * 20)}%`)

        // 페널티 적용: 배고픔 효과를 걸어서 방금 먹은 포만감을 깎아버림
        // (duration: 틱 단위, amplifier: 강도)
        // 많이 중복될수록 더 강한 배고픔 디버프
        player.potionEffects.add('minecraft:hunger', 20 * 5 * penaltyLevel, penaltyLevel)
        
        // 만약 진짜 악랄하게 하고 싶으면 '메스꺼움(Nausea)' 추가
        if (penaltyLevel >= 3) {
             player.potionEffects.add('minecraft:nausea', 20 * 10, 0)
        }
    } else {
        player.statusMessage = Text.green(`맛있다! 새로운 맛이야!`)
    }

    // 기록 갱신 (오래된 거 지우고 새거 추가)
    foodHistory.push(currentFoodId)
    if (foodHistory.length > HISTORY_SIZE) {
        foodHistory.shift() // 맨 앞 삭제
    }

    // 저장
    pData.foodHistory = foodHistory
})