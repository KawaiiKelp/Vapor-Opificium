Ponder.registry((event) => 
{
  event.create("gtceu:coke_oven").scene("coke_oven_guide_2", "코크스 오븐 가이드", "kubejs:coke_oven", (scene, util) => {
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

    scene.idle(20);
    scene.text(60, "코크스 오븐은 더 나은 연료인 코크스를 생산하는 데 필요한 멀티블록입니다.", [2, 2, 2]).placeNearTarget().attachKeyFrame();
    scene.idle(80);
    scene.text(40, "코크스 생산과 함께, 부산물로 크레오소트유를 생산합니다.", [2, 2, 2]).placeNearTarget();
    scene.idle(60);
    scene.overlay.showOutline(PonderPalette.WHITE, hatchPos, util.select.position(2, 3, 2), 80);
    
    scene
      .text(40, "먼저 해치에 재료를 공급하세요.", [2, 4.5, 2]).placeNearTarget().attachKeyFrame();

    scene.idle(30);
    scene.showControls(20, [2, 5, 2], "down").rightClick().withItem("minecraft:coal");
    scene.idle(10);
        // 1. 블록을 강제로 다시 설치 (기존 데이터 초기화)
    scene.world.setBlock([2, 2, 1], "gtceu:coke_oven", false);

    // 2. NBT 데이터 주입 (연료 + 작동 상태)
    scene.world.modifyBlockEntityNBT([2, 2, 1], (nbt) => {
        // 멀티블록 완성 상태
        nbt.isFormed = true;
        
        // 핵심: 연료(석탄)를 강제로 넣어줍니다. 
        // 기계가 틱(Tick)을 돌 때 "연료가 있네?" 하고 작동을 유지하게 만듭니다.
        nbt.importItems = {
            storage: {
                Size: 1,
                Items: [
                    {
                        Slot: 0,
                        id: "minecraft:coal",
                        Count: 64,
                        // 필요한 경우 NBT 데이터 추가 가능
                    }
                ]
            }
        };

        // 기계 두뇌(Logic)를 작동 상태로 설정
        nbt.recipeLogic = {
            isActive: true,
            status: "working",
            progress: 10,       // 진행도 약간 올려두기
            duration: 900,      // 전체 시간
            totalContinuousRunningTime: 16
        };

        // 렌더링(겉모습) 강제 설정
        nbt.renderState = {
            Name: "gtceu:coke_oven",
            Properties: {
                is_formed: "true",
                recipe_logic_status: "working"
            }
        };
    });
    scene.idle(60);
    scene.overlay.showOutline(PonderPalette.WHITE, controllerPos, util.select.position(2, 2, 1), 60);
    scene.text(60, "이제 코크스 오븐이 재료를 가공하기 시작합니다.", [2, 2.5, 1]).placeNearTarget();
    scene.idle(120);

    scene.world.modifyBlockEntityNBT([2, 2, 1], (nbt) => {
      // 1. 연료(석탄) 압수 (가장 중요!)
      // Items 배열을 비워버리면 됩니다.
      nbt.importItems = {
          storage: {
              Size: 1,
              Items: [] 
          }
      };

      // 2. 기계 두뇌 끄기
      nbt.recipeLogic = nbt.recipeLogic || {};
      nbt.recipeLogic.isActive = false;       // 작동 중지
      nbt.recipeLogic.status = "suspend";     // 상태: 일시정지(또는 대기)
      nbt.recipeLogic.progress = 0;           // 진행도 0으로 초기화

      // 3. 겉모습(텍스처) 끄기
      // 불 들어온 텍스처를 다시 꺼진 상태로 돌립니다.
      nbt.renderState = nbt.renderState || {};
      nbt.renderState.Properties = nbt.renderState.Properties || {};
      nbt.renderState.Properties.recipe_logic_status = "idle"; // working -> idle (대기)
    });

    scene.idle(40);
    scene.text(40, "완성된 코크스는 컨트롤러에서 꺼낼 수 있습니다.", [2, 2.5, 1]).placeNearTarget().attachKeyFrame();
    scene.idle(20);
    scene.world.createItemEntity([2.5, 2.5, 0.9], util.vector.of(0, 0.3, -0.05), "gtceu:coke_gem");
    scene.idle(60);
    scene.overlay.showOutline(PonderPalette.WHITE, hatchPos, util.select.position(2, 2, 1), 80);
    scene.text(80, "크레오소트유가 충분히 모인 경우...", [2, 2.5, 1]).placeNearTarget();
    scene.idle(60);
    scene.showControls(40, [2.8, 3, 1.5], "down").rightClick().withItem("minecraft:bucket");
    scene.idle(60);
    scene.world.createItemEntity([2.5, 2.5, 0.9], util.vector.of(0, 0.3, -0.05), "gtceu:creosote_bucket");
    scene.idle(40);
    scene.text(80, "...양동이에 담을 수 있습니다.", [3, 0.8, 1]).colored(PonderPalette.GREEN).placeNearTarget().attachKeyFrame();
    scene.idle(60);
    scene.markAsFinished();
  });
});