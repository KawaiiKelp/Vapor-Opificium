BlockEvents.broken(event => {
    // KubeJS 6 스타일 구조 분해 할당
    const { player, block } = event
    const heldItem = player.mainHandItem

    // 1. 크리에이티브 모드면 통과
    if (player.isCreative()) return

    // 2. 나무(Logs) 태그가 있는지 확인
    if (!block.hasTag('minecraft:logs')) return

    // 3. 도끼인지 확인 (바닐라 + 모드 도끼 통합 태그)
    let isAxe = heldItem.hasTag('minecraft:axes') || heldItem.hasTag('forge:tools/axes')

    // 4. 도끼가 아니면?
    if (!isAxe) {
        // [수정됨] 니가 가져온 문법 적용 (Action Bar 출력)
        event.player.notify(Notification.make(toast => {
            toast.setItemIcon('minecraft:oak_log')
            toast.outlineColor = 0x2D1E16
            toast.backgroundColor = 0x261A1A
            toast.borderColor = 0x303030
            toast.duration = 4000
            toast.text = [
                Component.of('§c⚠ 채굴 불가 ⚠\n').bold(),
                Component.of('나무가 너무 단단합니다.\n').color('gray'),
                Component.of('부싯돌 등급 이상의 도끼').color('gold').bold(),
                Component.of("가 필요할 것 같습니다...").color('gray')
            ]
        }))
        
        // (선택) 팅! 하는 소리 추가해서 피드백 주기
        // 소리가 안 나면 내가 캐고 있는 건지 렉 걸린 건지 모르니까 넣는 게 좋음
        player.level.playSound(null, player.x, player.y, player.z, 'minecraft:block.note_block.bass', 'players', 1.0, 1.0)

        // [★추가된 코드★] FTB Quests 연동: 스테이지 부여
        // 플레이어에게 'tree_fail' 스테이지가 없으면 부여함
        if (!player.stages.has('tree_fail')) {
            player.stages.add('tree_fail')
            // 스테이지가 부여되는 순간, FTB Quests가 이걸 감지하고 퀘스트를 '자동 완료' 시킴.
        }

        event.cancel() // 채굴 취소
    }
})