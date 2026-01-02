---
navigation:
    parent: epp_intro/epp_intro-index.md
    title: ME 병조림기
    icon: extendedae:caner
categories:
- extended devices
item_ids:
- extendedae:caner
---

# ME 병조림기

<BlockImage id="extendedae:caner" scale="8"></BlockImage>

ME 병조림기는 액체, 메카니즘 기체, 보타니아 마나, 심지어 에너지까지 포함한 다양한 재료를 "병으로 만드는" 기계입니다!

첫 번째 슬롯은 재료를 채우는 슬롯이고, 두 번째 슬롯은 재료를 채우는 슬롯입니다.

작동하려면 에너지가 필요하며, 모든 작동에는 80 AE가 소모됩니다.

![GUI](../pic/caner_gui.png)

기본적으로 액체만 채웁니다. 다른 재료를 채우려면 해당 애드온을 설치해야 합니다.

### 지원 애드온:
- Applied Flux
- Applied Mekanistics
- Applied Botanics Addon

## ME 병조림기 자동 제작

상단과 하단에서만 에너지를 받고 네트워크에 연결할 수 있습니다.

<GameScene zoom="6" background="transparent">
<ImportStructure src="../structure/caner_example.snbt"></ImportStructure>
</GameScene>

ME 병조림기를 위한 간단한 설정입니다. ME 병조림기는 <ItemLink id="ae2:pattern_provider" />에서 재료를 받으면 채워진 아이템을 자동으로 꺼냅니다.

<GameScene zoom="6" background="transparent">
<ImportStructure src="../structure/caner_auto.snbt"></ImportStructure>
</GameScene>

패턴에는 채울 재료와 채울 용기만 포함되어야 합니다. 다음은 몇 가지 예시입니다.

물 양동이 채우기:

![P1](../pic/fill_water.png)

에너지 태블릿 충전 (Applied Flux 설치 필요):

![P1](../pic/fill_energy.png)

## 병 비우기

ME 병조림기는 비움 모드에서도 용기의 내용물을 비울 수 있습니다. 입력과 출력을 패턴으로 전환해야 합니다.
