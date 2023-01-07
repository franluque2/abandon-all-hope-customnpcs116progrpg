// what block should this look like
var MODEL_BLOCK = '{id:"minecraft:command_block",Count:1b,Damage:0s}'

//radius when turned off, in blocks
var DAMAGE_RADIUS=3

var COORDS=[-1270, 21, 1293]

//damage

var DAMAGE=100



/**
 * @param {BlockEvent.InitEvent} e
 */

function init(e) {
    var mblock = e.block.getWorld().createItemFromNbt(e.API.stringToNbt(MODEL_BLOCK));

	e.block.setModel(mblock);

	e.block.setHardness(999);
}


/**
 * @param {BlockEvent.RedstoneEvent} e
 */
function redstone(e) {
	var closeentities=e.block.getWorld().getNearbyEntities(COORDS[0],COORDS[1],COORDS[2], DAMAGE_RADIUS, 1)
        if (closeentities.length!=0){
            for (var i = 0; i < closeentities.length; i++) {
                closeentities[i].damage(DAMAGE)
            }
        }
}
