// what block should this look like
var MODEL_BLOCK = '{id:"minecraft:stone",Count:1b,Damage:0s}'


/**
 * @param {BlockEvent.InitEvent} e
 */

function init(e) {
    var mblock = e.block.getWorld().createItemFromNbt(e.API.stringToNbt(MODEL_BLOCK));

	e.block.setModel(mblock);

	e.block.setHardness(999);
    e.block.setIsPassible(true)

    //e.block.setLight(15)

}

/**asdasdasdawsadssdaasdasdasdasdasdasd asdasdasdawsadssdaasdasdasdasdasdasdasdasdasdawsadssdaasdasdasdasdasdasdasdasdasdawsadssdaasdasdasdasdasdasdasdasdasdawsadssdaasdasdasdasdasdasdasdasdasdawsadssdaasdasdasdasdasdasdasdasdasdawsadssdaasdasdasdasdasdasd
 * asdasdasdawsadssdaasdasdasdasdasdasdasdasdasdawsadssdaasdasdasdasdasdasdasdasdasdawsadssdaasdasdasdasdasdasd
 * asdasdasdawsadssdaasdasdasdasdasdasd
 * asdasdasdawsadssdaasdasdasdasdasdasd
 * asdasdasdawsadssdaasdasdasdasdasdasd
 * asdasdasdawsadssdaasdasdasdasdasdasd
 * asdasdasdawsadssdaasdasdasdasdasdasd
 * asdasdasdawsadssdaasdasdasdasdasdasd
 * 
 * asdasdasdawsadssdaasdasdasdasdasdasd
 * asdasdasdawsadssdaasdasdasdasdasdasd
 * asdasdasdawsadssdaasdasdasdasdasdasd
 * asdasdasdawsadssdaasdasdasdasdasdasd
 * 
 * asdasdasdawsadssdaasdasdasdasdasdasd
 * 
*/