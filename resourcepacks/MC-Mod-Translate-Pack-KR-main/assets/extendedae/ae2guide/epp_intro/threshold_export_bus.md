---
navigation:
    parent: epp_intro/epp_intro-index.md
    title: ME 한계점 반출 버스
    icon: extendedae:threshold_export_bus
categories:
- extended devices
item_ids:
- extendedae:threshold_export_bus
---

# ME 한계점 반출 버스

<GameScene zoom="8" background="transparent">
  <ImportStructure src="../structure/cable_threshold_export_bus.snbt"></ImportStructure>
</GameScene>

ME 한계점 반출 버스는 ME 네트워크에 저장된 아이템의 수량이 한계점보다 높거나 낮을 때 작동합니다.

## 예시

![GUI](../pic/thr_bus_gui1.png)

구리의 한계점은 128로 설정되어 있으므로 네트워크에 저장된 구리가 128을 초과하면 구리를 내보냅니다.

![GUI](../pic/thr_bus_gui2.png)

한계점은 위와 동일하지만, 모드는 이하로 설정되어 있습니다. 저장된 구리가 128 미만이면 구리를 내보냅니다.
