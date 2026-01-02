ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event

    // 명령어: /stage_reset
    event.register(
        Commands.literal('stage_reset')
        .executes(ctx => {
            const player = ctx.source.player
            
            // 'tree_fail' 스테이지 삭제
            if (player.stages.has('tree_fail')) {
                player.stages.remove('tree_fail')
                player.tell(Text.of("§e[System] 'tree_fail' 스테이지가 초기화되었습니다."))
            } else {
                player.tell(Text.of("§c[System] 해당 스테이지가 없습니다."))
            }
            return 1
        })
    )
})