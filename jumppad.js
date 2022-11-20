// what block should this look like
var MODEL_BLOCK = '{id:"minecraft:stone",Count:1b,Damage:0s}'
//leave alone
var lastJumped = 0;
//ticks between each launch
var jumpInterval = 1000;

//add or override momentum (add speed in a direction (takes into account the movement of the player) or set it (more precise))?

var OVERRIDE_X=false
var OVERRIDE_Y=true
var OVERRIDE_Z=false

//strength of push in x, y and z axis
var JUMP_STRENGTH_X = 0;

var JUMP_STRENGTH_Y = 1;

var JUMP_STRENGTH_Z = 0;

//visual effect used
var EXPLOSION_EFFECT="cloud"
//sound effect used 
var SOUND_EFFECT="entity.horse.breathe"

// volume and pitch
var VOLUME=1
var PITCH=1
   



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
			if(OVERRIDE_X)
			{
				e.entity.setMotionX(parseFloat(JUMP_STRENGTH_X));
			}
			else
			{
				e.entity.setMotionX(e.entity.getMotionX()+parseFloat(JUMP_STRENGTH_X));
			}
			if(OVERRIDE_Y)
			{
				e.entity.setMotionY(parseFloat(JUMP_STRENGTH_Y));
			}
			else
			{
				e.entity.setMotionY(e.entity.getMotionY()+parseFloat(JUMP_STRENGTH_Y));
			}
			if(OVERRIDE_Z)
			{
				e.entity.setMotionZ(parseFloat(JUMP_STRENGTH_Z));
			}
			else
			{
				e.entity.setMotionZ(e.entity.getMotionZ()+parseFloat(JUMP_STRENGTH_Z));
			}

			e.block.getWorld().spawnParticle(EXPLOSION_EFFECT,e.block.getX()+0.5,e.block.getY()+1,e.block.getZ()+0.5,0.25,1,0.25,0.5,100);
			e.block.getWorld().playSoundAt(e.block.getPos(),SOUND_EFFECT,VOLUME,PITCH)


			lastJumped = now;
		}
	}
}

/**
 * @param {BlockEvent.UpdateEvent} e
 */
function tick(e) {

}