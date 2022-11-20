var MODEL_BLOCK = '{id:"minecraft:stone",Count:1b,Damage:0s}'
var lastJumped = 0;
var jumpInterval = 1000;
var JUMP_STRENGTH = 1;





/**
 * @param {BlockEvent.InitEvent} e
 */

function init(e) {
    var mblock = e.block.getWorld().createItemFromNbt(e.API.stringToNbt(MODEL_BLOCK));

	e.block.setModel(mblock);

	e.block.setHardness(999);
}


/**
 * @param {BlockEvent.CollidedEvent} e
 */
function collide(e) {
	var now = new Date().getTime();

	if(e.entity.getType() == 1) {
		if(now >= lastJumped + jumpInterval) {
			e.entity.setMotionY(parseFloat(JUMP_STRENGTH));
			lastJumped = now;
		}
	}
}

/**
 * @param {BlockEvent.UpdateEvent} e
 */
function tick(e) {

}