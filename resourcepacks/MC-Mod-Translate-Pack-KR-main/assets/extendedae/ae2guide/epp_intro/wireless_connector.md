---
navigation:
    parent: epp_intro/epp_intro-index.md
    title: ME 무선 연결기
    icon: extendedae:wireless_connect
categories:
- extended devices
item_ids:
- extendedae:wireless_connect
- extendedae:wireless_tool
---

# ME 무선 연결기

<Row gap="20">
<BlockImage id="extendedae:wireless_connect" scale="6"></BlockImage>
<ItemImage id="extendedae:wireless_tool" scale="6"></ItemImage>
</Row>

ME 무선 연결기는 <ItemLink id="ae2:quantum_link" />처럼 두 네트워크를 연결할 수 있지만, 거리가 제한되어 있고 차원을 넘을 수 없습니다.

## 무선 연결기 연결

ME 무선 설치 키트에 연결할 두 무선 연결기를 클릭하면 서로 연결할 수 있습니다.

ME 무선 설치 키트의 현재 설정을 지우려면 살짝 누른 채 클릭하세요.

연결이 성공적으로 완료되면 ME 무선 연결기의 질감이 변경됩니다.

연결되지 않은 ME 무선 연결기

<GameScene zoom="5" background="transparent">
<ImportStructure src="../structure/wireless_connector_off.snbt"></ImportStructure>
</GameScene>

연결된 ME 무선 연결기

<GameScene zoom="5" background="transparent">
<ImportStructure src="../structure/wireless_connector_on.snbt"></ImportStructure>
</GameScene>

## 색상

무선 연결기는 케이블처럼 색상을 지정할 수 있으며, 같은 색상의 케이블/커넥터만 연결할 수 있습니다.

커넥터에 색상을 지정하려면 <ItemLink id="ae2:color_applicator" />가 필요합니다.

무선 연결기를 다음과 같이 설정할 수 있습니다.

<GameScene zoom="3" background="transparent" interactive={true}>
<ImportStructure src="../structure/wireless_connector_setup.snbt"></ImportStructure>
</GameScene>

## 전력 사용량

ME 무선 연결기는 서로 멀리 떨어져 있을수록 더 많은 전력을 소모합니다. 전력 소모량-거리 곡선이 선형적이지 않기 때문에
너무 멀리 떨어져 있으면 전력 소모량이 매우 높아질 수 있습니다.

<ItemLink id="ae2:energy_card" />를 사용하면 전력을 절약할 수 있으며, 모든 카드는 10%의 에너지 비용을 절감할 수 있습니다.
