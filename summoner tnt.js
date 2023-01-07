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
    UPPER_HP_PERC:0.99,

    //health percentile from which to stop spawning guys, must be a number between 1 (full hp) and 0
    LOWER_HP_PERC:0.01,

    //number of guys to spawn
    NUMOOKS:3,

    //radius in blocks in which mooks are spawned
    MOOKSPAWNRATIUS:5,

    //should the radius be also applied to the Y coordinate? true/false
    YOFFSET:false,

    //will only spawn enemies if there are players in this radius
    RADIUS_PCHECK:30,

    //seconds of delay in the explosion
    DELAY_EXPLOSION:2,

    //Damage of the explosion
    EXPLOSION_DAMAGE:16,
}

var fighting=false


var _TIMERS = [];
/**
 * Executes a function after a certain amount of time
 * @param {int} seconds Time in seconds
 * @param {Function} callback Function to execute
 */
function runDelay(seconds, callback) {
    _TIMERS.push({
        end: new Date().getTime()+seconds*1000,
        callback: callback
    });
}
 

/**
 * @param {NpcEvent.UpdateEvent} e
 */
function tick(e) {
    runDelayTick();
}
 
/**
 * Used in tick function to let runDelay work
 */
function runDelayTick() {
    if(_TIMERS.length > 0) {
        var _newTimers = [];
        var _curTime = new Date().getTime();
 
        var timer;
        for(var i = 0; i < _TIMERS.length; i++) {
            timer = _TIMERS[i];
            if(_curTime >= timer.end) {
                timer.callback();
            } else {
                _newTimers.push(timer);
            }
        }
 
        _TIMERS = _newTimers;
    }
}
var explosives=[]

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
            var xoffset=Math.random()*variables_m.MOOKSPAWNRATIUS*(Math.round(Math.random()) * 2 - 1)
            var yoffset=0
            if (variables_m.YOFFSET){
                yoffset=Math.random()*variables_m.MOOKSPAWNRATIUS*(Math.round(Math.random()) * 2 - 1)
            }
            var zoffset=Math.random()*variables_m.MOOKSPAWNRATIUS*(Math.round(Math.random()) * 2 - 1)


            var tnt=event.npc.getWorld().createEntity("minecraft:tnt")
            tnt.setPosition(pos.getX()+xoffset,pos.getY()+yoffset,pos.getZ()+zoffset)
            event.npc.getWorld().spawnEntity(tnt)
            explosives.push(tnt)
        }
        runDelay(variables_m.DELAY_EXPLOSION,function(){
            

                explosives.slice().reverse()
                .forEach(function(entity) {
                    var closeentities=event.npc.getWorld().getNearbyEntities(entity.getPos(), 4, 1)
                    event.npc.getWorld().spawnParticle("explosion",entity.getBlockX()+0.5,entity.getBlockY(),entity.getBlockZ()+0.5,0.25,1,0.25,0.5,100);
                    event.npc.getWorld().playSoundAt(entity.getPos(),"entity.generic.explode",10,1)

                    if (closeentities.length!=0){
                        
                        for (var i = 0; i < closeentities.length; i++) {
                            closeentities[i].damage(variables_m.EXPLOSION_DAMAGE)
                        }
                    }
                    entity.despawn()
                    });
                
            
            explosives=[]
        })
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

/**
 * @param {NpcEvent.DiedEvent} event
 */

function died(event){
    if (event.npc.getTimers().has(1)) {
        event.npc.getTimers().stop(1);
    }
}