// what block should this look like
var MODEL_BLOCK = '{id:"minecraft:soul_lantern",Count:1b,Damage:0s}'

var light_level=15

var slow_radius=3

var slow_str=10

var weak_str=100


/**
 * @param {BlockEvent.InitEvent} e
 */

function init(e) {
    var mblock = e.block.getWorld().createItemFromNbt(e.API.stringToNbt(MODEL_BLOCK));

	e.block.setModel(mblock);

	e.block.setHardness(999);

    e.block.setLight(light_level)
    
    e.block.setIsPassible(true)

}

/**
 * @param {BlockEvent.UpdateEvent} e
 */
function tick(e)
{
    var closeentities=e.block.getWorld().getNearbyEntities(e.block.getX(),e.block.getY(),e.block.getZ(), slow_radius, 2)
        if (closeentities.length!=0){
            for (var i = 0; i < closeentities.length; i++) {
                closeentities[i].addPotionEffect(2,2,slow_str,false)
                closeentities[i].addPotionEffect(18,2,weak_str,false)

                closeentities[i].addPotionEffect(24,2,1,false)

            }
        }
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