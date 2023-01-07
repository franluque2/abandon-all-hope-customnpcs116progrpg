var QUESTID=148

var OBJECTIVEID = 0

var COORDS=[-546,154,-57]
var DISTANCE=10

var MODEL_BLOCK = '{id:"minecraft:target",Count:1b,Damage:0s}'

//sound effect used 
var SOUND_EFFECT="minecraft:entity.arrow.hit_player"

// volume and pitch
var VOLUME=1
var PITCH=1

//seconds it should emit a redstone signal when hit

var REDSTSECS=2
   

/**
 * @param {BlockEvent.TimerEvent} e
 */
function timer(e)
{
    if (e.id==1)
    {
        e.block.setRedstonePower(0)
    }
}

/**
 * @param {BlockEvent.InitEvent} e
 */

function init(e) {
    var mblock = e.block.getWorld().createItemFromNbt(e.API.stringToNbt(MODEL_BLOCK));

	e.block.setModel(mblock);

	e.block.setHardness(999);

    if (e.block.getTimers().has(1)) {
        e.block.getTimers().stop(1);
    }

    //e.block.setLight(15)

}

/**
 * @param {BlockEvent.CollidedEvent} e
 */
function collide(e) {

    if (e.entity.getEntityName()!="Arrow") return;

    //e.entity.despawn()

    e.block.setRedstonePower(15)
    if (e.block.getTimers().has(1)) {
        e.block.getTimers().stop(1);
    }
    e.block.getTimers().start(1, REDSTSECS*20, false);
    
    var currentquests=[]
    var closeentities=e.block.getWorld().getNearbyEntities(COORDS[0],COORDS[1],COORDS[2], DISTANCE, 1)
    if (closeentities.length!=0){
        for (var i = 0; i < closeentities.length; i++) {
            currentquests=closeentities[i].getActiveQuests()
            if (currentquests.length!=0){
                for (var j = 0; j < currentquests.length; j++) {
                    if(currentquests[j].getId()==QUESTID)
                    {
                        
                        currentquests[j].getObjectives(closeentities[i])[OBJECTIVEID].setProgress(1)
                        e.block.getWorld().playSoundAt(closeentities[i].getPos(),SOUND_EFFECT,VOLUME,PITCH)

                           
                }
            }
            }
        
        
    }
}
}

