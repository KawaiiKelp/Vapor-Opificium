---
navigation:
    parent: epp_intro/epp_intro-index.md
    title: ME 한계점 레벨 방출기
    icon: extendedae:threshold_level_emitter
categories:
- extended devices
item_ids:
- extendedae:threshold_level_emitter
---

# ME 한계점 레벨 방출기

<GameScene zoom="8" background="transparent">
  <ImportStructure src="../structure/cable_threshold_level_emitter.snbt"></ImportStructure>
</GameScene>

RS 래치(Reset-Set Latch)와 유사하게 작동합니다. 네트워크 내 아이템의 수량이 하한 한계점보다 적으면 레드스톤 신호를 끄고,
상한 한계점보다 많으면 켭니다.

예를 들어, 하한 한계점을 100으로, 상한 한계점을 150으로 설정했습니다.

처음에는 네트워크가 비어 있으므로 방출기가 활성화되지 않습니다.

아이템의 수량이 증가하여 150을 넘으면 방출기는 레드스톤 신호를 보냅니다.

아이템의 수량이 감소하여 150 미만이 되어도 방출기는 계속 신호를 보냅니다.

마지막으로 수량이 100 미만이 되면 방출기는 꺼집니다.
