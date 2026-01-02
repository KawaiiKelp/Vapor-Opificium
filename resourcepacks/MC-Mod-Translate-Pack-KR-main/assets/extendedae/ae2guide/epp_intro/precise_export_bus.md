---
navigation:
    parent: epp_intro/epp_intro-index.md
    title: ME 정밀 반출 버스
    icon: extendedae:precise_export_bus
categories:
- extended devices
item_ids:
- extendedae:precise_export_bus
---

# ME 정밀 반출 버스

<GameScene zoom="8" background="transparent">
<ImportStructure src="../structure/cable_precise_export_bus.snbt"></ImportStructure>
</GameScene>

ME 정밀 반출 버스는 지정된 수량만큼 아이템/액체를 내보냅니다. 컨테이너가 전체 출력을 완전히 수용할 수 있는 경우에만 내보냅니다.

## 예시

![GUI](../pic/pre_bus_gui1.png)

즉, 작업당 조약돌 3개를 내보냅니다. 네트워크에서 조약돌의 양이 3개보다 적으면 반출이 중단됩니다.

![GUI](../pic/pre_bus_gui2.png)

대상 컨테이너가 내보낸 모든 조약돌을 수용할 수 없는 경우에도 반출이 중단됩니다. 이제 상자에는 조약돌 2개만 더 보관할 수 있으므로 반출 버스가 중단됩니다.
