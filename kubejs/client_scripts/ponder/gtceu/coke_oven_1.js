Ponder.registry((event) => 
{
    const TICK_LENGTH = 20;
    const IDLE_TICK_LENGTH = TICK_LENGTH * 3;

  event.create("gtceu:coke_oven").scene("coke_oven_guide_1", "코크스 오븐 건설", "kubejs:coke_oven", (scene, util) => {
    scene.configureBasePlate(0, 0, 5);
    scene.showBasePlate();
  
    for (let y = 1; y <= 3; y++) {
      for (let x = 3; x >= 1; x--) {
        for (let z = 1; z <= 3; z++) {
          scene.world.showSection([x, y, z], Facing.DOWN);
          scene.idle(2);
        }
      }
    }
    
    const centerBlockPos = util.grid.at(2, 2, 2);
    const hatchPos = util.select.position(2, 3, 2);

    scene.idle(20);
    scene.text(60, "코크스 오븐은 3x3x3 멀티블록 구조로 형성됩니다.", [2, 2.5, 1]).placeNearTarget().attachKeyFrame();
    scene.idle(80);
    scene.world.hideSection([1, 3, 1, 3, 3, 3], Facing.UP);
    scene.idle(60);
    scene.overlay.showOutline(PonderPalette.RED, centerBlockPos, util.select.position(2, 2, 2), 40);
    scene.text(40, "중앙은 반드시 비워야 합니다!", [2, 3.5, 2]).colored(PonderPalette.RED).placeNearTarget().attachKeyFrame();
    scene.idle(60);
    scene.world.showSection([1, 3, 1, 3, 3, 3], Facing.DOWN);
    scene.idle(40);
    scene.overlay.showOutline(PonderPalette.WHITE, hatchPos, util.select.position(2, 3, 2), 60);
    scene.text(40, "해치는 멀티블록의 어느 위치에나 설치할 수 있습니다.", [2, 4.5, 2]).placeNearTarget().attachKeyFrame();
    scene.idle(60);
    scene.world.setBlock([2, 3, 2], "gtceu:coke_oven_bricks", false);
    scene.idle(10);
    scene.world.setBlock([1, 2, 2], "gtceu:coke_oven_hatch", false);
    scene.world.modifyBlock([1, 2, 2], (state) => state.with("facing", "west"), true);
    scene.overlay.showOutline(PonderPalette.WHITE, util.select.position(1, 2, 2), util.select.position(1, 2, 2), 60);
    scene.idle(80);
    scene.overlay.showOutline(PonderPalette.GREEN, util.select.position(1, 3, 1), util.select.fromTo(1, 3, 1, 3, 1, 3), 60);
    scene.text(80, "코크스 오븐이 준비되었습니다!", [2, 2.5, 1]).placeNearTarget();
    scene.idle(60);
    scene.rotateCameraY(360);
    scene.idle(20);
    scene.markAsFinished();
    });
});