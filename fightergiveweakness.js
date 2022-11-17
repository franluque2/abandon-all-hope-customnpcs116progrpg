var variables_weak = {
    // time (in seconds) between eacg check
    TIMER: 5,
    //chance it will do potion eff every time it checks, must be a number between 1 and 0
    CHANCE:1,

    // dialogue when falling below starting designated health, leave empty ("") to say nothing
    STARF_DIAG:"starting fight",

    //dialogue every time potion eff is done
    SPAWN_DIAG:"Doing potion eff",

    //health percentile from which to start potion eff
    UPPER_HP_PERC:0.99,

    //health percentile from which to stop potion eff
    LOWER_HP_PERC:0.01,

    //will check for players in this radius for potion eff
    RADIUS_PCHECK:30,


    //potion eff effect

    //visual effect used final hit
    EXPLOSION_EFFECT_F:"explosion",
    //sound effect used for the final hit
    SOUND_EFFECT_F:"entity.generic.explode",

    // volume and pitch
    VOLUME:1,
    PITCH:1,
    //duration (in seconds) of the potion eff effect
    DURATION: 10,
    //strength of the potion eff effect
    STR:10,

    //should it show potion particles?
    SHOULDSHOW:true,

    //number of the potion effect, check the minecraft wiki
    POTIONEFFID:2
    

}

var fighting=false


/**
 * @param {NpcEvent.TimerEvent} e
 */
function timer(e) {
	
    if(e.id==1)
    {
        if(Math.random()<=variables_weak.CHANCE)
        {
            if(variables_weak.SPAWN_DIAG!=""){
                e.npc.say(variables_weak.SPAWN_DIAG)
            }
            var closeentities=e.npc.getWorld().getNearbyEntities(e.npc.getPos(), variables_weak.RADIUS_PCHECK, 1)
            if (closeentities.length!=0){
                e.npc.getWorld().spawnParticle(variables_weak.EXPLOSION_EFFECT_F,e.npc.getBlockX()+0.5,e.npc.getBlockY(),e.npc.getBlockZ()+0.5,0.25,1,0.25,0.5,100);
            e.npc.getWorld().playSoundAt(e.npc.getPos(),variables_weak.SOUND_EFFECT_F,variables_weak.VOLUME,variables_weak.PITCH)
            for (var i = 0; i < closeentities.length; i++) {
                closeentities[i].addPotionEffect(variables_weak.POTIONEFFID,variables_weak.DURATION,variables_weak.STR,variables_weak.SHOULDSHOW)
            }
            }

    }
    }
	
}




/**
 * @param {NpcEvent.InitEvent} event
 */
function init(event){
    fighting=false
    if (event.npc.getTimers().has(1)) {
        event.npc.getTimers().stop(1);
    }
   
}

/**
 * @param {NpcEvent.DamagedEvent} event
 */
function damaged(event)
{
    var maxh = event.npc.getMaxHealth();
    var curh = event.npc.getHealth();
    if((curh)<(maxh*variables_weak.UPPER_HP_PERC) && (curh>(maxh*variables_weak.LOWER_HP_PERC))){
        if(!fighting){
            if(variables_weak.STARF_DIAG!=""){
                event.npc.say(variables_weak.STARF_DIAG)
            }
            event.npc.getTimers().stop(1)
            event.npc.getTimers().start(1, variables_weak.TIMER*20, true);
            fighting=true
        }
        
    }
    else if (curh<(maxh*variables_weak.LOWER_HP_PERC)){
        fighting=false
        event.npc.getTimers().stop(1)
    }
}
