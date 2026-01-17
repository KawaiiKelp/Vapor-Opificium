Ponder.tags((event) => {
    /**
     * "kubejs:getting_started" -> the tag name
     * "minecraft:paper"        -> the icon
     * "Getting Started"        -> the title
     * "This is a description"  -> the description
     * [...items]               -> default items
     */
    event.createTag("kubejs:gtceu", "gtceu:lv_electrolyzer", "GregTech: Multiblocks", "Useful machines made up of multiple blocks.", [
        // some default items
        "gtceu:coke_oven"
    ]);
});