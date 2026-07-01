const AABB = Java.loadClass('net.minecraft.world.phys.AABB');
const Vec3 = Java.loadClass('net.minecraft.world.phys.Vec3');

Ponder.registry((event) => 
{
    const TICK_LENGTH = 20;
    const IDLE_TICK_LENGTH = TICK_LENGTH * 3;

  event.create(["gtceu:coke_oven", "gtceu:coke_oven_bricks", "gtceu:coke_oven_hatch"]).scene("coke_oven_guide_1", "코크스 오븐 건설", "kubejs:coke_oven", (scene, util) => {
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
    // 함수 호출! 좌표는 [1, 1, 1, 4, 4, 4] 이렇게 넣어야 3x3x3이 딱 맞아♡
    let center = centerAnimatedOutline(scene, PonderPalette.GREEN, [1, 1, 1, 4, 4, 4], 60);
    scene.text(80, "코크스 오븐이 준비되었습니다!", center)
      .colored(PonderPalette.GREEN)
      .placeNearTarget()
      .attachKeyFrame();
    scene.idle(60);
    scene.rotateCameraY(360);
    scene.idle(20);
    scene.markAsFinished();
    });
});

/**
 * 상자가 중앙에서부터 펴지는 연출 (수학 계산 직접 함♡)
 */
function centerAnimatedOutline(scene, color, coords, duration) {
    // 배열에서 좌표 꺼내기 (변수로 정리 좀 해, 보기 힘들잖아)
    let minX = coords[0];
    let minY = coords[1];
    let minZ = coords[2];
    let maxX = coords[3];
    let maxY = coords[4];
    let maxZ = coords[5];

    // 1. 목표 상자 만들기
    let endBB = new AABB(minX, minY, minZ, maxX, maxY, maxZ);
    
    // 2. 중앙 좌표 직접 계산하기 (더하고 나누기 2! 설마 이것도 몰라?)
    // 자바 객체 호환성 때문에 오류 나니까, 그냥 JS에서 숫자로 계산하는 게 확실해.
    let cX = (minX + maxX) / 2.0;
    let cY = (minY + maxY) / 2.0;
    let cZ = (minZ + maxZ) / 2.0;

    // 3. 점 상자 만들기 (크기가 없는 상자)
    // 위에서 구한 숫자를 그대로 넣으니까 절대 오류 안 나♡
    let startBB = new AABB(cX, cY, cZ, cX, cY, cZ);

    // 4. 애니메이션 실행
    scene.overlay.chaseBoundingBoxOutline(color, endBB, startBB, 1);
    scene.overlay.chaseBoundingBoxOutline(color, endBB, endBB, duration);

    // 5. 텍스트 띄울 때 쓰라고 중앙 좌표(Vec3) 만들어서 던져줌
    return new Vec3(cX, cY, cZ);
}