// kubejs/server_scripts/no_wooden_stone_tools.js

// 밴 할 아이템 목록 (정규식)
const BANNED_TOOLS = /minecraft:(wooden|stone)_(sword|hoe|axe|pickaxe|shovel)/;

// 1. 블록 파괴 금지 (채굴) - 이건 잘 된다며? 그대로 유지.
BlockEvents.broken((event) => {
  let player = event.player;
  let heldItem = player.mainHandItem;

  if (player.isCreative()) return;

  if (BANNED_TOOLS.test(heldItem.id)) {
    event.player.notify(
      Notification.make((toast) => {
        toast.setItemIcon("minecraft:stone_pickaxe");
        toast.outlineColor = 0x3b3736;
        toast.backgroundColor = 0x474040;
        toast.borderColor = 0x303030;
        toast.duration = 2000;
        toast.text = [
            Component.translate('notification.kubejs.tool_ban.mining.title').red().bold().append('\n'),
            Component.translate('notification.kubejs.tool_ban.mining.desc').gray()
        ];
      })
    );

    player.level.playSound(null, player.x, player.y, player.z, 'minecraft:block.note_block.bass', 'players', 1.0, 1.0)

    event.cancel();
  }
});

// 2. 엔티티 데미지 금지 (공격) - [핵심 수정]
EntityEvents.hurt(event => {
    // 데미지를 준 주체(Attacker)가 누구냐?
    const attacker = event.source.actual
    
    // 때린 놈이 없거나 플레이어가 아니면 패스
    if (!attacker || !attacker.isPlayer()) return

    const player = attacker
    const heldItem = player.mainHandItem

    // 크리에이티브면 패스
    if (player.isCreative()) return

    // 손에 든 게 금지된 도구면?
    if (BANNED_TOOLS.test(heldItem.id)) {
        // 토스트 알림 띄우기
        player.notify(
            Notification.make((toast) => {
                toast.setItemIcon("minecraft:stone_sword");
                toast.outlineColor = 0x3b3736;
                toast.backgroundColor = 0x474040;
                toast.borderColor = 0x303030;
                toast.duration = 1000;
                toast.text = [
                    Component.translate('notification.kubejs.tool_ban.attack.title').red().bold().append('\n'),
                    Component.translate('notification.kubejs.tool_ban.attack.desc').gray()
                ];
            })
        );
        
        player.level.playSound(null, player.x, player.y, player.z, 'minecraft:block.note_block.digeridoo', 'players', 1.0, 0.5)

        event.cancel() // 데미지 무효화
    }
})