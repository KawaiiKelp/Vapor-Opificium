---
navigation:
    parent: epp_intro/epp_intro-index.md
    title: 조합기 매트릭스
    icon: extendedae:assembler_matrix_frame
categories:
- extended devices
item_ids:
- extendedae:assembler_matrix_frame
- extendedae:assembler_matrix_wall
- extendedae:assembler_matrix_glass
- extendedae:assembler_matrix_pattern
- extendedae:assembler_matrix_crafter
- extendedae:assembler_matrix_speed
---

# 조합기 매트릭스

<Row>
<BlockImage id="extendedae:assembler_matrix_frame" p:formed="true" p:powered="true" scale="5"></BlockImage>
<BlockImage id="extendedae:assembler_matrix_wall" scale="5"></BlockImage>
<BlockImage id="extendedae:assembler_matrix_glass" scale="5"></BlockImage>
</Row>
<Row>
<BlockImage id="extendedae:assembler_matrix_pattern" scale="5"></BlockImage>
<BlockImage id="extendedae:assembler_matrix_crafter" scale="5"></BlockImage>
<BlockImage id="extendedae:assembler_matrix_speed" scale="5"></BlockImage>
</Row>

조합기 매트릭스는 멀티블록 구조입니다. <ItemLink id="ae2:molecular_assembler" />와 <ItemLink id="ae2:pattern_provider" />의 조합입니다.
조합기 매트릭스는 (ME 네트워크에 충분한 <ItemLink id="ae2:crafting_accelerator" />가 있는 경우) 여러 조합 작업을 동시에 실행하고 채널을 절약할 수 있습니다.

## 구조

<GameScene zoom="3" background="transparent" interactive={true}>
  <ImportStructure src="../structure/assembler_matrix.snbt"></ImportStructure>
</GameScene>

모서리 길이가 3에서 7 사이인 직육면체입니다.
- 모서리는 조합기 매트릭스 프레임으로 구성됩니다.
- 면은 조합기 매트릭스 벽/유리로 구성됩니다.
- 내부는 조합기 매트릭스 패턴/조합/가속 코어로 구성됩니다.

유효한 조합기 매트릭스는 최소 하나의 패턴 코어와 조합 코어를 포함해야 합니다.
매트릭스는 완전히 채워져야 하며, 비어 있어서는 안 됩니다.
조합기 매트릭스가 올바르게 형성되고 전원이 공급되면 조합기 매트릭스 프레임의 선이 파란색으로 변합니다.

## 조합기 매트릭스 코어

조 매트릭스 코어는 3가지가 있습니다.

- 조합기 매트릭스 패턴 코어

조합기 매트릭스는 패턴 코어에서만 패턴을 가져옵니다. 각 패턴 코어는 조합기 매트릭스에 36개의 패턴 슬롯을 제공합니다.

- 조합기 매트릭스 조합 코어

조합기 매트릭스는 수신된 제작 작업을 조합 코어에 할당합니다. 각 조합 코어는 동시에 8개의 제작 작업을 실행할 수 있습니다.

- 조합기 매트릭스 가속 코어

조합기 매트릭스의 <ItemLink id="ae2:speed_card" />입니다. 가속 코어가 5개면 조합기 매트릭스가 최고 속도로 실행됩니다.
가속 코어를 5개 이상 설치해도 추가 속도 향상은 제공되지 않습니다.

## GUI

구조가 형성된 온라인 상태의 조합기 매트릭스를 마우스 오른쪽 버튼으로 클릭하면 GUI가 열립니다.

![GUI](../pic/assembler_matrix.png)

패턴을 입력하거나 검색할 수 있으며, 실행 중인 제작 작업 수를 확인할 수 있습니다.
