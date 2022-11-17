var variables_w = {
    // time (in seconds) between eacg check
    TIMER: 30,
    //chance it will do waterfowl dance every time it checks, must be a number between 1 and 0
    CHANCE:0.9,

    // dialogue when falling below starting designated health, leave empty ("") to say nothing
    STARF_DIAG:"You challenge the Demon Sword King? Foolish.",

    //dialogue every time waterfowl dance is done
    SPAWN_DIAG:"Be skewered upon my blade!",

    //health percentile from which to start waterfowl dance
    UPPER_HP_PERC:1.0,

    //health percentile from which to stop waterfowl dance
    LOWER_HP_PERC:0.01,

    //will check for players in this radius for waterfowl dance
    RADIUS_PCHECK:30,

    //blocks away when performing the waterfowl dance
    BLOCKSAWAY:2,

    //delay (in seconds) between the hits of the waterfowl dance
    SMALLHITDELAY:0.25,

    //radius to check in the waterfowl dance

    HITRADIUS:10,

    //small hit effect

    SMALLHITEFFECT:"falling_lava",
    //sound effect used for small hit
    SMALLHITSOUND:"entity.enderman.teleport",

    //visual effect used final hit
    EXPLOSION_EFFECT_F:"sweep_attack",
    //sound effect used for the final hit
    SOUND_EFFECT_F:"entity.firework_rocket.large_blast",

    // volume and pitch
    VOLUME:1,
    PITCH:1,
    
    //small hit damage
    SMALLHITDMG:50,

    //final hit damage

    FINALDMG:100
    
}

var fighting=false


/*
Script for Minecraft Custom NPCs mod
*/
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
/**
 * @param {NpcEvent.TimerEvent} e
 */
function timer(e) {
	
    if(e.id==1)
    {
        if(Math.random()<=variables_w.CHANCE)
        {
            if(variables_w.SPAWN_DIAG!=""){
                e.npc.say(variables_w.SPAWN_DIAG)
            }
            waterfowl(e)
       
    }
    }
	
}

/**
 * @param {NpcEvent.UpdateEvent} e
 */
function tick(e) {
    runDelayTick();
}

function waterfowl(event){

    var closeentities=event.npc.getWorld().getNearbyEntities(event.npc.getPos(), variables_w.RADIUS_PCHECK, 1)
        if (closeentities.length!=0){
            var chosen = closeentities[Math.floor(Math.random()*closeentities.length)];

            event.npc.getAi().setMovingType(0)
            event.npc.getAi().setNavigationType(1)


            runDelay(variables_w.SMALLHITDELAY, function(){
                
                var pos = chosen.getPos();

                var xoffset=(Math.random()*variables_w.BLOCKSAWAY)*(Math.round(Math.random()) * 2 - 1)
                var yoffset=1+Math.random()*2
                var zoffset=(Math.random()*variables_w.BLOCKSAWAY)*(Math.round(Math.random()) * 2 - 1)

                if(event.npc.getPos().distanceTo(chosen.getPos())>60){
                    event.npc.getAi().setMovingType(1)
                    event.npc.getAi().setNavigationType(1)
                    return
                }
                
                event.npc.setPos(chosen.getPos().add(xoffset,yoffset,zoffset))

                event.npc.getWorld().spawnParticle(variables_w.SMALLHITEFFECT,chosen.getBlockX()+0.5,chosen.getBlockY(),chosen.getBlockZ()+0.5,0.25,1,0.25,0.5,100);
                event.npc.getWorld().playSoundAt(chosen.getPos(),variables_w.SMALLHITSOUND,variables_w.VOLUME,variables_w.PITCH)


                var hit=event.npc.getWorld().getNearbyEntities(chosen.getPos(), variables_w.HITRADIUS, 1)

                if (hit.length!=0){
                    for (var i = 0; i < hit.length; i++) {
                        hit[i].damage(variables_w.SMALLHITDMG)
                    }

                }
                    runDelay(variables_w.SMALLHITDELAY, function(){
                        
                        var pos = chosen.getPos();
        

                        var xoffset=(Math.random()*variables_w.BLOCKSAWAY)*(Math.round(Math.random()) * 2 - 1)
                        var yoffset=1+Math.random()*2
                        var zoffset=(Math.random()*variables_w.BLOCKSAWAY)*(Math.round(Math.random()) * 2 - 1)
                        if(event.npc.getPos().distanceTo(chosen.getPos())>60){
                            event.npc.getAi().setMovingType(1)
                            event.npc.getAi().setNavigationType(1)
                            return
                        }
                        
                        event.npc.setPos(chosen.getPos().add(xoffset,yoffset,zoffset))
        
                        event.npc.getWorld().spawnParticle(variables_w.SMALLHITEFFECT,chosen.getBlockX()+0.5,chosen.getBlockY(),chosen.getBlockZ()+0.5,0.25,1,0.25,0.5,100);
                        event.npc.getWorld().playSoundAt(chosen.getPos(),variables_w.SMALLHITSOUND,variables_w.VOLUME,variables_w.PITCH)
        
        
                        var hit=event.npc.getWorld().getNearbyEntities(chosen.getPos(), variables_w.HITRADIUS, 1)
        
                        if (hit.length!=0){
                            for (var i = 0; i < hit.length; i++) {
                                hit[i].damage(variables_w.SMALLHITDMG)
                            }
        
                        }
        
                        runDelay(variables_w.SMALLHITDELAY, function(){
                        
                            var pos = chosen.getPos();
            

                            var xoffset=(Math.random()*variables_w.BLOCKSAWAY)*(Math.round(Math.random()) * 2 - 1)
                            var yoffset=1+Math.random()*2
                            var zoffset=(Math.random()*variables_w.BLOCKSAWAY)*(Math.round(Math.random()) * 2 - 1)
                            if(event.npc.getPos().distanceTo(chosen.getPos())>60){
                                event.npc.getAi().setMovingType(1)
                                event.npc.getAi().setNavigationType(1)
                                return
                            }
                            
                            event.npc.setPos(chosen.getPos().add(xoffset,yoffset,zoffset))
            
                            event.npc.getWorld().spawnParticle(variables_w.SMALLHITEFFECT,chosen.getBlockX()+0.5,chosen.getBlockY(),chosen.getBlockZ()+0.5,0.25,1,0.25,0.5,100);
                            event.npc.getWorld().playSoundAt(chosen.getPos(),variables_w.SMALLHITSOUND,variables_w.VOLUME,variables_w.PITCH)
            
            
                            var hit=event.npc.getWorld().getNearbyEntities(chosen.getPos(), variables_w.HITRADIUS, 1)
            
                            if (hit.length!=0){
                                for (var i = 0; i < hit.length; i++) {
                                    hit[i].damage(variables_w.SMALLHITDMG)
                                }
            
                            }
                            
                            runDelay(variables_w.SMALLHITDELAY, function(){
                                if(event.npc.getPos().distanceTo(chosen.getPos())>60){
                                    event.npc.getAi().setMovingType(1)
                                    event.npc.getAi().setNavigationType(1)
                                    return
                                }
                                
                                var pos = chosen.getPos();

                                var xoffset=(Math.random()*variables_w.BLOCKSAWAY)*(Math.round(Math.random()) * 2 - 1)
                                var yoffset=1+Math.random()*2
                                var zoffset=(Math.random()*variables_w.BLOCKSAWAY)*(Math.round(Math.random()) * 2 - 1)
                      
                                if(event.npc.getPos().distanceTo(chosen.getPos())>60){
                                    event.npc.getAi().setMovingType(1)
                                    event.npc.getAi().setNavigationType(1)
                                    return
                                }
                                
                                event.npc.setPos(chosen.getPos().add(xoffset,yoffset,zoffset))
                
                                event.npc.getWorld().spawnParticle(variables_w.SMALLHITEFFECT,chosen.getBlockX()+0.5,chosen.getBlockY(),chosen.getBlockZ()+0.5,0.25,1,0.25,0.5,100);
                                event.npc.getWorld().playSoundAt(chosen.getPos(),variables_w.SMALLHITSOUND,variables_w.VOLUME,variables_w.PITCH)
                
                
                                var hit=event.npc.getWorld().getNearbyEntities(chosen.getPos(), variables_w.HITRADIUS, 1)
                
                                if (hit.length!=0){
                                    for (var i = 0; i < hit.length; i++) {
                                        hit[i].damage(variables_w.SMALLHITDMG)
                                    }
                
                                }   

                                runDelay(variables_w.SMALLHITDELAY, function(){
                        
                                    var pos = chosen.getPos();

                                    var xoffset=(Math.random()*variables_w.BLOCKSAWAY)*(Math.round(Math.random()) * 2 - 1)
                                    var yoffset=1+Math.random()*2
                                    var zoffset=(Math.random()*variables_w.BLOCKSAWAY)*(Math.round(Math.random()) * 2 - 1)
                                      
                                    if(event.npc.getPos().distanceTo(chosen.getPos())>60){
                                        event.npc.getAi().setMovingType(1)
                                        event.npc.getAi().setNavigationType(1)
                                        return
                                    }
                                    
                                    event.npc.setPos(chosen.getPos().add(xoffset,yoffset,zoffset))
                    
                                    event.npc.getWorld().spawnParticle(variables_w.SMALLHITEFFECT,chosen.getBlockX()+0.5,chosen.getBlockY(),chosen.getBlockZ()+0.5,0.25,1,0.25,0.5,100);
                                    event.npc.getWorld().playSoundAt(chosen.getPos(),variables_w.SMALLHITSOUND,variables_w.VOLUME,variables_w.PITCH)
                    
                    
                                    var hit=event.npc.getWorld().getNearbyEntities(chosen.getPos(), variables_w.HITRADIUS, 1)
                    
                                    if (hit.length!=0){
                                        for (var i = 0; i < hit.length; i++) {
                                            hit[i].damage(variables_w.SMALLHITDMG)
                                        }
                    
                                    }
                                    runDelay(variables_w.SMALLHITDELAY, function(){
                                        var pos = chosen.getPos();

                                        var xoffset=(Math.random()*variables_w.BLOCKSAWAY)*(Math.round(Math.random()) * 2 - 1)
                                        var yoffset=1+Math.random()*2
                                        var zoffset=(Math.random()*variables_w.BLOCKSAWAY)*(Math.round(Math.random()) * 2 - 1)
                                        if(event.npc.getPos().distanceTo(chosen.getPos())>60){
                                            event.npc.getAi().setMovingType(1)
                                            event.npc.getAi().setNavigationType(1)
                                            return
                                        }
                                        
                                                event.npc.setPos(chosen.getPos().add(xoffset,yoffset,zoffset))
                                
                                                event.npc.getWorld().spawnParticle(variables_w.EXPLOSION_EFFECT_F,chosen.getBlockX()+0.5,chosen.getBlockY(),chosen.getBlockZ()+0.5,0.25,1,0.25,0.5,100);
                                                event.npc.getWorld().playSoundAt(chosen.getPos(),variables_w.SOUND_EFFECT_F,variables_w.VOLUME,variables_w.PITCH)
                                
                                
                                                var hit=event.npc.getWorld().getNearbyEntities(chosen.getPos(), variables_w.HITRADIUS, 1)
                                
                                                if (hit.length!=0){
                                                    for (var i = 0; i < hit.length; i++) {
                                                        hit[i].damage(variables_w.FINALDMG)
                                                    }
                                
                                                }
                                
                                                event.npc.getAi().setMovingType(1)
                                        event.npc.getAi().setNavigationType(1)
                                        })
                    
                    
                                })
                
                
                            })
            
                        })

                    })
                

            })
            
        

        

        
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
    if((curh)<(maxh*variables_w.UPPER_HP_PERC) && (curh>(maxh*variables_w.LOWER_HP_PERC))){
        if(!fighting){
            if(variables_w.STARF_DIAG!=""){
                event.npc.say(variables_w.STARF_DIAG)
            }
            event.npc.getTimers().stop(1)
            event.npc.getTimers().start(1, variables_w.TIMER*20, true);
            fighting=true
        }
        
    }
    else if (curh<(maxh*variables_w.LOWER_HP_PERC)){
        fighting=false
        event.npc.getTimers().stop(1)
    }
}
