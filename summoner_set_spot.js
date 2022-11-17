var variables_m = {
    // time (in seconds) between eacg check
    TIMER: 5,
    //chance it will spawn mooks every time it checks, must be a number between 1 and 0
    CHANCE:1,

    // dialogue when falling below starting designated health, leave empty ("") to say nothing
    STARF_DIAG:"",

    //dialogue every time mooks are spawned, leave empty to say nothing
    SPAWN_DIAG:"",

    //health percentile from which to start spawning guys, must be a number between 1 (full hp) and 0
    UPPER_HP_PERC:0.75,

    //health percentile from which to stop spawning guys, must be a number between 1 (full hp) and 0
    LOWER_HP_PERC:0.25,

    //guy to spawn, must be the EXACT name of the npc to spawn in the mob cloning tool
    MOOKNAME:"Orby boy",
    //tab in which the guy to spawn is in the mob cloning tool
    MOOKTAB:1,

    //number of guys to spawn
    NUMOOKS:3,

    //will only spawn enemies if there are players in this radius
    RADIUS_PCHECK:30,

    //x coordinate of where to spawn mook
    XCOORD: 10,
    //y coordinate
    YCOORD: 10,
    //z coordinate
    ZCOORD: 10
}

var fighting=false


// Timer called to reset the npc.

/**
 * @param {NpcEvent.TimerEvent} event
 */
function timer(event)
{
        
    if(event.id==1)
    {
        if(Math.random()<variables_m.CHANCE)
        {
        var closeentities=event.npc.getWorld().getNearbyEntities(event.npc.getPos(), variables_m.RADIUS_PCHECK, 1)
        if (closeentities.length!=0){
        if(variables_m.SPAWN_DIAG!=""){
            event.npc.say(variables_m.SPAWN_DIAG)
        }
        for (var i = 0; i < variables_m.NUMOOKS; i++)
        {
            var pos = event.npc.getPos();
            event.npc.say("HERE")
            var entities_at_pos=event.npc.getWorld().getNearbyEntities(variables_m.XCOORD, variables_m.YCOORD , variables_m.ZCOORD, 0.2, 2)
            event.npc.say(entities_at_pos.length)
            if (entities_at_pos.length==0){
                event.npc.getWorld().spawnClone(variables_m.XCOORD, variables_m.YCOORD , variables_m.ZCOORD , variables_m.MOOKTAB, variables_m.MOOKNAME);
            }
         
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
    if((curh)<(maxh*variables_m.UPPER_HP_PERC) && (curh>(maxh*variables_m.LOWER_HP_PERC))){
        if(!fighting){
            if(variables_m.STARF_DIAG!=""){
                event.npc.say(variables_m.STARF_DIAG)
            }
            event.npc.getTimers().stop(1)
            event.npc.getTimers().start(1, variables_m.TIMER*20, true);
            fighting=true
        }
        
    }
    else if (curh<(maxh*variables_m.LOWER_HP_PERC)){
        fighting=false
        event.npc.getTimers().stop(1)
    }
}
