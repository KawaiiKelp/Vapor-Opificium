Ponder.registry((event) =>
{
    event.create(["gtceu:coke_oven", "gtceu:coke_oven_bricks", "gtceu:coke_oven_hatch"]).scene("coke_oven_guide_3", "코크스 오븐 해치 사용법", "kubejs:coke_oven", (scene, util) => {
        scene.configureBasePlate(0, 0, 5);
        scene.showBasePlate();

        for (let y = 1; y <= 3; y++) {
            for (let x = 3; x >= 1; x--) {
                for (let z = 1; z <= 3; z++) {
                scene.world.showSection([x, y, z], Facing.DOWN);
                scene.idle(3);
                }
            }
        }

        const hatchPos = util.select.position(2, 3, 2);
        const controllerPos = util.select.position(2, 2, 1);

        scene.text(60, "코크스 오븐 해치는 코크스 오븐을 자동화하는 데 사용됩니다.", [2, 2, 2]).placeNearTarget().attachKeyFrame();
        scene.idle(60);
    });
});