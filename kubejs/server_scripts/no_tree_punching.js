BlockEvents.broken(event => {
    const { player, block } = event
    const heldItem = player.mainHandItem

    // 1. 크리에이티브 패스
    if (player.isCreative()) return

    // 2. 나무 확인
    if (!block.hasTag('minecraft:logs')) return

    // 3. 도끼 확인
    let isAxe = heldItem.hasTag('minecraft:axes') || heldItem.hasTag('forge:tools/axes')

    // 4. 도끼가 아니면?
    if (!isAxe) {
        // [수정됨] 토스트 알림 (Lang 키 적용)
        event.player.notify(Notification.make(toast => {
            toast.setItemIcon('minecraft:oak_log')
            toast.outlineColor = 0x2D1E16
            toast.backgroundColor = 0x261A1A
            toast.borderColor = 0x303030
            toast.duration = 4000 // 4초
            
            // [핵심] 텍스트를 키(Key)로 대체
            toast.text = [
                // 제목: 빨강 + 볼드 + 줄바꿈(\n)은 Lang 파일에서 처리하거나 여기서 배열로 나눔
                Component.translate('notification.kubejs.tree_fail.title').red().bold().append('\n'),
                
                // 설명 1: 회색
                Component.translate('notification.kubejs.tree_fail.desc_1').gray().append('\n'),
                
                // 아이템 강조: 금색 + 볼드
                Component.translate('notification.kubejs.tree_fail.item').gold().bold().append('\n'),
                
                // 설명 2: 회색
                Component.translate('notification.kubejs.tree_fail.desc_2').gray()
            ]
        }))
        
        // 사운드 (베이스 소리 퉁!)
        player.level.playSound(null, player.x, player.y, player.z, 'minecraft:block.note_block.bass', 'players', 1.0, 1.0)

        // FTB Quests 스테이지 부여
        if (!player.stages.has('tree_fail')) {
            player.stages.add('tree_fail')
        }

        event.cancel() // 채굴 취소
    }
})