StartupEvents.registry("item", (event) => {
  // 1. 부싯돌 가위
  event
    .create("flint_shears", "shears")
    .translationKey("item.kubejs.flint_shears") // [핵심] 번역 키 지정
    .maxDamage(64)
    .tag("minecraft:shears");

  // 2. 동전 리스트
  const coins = [
    "survivor",
    "farmer",
    "cook",
    "miner",
    "explorer",
    "technician",
    "chemist",
    "energy",
  ];

  coins.forEach((id) => {
    // 1. 일단 아이템을 만들어서 변수(coinItem)에 담는다
    let coinItem = event
      .create(`${id}_coin`)
      .rarity("uncommon")
      .translationKey(`item.kubejs.${id}_coin`)
      .tooltip(Text.translate("item.kubejs.coin.tooltip"));

    // 2. 만약 아이디가 'energy'라면 반짝임(Glow) 효과를 켠다
    if (id === "energy") {
      coinItem.glow(true);
    }
  });

  event
    .create("tanned_leather")
    .translationKey("item.kubejs.tanned_leather")
    .maxStackSize(64);
});
