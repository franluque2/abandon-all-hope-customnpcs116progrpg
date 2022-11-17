var variables_sb = {
    // time (in seconds) between eacg check
    TIMER: 20,
    //chance it will do Shadow blades every time it checks, must be a number between 1 and 0
    CHANCE: 1,

    // dialogue when falling below starting designated health, leave empty ("") to say nothing
    STARF_DIAG: "starting fight",

    //dialogue every time Shadow blades is done
    SPAWN_DIAG: "Doing Shadow blades",

    //health percentile from which to start Shadow blades
    UPPER_HP_PERC: 1,

    //health percentile from which to stop Shadow blades
    LOWER_HP_PERC: 0.01,

    //will check for players in this radius for Shadow blades
    RADIUS_PCHECK: 30,

    //delay (in seconds) between the checks of the Shadow blades
    SMALLHITDELAY: 1,

    //visual effect used for the damage
    EXPLOSION_EFFECT_F: "explosion",
    //sound effect used for the damage
    SOUND_EFFECT_F: "entity.generic.explode",

    // volume and pitch
    VOLUME: 1,
    PITCH: 1,

    //bad damage

    FINALDMG: 150,

    //"good" distance in blocks
    MINDISTANCE: 3

}

var fighting = false


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
        end: new Date().getTime() + seconds * 1000,
        callback: callback
    });
}


/**
 * Used in tick function to let runDelay work
 */
function runDelayTick() {
    if (_TIMERS.length > 0) {
        var _newTimers = [];
        var _curTime = new Date().getTime();

        var timer;
        for (var i = 0; i < _TIMERS.length; i++) {
            timer = _TIMERS[i];
            if (_curTime >= timer.end) {
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

    if (e.id == 1) {
        if (Math.random() <= variables_sb.CHANCE) {
            if (variables_sb.SPAWN_DIAG != "") {
                e.npc.say(variables_sb.SPAWN_DIAG)
            }
            shadowblades(e)

        }
    }

}

function drawLine(world, pos1, pos2, resolution, particle,coloring)
{
    var resolution = resolution || 1; // Draw 1 particle per block
    var particle = particle || "endRod"; // Particle Id
    var NpcAPI = Java.type("noppes.npcs.api.NpcAPI").Instance();
    
    var drawAmount = Math.ceil(pos1.distanceTo(pos2))*resolution;

    var subs = pos2.subtract(pos1);
    for(var i = 0; i < drawAmount; i++) // Draw all particles
    {
        var x = (pos1.getX() + subs.getX()*(i/drawAmount)+0.5).toFixed(4);
        var y = (pos1.getY()+ subs.getY()*(i/drawAmount)+2).toFixed(4);
        var z = (pos1.getZ() + subs.getZ()*(i/drawAmount)+0.5).toFixed(4);
        var cords =  x + " " + y + " " + z;
        var output = NpcAPI.executeCommand(world, "particle " + particle + " "+coloring+" 1 "+ cords + " 0 0 0 1 0 force");
    }
}



/**
 * @param {NpcEvent.UpdateEvent} e
 */
function tick(e) {
    runDelayTick();
}

function shadowblades(event) {

    var closeentities = Java.from(event.npc.getWorld().getNearbyEntities(event.npc.getPos(), variables_sb.RADIUS_PCHECK, 1))
    if (closeentities.length != 0) {

        runDelay(variables_sb.SMALLHITDELAY, function () {

            if (closeentities.length != 0) {
                var randint=Math.floor(Math.random()*closeentities.length);
                var target1=closeentities[randint]
                closeentities.splice(randint,1);
                if (closeentities.length != 0) {
                    randint=Math.floor(Math.random()*closeentities.length);
                    var target2=closeentities[randint]
                    closeentities.splice(randint,1);
                }else{
                    event.npc.getWorld().spawnParticle(variables_sb.EXPLOSION_EFFECT_F, target1.getBlockX() + 0.5, target1.getBlockY(), target1.getBlockZ() + 0.5, 0.25, 1, 0.25, 0.5, 100);
                    target1.damage(variables_sb.FINALDMG)
                    return
                }
            }

            runDelay(variables_sb.SMALLHITDELAY, function () {
                
                if(target1.getPos().distanceTo(target2.getPos())>variables_sb.MINDISTANCE)
                {
                    drawLine(event.npc.getWorld(),target1.getPos(),target2.getPos(),10,"dust","1.000 0.000 0.000")      
                }
                else
                {
                    drawLine(event.npc.getWorld(),target1.getPos(),target2.getPos(),10,"dust","0.000 0.000 1.000")
                }
                

                runDelay(variables_sb.SMALLHITDELAY, function () {

                    if(target1.getPos().distanceTo(target2.getPos())>variables_sb.MINDISTANCE)
                {
                    drawLine(event.npc.getWorld(),target1.getPos(),target2.getPos(),10,"dust","1.000 0.000 0.000")      
                }
                else
                {
                    drawLine(event.npc.getWorld(),target1.getPos(),target2.getPos(),10,"dust","0.000 0.000 1.000")
                }

                    runDelay(variables_sb.SMALLHITDELAY, function () {

                        if(target1.getPos().distanceTo(target2.getPos())>variables_sb.MINDISTANCE)
                        {
                            drawLine(event.npc.getWorld(),target1.getPos(),target2.getPos(),10,"dust","1.000 0.000 0.000")      
                        }
                        else
                        {
                            drawLine(event.npc.getWorld(),target1.getPos(),target2.getPos(),10,"dust","0.000 0.000 1.000")
                        }

                        runDelay(variables_sb.SMALLHITDELAY, function () {

                            if(target1.getPos().distanceTo(target2.getPos())>variables_sb.MINDISTANCE)
                {
                    drawLine(event.npc.getWorld(),target1.getPos(),target2.getPos(),10,"dust","1.000 0.000 0.000")      
                }
                else
                {
                    drawLine(event.npc.getWorld(),target1.getPos(),target2.getPos(),10,"dust","0.000 0.000 1.000")
                }

                            runDelay(variables_sb.SMALLHITDELAY, function () {

                                if(target1.getPos().distanceTo(target2.getPos())>variables_sb.MINDISTANCE)
                                {
                                    drawLine(event.npc.getWorld(),target1.getPos(),target2.getPos(),10,"dust","1.000 0.000 0.000")      
                                }
                                else
                                {
                                    drawLine(event.npc.getWorld(),target1.getPos(),target2.getPos(),10,"dust","0.000 0.000 1.000")
                                }

                                runDelay(variables_sb.SMALLHITDELAY, function () {

                                   

                                    if(target1.getPos().distanceTo(target2.getPos())>variables_sb.MINDISTANCE)
                {
                    drawLine(event.npc.getWorld(),target1.getPos(),target2.getPos(),10,"dust","1.000 0.000 0.000")      
                }
                else
                {
                    drawLine(event.npc.getWorld(),target1.getPos(),target2.getPos(),10,"dust","0.000 0.000 1.000")
                }
                                    runDelay(variables_sb.SMALLHITDELAY, function () {

                                        if(target1.getPos().distanceTo(target2.getPos())>variables_sb.MINDISTANCE)
                {
                    drawLine(event.npc.getWorld(),target1.getPos(),target2.getPos(),10,"dust","1.000 0.000 0.000")      
                }
                else
                {
                    drawLine(event.npc.getWorld(),target1.getPos(),target2.getPos(),10,"dust","0.000 0.000 1.000")
                }
                                       

                                        runDelay(variables_sb.SMALLHITDELAY, function () {

                                            if(target1.getPos().distanceTo(target2.getPos())>variables_sb.MINDISTANCE)
                {
                    drawLine(event.npc.getWorld(),target1.getPos(),target2.getPos(),10,"dust","1.000 0.000 0.000")      
                }
                else
                {
                    drawLine(event.npc.getWorld(),target1.getPos(),target2.getPos(),10,"dust","0.000 0.000 1.000")
                }
                                            
                                            runDelay(variables_sb.SMALLHITDELAY, function () {

                                                if(target1.getPos().distanceTo(target2.getPos())>variables_sb.MINDISTANCE)
                {
                    drawLine(event.npc.getWorld(),target1.getPos(),target2.getPos(),10,"dust","1.000 0.000 0.000")
                    
                    event.npc.getWorld().playSoundAt(target1.getPos(), variables_sb.SOUND_EFFECT_F, variables_sb.VOLUME, variables_sb.PITCH)
                            event.npc.getWorld().spawnParticle(variables_sb.EXPLOSION_EFFECT_F, target1.getBlockX() + 0.5, target1.getBlockY(), target1.getBlockZ() + 0.5, 0.25, 1, 0.25, 0.5, 100);

                            target1.damage(variables_sb.FINALDMG)

                            event.npc.getWorld().playSoundAt(target2.getPos(), variables_sb.SOUND_EFFECT_F, variables_sb.VOLUME, variables_sb.PITCH)
                            event.npc.getWorld().spawnParticle(variables_sb.EXPLOSION_EFFECT_F, target2.getBlockX() + 0.5, target2.getBlockY(), target2.getBlockZ() + 0.5, 0.25, 1, 0.25, 0.5, 100);

                            target2.damage(variables_sb.FINALDMG)
                }
                else
                {
                    drawLine(event.npc.getWorld(),target1.getPos(),target2.getPos(),10,"dust","0.000 0.000 1.000")
                }


                                            })
                                        })
                                    })
                                })
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
function init(event) {
    fighting = false
    if (event.npc.getTimers().has(1)) {
        event.npc.getTimers().stop(1);
    }

}

/**
 * @param {NpcEvent.DamagedEvent} event
 */
function damaged(event) {
    var maxh = event.npc.getMaxHealth();
    var curh = event.npc.getHealth();
    if ((curh) < (maxh * variables_sb.UPPER_HP_PERC) && (curh > (maxh * variables_sb.LOWER_HP_PERC))) {
        if (!fighting) {
            if (variables_sb.STARF_DIAG != "") {
                event.npc.say(variables_sb.STARF_DIAG)
            }
            event.npc.getTimers().stop(1)
            event.npc.getTimers().start(1, variables_sb.TIMER * 20, true);
            fighting = true
        }

    }
    else if (curh < (maxh * variables_sb.LOWER_HP_PERC)) {
        fighting = false
        event.npc.getTimers().stop(1)
    }
}
