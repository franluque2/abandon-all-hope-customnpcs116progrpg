// what block should this look like
var MODEL_BLOCK = '{id:"minecraft:stone",Count:1b,Damage:0s}'
//leave alone
var lastTeleported = 0;
//ticks between each tp
var teleportInterval = 1000;

// x y and z cords of the place to teleport to
var COORDS=[2494,171,1251]
//visual effect used
var EXPLOSION_EFFECT="portal"
//sound effect used 
var SOUND_EFFECT="minecraft:entity.ender_eye.death"

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
		if(now >= lastTeleported + teleportInterval) {
			
			
			e.entity.setPosition(COORDS[0],COORDS[1],COORDS[2]);
			

			e.block.getWorld().spawnParticle(EXPLOSION_EFFECT,e.block.getX()+0.5,e.block.getY()+1,e.block.getZ()+0.5,0.25,1,0.25,0.5,100);
			e.block.getWorld().playSoundAt(e.block.getPos(),SOUND_EFFECT,VOLUME,PITCH)

            var endloc=e.API.getIPos(COORDS[0],COORDS[1],COORDS[2])

            e.block.getWorld().spawnParticle(EXPLOSION_EFFECT,COORDS[0],COORDS[1],COORDS[2],0.25,1,0.25,0.5,100);
			e.block.getWorld().playSoundAt(endloc,SOUND_EFFECT,VOLUME,PITCH)


			lastTeleported = now;
		}
	}
}
