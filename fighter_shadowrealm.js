var variables_sw = {
    // time (in seconds) between eacg check
    TIMER: 5,
    //chance it will do shadow realm every time it checks, must be a number between 1 and 0
    CHANCE: 1,

    // dialogue when falling below starting designated health, leave empty ("") to say nothing
    STARF_DIAG: "starting fight",

    //dialogue every time Shadow realm is done
    SPAWN_DIAG: "Doing Shadow Realm",

    //health percentile from which to start Shadow realm
    UPPER_HP_PERC: 1,

    //health percentile from which to stop Shadow realm
    LOWER_HP_PERC: 0.01,

    //will check for players in this radius for Shadow realm
    RADIUS_PCHECK: 30,

    //delay (in seconds) between the checks of the Shadow realm
    SMALLHITDELAY: 0.5,

    //sound effect used for shadow realm check
    SMALLJUMPSCARESOUND: "entity.ghast.hurt",

    //visual effect used for the damage
    EXPLOSION_EFFECT_F: "explosion",
    //sound effect used for the damage
    SOUND_EFFECT_F: "entity.generic.explode",

    // volume and pitch
    VOLUME: 1,
    PITCH: 1,

    //movement damage

    FINALDMG: 150

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
        if (Math.random() <= variables_sw.CHANCE) {
            if (variables_sw.SPAWN_DIAG != "") {
                e.npc.say(variables_sw.SPAWN_DIAG)
            }
            shadowrealm(e)

        }
    }

}

/**
 * @param {NpcEvent.UpdateEvent} e
 */
function tick(e) {
    runDelayTick();
}

function shadowrealm(event) {

    var closeentities = Java.from(event.npc.getWorld().getNearbyEntities(event.npc.getPos(), variables_sw.RADIUS_PCHECK, 1))
    if (closeentities.length != 0) {
        var closeentitiespos = []

        event.npc.getAi().setMovingType(0)
        event.npc.getAi().setNavigationType(1)
        event.npc.getDisplay().setVisible(1)



        runDelay(variables_sw.SMALLHITDELAY, function () {

            if (closeentities.length != 0) {
                for (var i = 0; i < closeentities.length; i++) {
                    closeentities[i].addPotionEffect(15, Math.ceil(10*variables_sw.SMALLHITDELAY+3), 1, true)
                    closeentitiespos[i] = closeentities[i].getPos()
                }
            }

            runDelay(variables_sw.SMALLHITDELAY, function () {

                if (closeentities.length != 0) {
                    for (var i = 0; i < closeentities.length; i++) {

                        if (closeentitiespos[i].distanceTo(closeentities[i].getPos()) > 1) {
                            event.npc.getWorld().playSoundAt(closeentities[i].getPos(), variables_sw.SOUND_EFFECT_F, variables_sw.VOLUME, variables_sw.PITCH)
                            event.npc.getWorld().spawnParticle(variables_sw.EXPLOSION_EFFECT_F, closeentities[i].getBlockX() + 0.5, closeentities[i].getBlockY(), closeentities[i].getBlockZ() + 0.5, 0.25, 1, 0.25, 0.5, 100);

                            closeentities[i].damage(variables_sw.FINALDMG)

                            closeentities.splice(i, 1)
                            closeentitiespos.splice(i, 1)
                        } else {
                            event.npc.getWorld().playSoundAt(closeentities[i].getPos(), variables_sw.SMALLJUMPSCARESOUND, variables_sw.VOLUME, variables_sw.PITCH)
                        }

                    }
                }

                runDelay(variables_sw.SMALLHITDELAY, function () {

                    if (closeentities.length != 0) {
                        for (var i = 0; i < closeentities.length; i++) {

                            if (closeentitiespos[i].distanceTo(closeentities[i].getPos()) > 1) {
                                event.npc.getWorld().playSoundAt(closeentities[i].getPos(), variables_sw.SOUND_EFFECT_F, variables_sw.VOLUME, variables_sw.PITCH)
                                event.npc.getWorld().spawnParticle(variables_sw.EXPLOSION_EFFECT_F, closeentities[i].getBlockX() + 0.5, closeentities[i].getBlockY(), closeentities[i].getBlockZ() + 0.5, 0.25, 1, 0.25, 0.5, 100);

                                closeentities[i].damage(variables_sw.FINALDMG)

                                closeentities.splice(i, 1)
                                closeentitiespos.splice(i, 1)
                            } else {
                                event.npc.getWorld().playSoundAt(closeentities[i].getPos(), variables_sw.SMALLJUMPSCARESOUND, variables_sw.VOLUME, variables_sw.PITCH)
                            }

                        }
                    }

                    runDelay(variables_sw.SMALLHITDELAY, function () {

                        if (closeentities.length != 0) {
                            for (var i = 0; i < closeentities.length; i++) {

                                if (closeentitiespos[i].distanceTo(closeentities[i].getPos()) > 1) {
                                    event.npc.getWorld().playSoundAt(closeentities[i].getPos(), variables_sw.SOUND_EFFECT_F, variables_sw.VOLUME, variables_sw.PITCH)
                                    event.npc.getWorld().spawnParticle(variables_sw.EXPLOSION_EFFECT_F, closeentities[i].getBlockX() + 0.5, closeentities[i].getBlockY(), closeentities[i].getBlockZ() + 0.5, 0.25, 1, 0.25, 0.5, 100);

                                    closeentities[i].damage(variables_sw.FINALDMG)

                                    closeentities.splice(i, 1)
                                    closeentitiespos.splice(i, 1)
                                } else {
                                    event.npc.getWorld().playSoundAt(closeentities[i].getPos(), variables_sw.SMALLJUMPSCARESOUND, variables_sw.VOLUME, variables_sw.PITCH)
                                }

                            }
                        }

                        runDelay(variables_sw.SMALLHITDELAY, function () {

                            if (closeentities.length != 0) {
                                for (var i = 0; i < closeentities.length; i++) {

                                    if (closeentitiespos[i].distanceTo(closeentities[i].getPos()) > 1) {
                                        event.npc.getWorld().playSoundAt(closeentities[i].getPos(), variables_sw.SOUND_EFFECT_F, variables_sw.VOLUME, variables_sw.PITCH)
                                        event.npc.getWorld().spawnParticle(variables_sw.EXPLOSION_EFFECT_F, closeentities[i].getBlockX() + 0.5, closeentities[i].getBlockY(), closeentities[i].getBlockZ() + 0.5, 0.25, 1, 0.25, 0.5, 100);

                                        closeentities[i].damage(variables_sw.FINALDMG)

                                        closeentities.splice(i, 1)
                                        closeentitiespos.splice(i, 1)
                                    } else {
                                        event.npc.getWorld().playSoundAt(closeentities[i].getPos(), variables_sw.SMALLJUMPSCARESOUND, variables_sw.VOLUME, variables_sw.PITCH)
                                    }

                                }
                            }

                            runDelay(variables_sw.SMALLHITDELAY, function () {

                                if (closeentities.length != 0) {
                                    for (var i = 0; i < closeentities.length; i++) {

                                        if (closeentitiespos[i].distanceTo(closeentities[i].getPos()) > 1) {
                                            event.npc.getWorld().playSoundAt(closeentities[i].getPos(), variables_sw.SOUND_EFFECT_F, variables_sw.VOLUME, variables_sw.PITCH)
                                            event.npc.getWorld().spawnParticle(variables_sw.EXPLOSION_EFFECT_F, closeentities[i].getBlockX() + 0.5, closeentities[i].getBlockY(), closeentities[i].getBlockZ() + 0.5, 0.25, 1, 0.25, 0.5, 100);

                                            closeentities[i].damage(variables_sw.FINALDMG)

                                            closeentities.splice(i, 1)
                                            closeentitiespos.splice(i, 1)
                                        } else {
                                            event.npc.getWorld().playSoundAt(closeentities[i].getPos(), variables_sw.SMALLJUMPSCARESOUND, variables_sw.VOLUME, variables_sw.PITCH)
                                        }

                                    }
                                }

                                runDelay(variables_sw.SMALLHITDELAY, function () {

                                    if (closeentities.length != 0) {
                                        for (var i = 0; i < closeentities.length; i++) {

                                            if (closeentitiespos[i].distanceTo(closeentities[i].getPos()) > 1) {
                                                event.npc.getWorld().playSoundAt(closeentities[i].getPos(), variables_sw.SOUND_EFFECT_F, variables_sw.VOLUME, variables_sw.PITCH)
                                                event.npc.getWorld().spawnParticle(variables_sw.EXPLOSION_EFFECT_F, closeentities[i].getBlockX() + 0.5, closeentities[i].getBlockY(), closeentities[i].getBlockZ() + 0.5, 0.25, 1, 0.25, 0.5, 100);

                                                closeentities[i].damage(variables_sw.FINALDMG)

                                                closeentities.splice(i, 1)
                                                closeentitiespos.splice(i, 1)
                                            } else {
                                                event.npc.getWorld().playSoundAt(closeentities[i].getPos(), variables_sw.SMALLJUMPSCARESOUND, variables_sw.VOLUME, variables_sw.PITCH)
                                            }

                                        }
                                    }

                                    runDelay(variables_sw.SMALLHITDELAY, function () {

                                        if (closeentities.length != 0) {
                                            for (var i = 0; i < closeentities.length; i++) {

                                                if (closeentitiespos[i].distanceTo(closeentities[i].getPos()) > 1) {
                                                    event.npc.getWorld().playSoundAt(closeentities[i].getPos(), variables_sw.SOUND_EFFECT_F, variables_sw.VOLUME, variables_sw.PITCH)
                                                    event.npc.getWorld().spawnParticle(variables_sw.EXPLOSION_EFFECT_F, closeentities[i].getBlockX() + 0.5, closeentities[i].getBlockY(), closeentities[i].getBlockZ() + 0.5, 0.25, 1, 0.25, 0.5, 100);

                                                    closeentities[i].damage(variables_sw.FINALDMG)

                                                    closeentities.splice(i, 1)
                                                    closeentitiespos.splice(i, 1)
                                                } else {
                                                    event.npc.getWorld().playSoundAt(closeentities[i].getPos(), variables_sw.SMALLJUMPSCARESOUND, variables_sw.VOLUME, variables_sw.PITCH)
                                                }

                                            }
                                        }

                                        runDelay(variables_sw.SMALLHITDELAY, function () {

                                            if (closeentities.length != 0) {
                                                for (var i = 0; i < closeentities.length; i++) {

                                                    if (closeentitiespos[i].distanceTo(closeentities[i].getPos()) > 1) {
                                                        event.npc.getWorld().playSoundAt(closeentities[i].getPos(), variables_sw.SOUND_EFFECT_F, variables_sw.VOLUME, variables_sw.PITCH)
                                                        event.npc.getWorld().spawnParticle(variables_sw.EXPLOSION_EFFECT_F, closeentities[i].getBlockX() + 0.5, closeentities[i].getBlockY(), closeentities[i].getBlockZ() + 0.5, 0.25, 1, 0.25, 0.5, 100);

                                                        closeentities[i].damage(variables_sw.FINALDMG)

                                                        closeentities.splice(i, 1)
                                                        closeentitiespos.splice(i, 1)
                                                    } else {
                                                        event.npc.getWorld().playSoundAt(closeentities[i].getPos(), variables_sw.SMALLJUMPSCARESOUND, variables_sw.VOLUME, variables_sw.PITCH)
                                                    }

                                                }
                                            }

                                            runDelay(variables_sw.SMALLHITDELAY, function () {

                                                if (closeentities.length != 0) {
                                                    for (var i = 0; i < closeentities.length; i++) {

                                                        if (closeentitiespos[i].distanceTo(closeentities[i].getPos()) > 1) {
                                                            event.npc.getWorld().playSoundAt(closeentities[i].getPos(), variables_sw.SOUND_EFFECT_F, variables_sw.VOLUME, variables_sw.PITCH)
                                                            event.npc.getWorld().spawnParticle(variables_sw.EXPLOSION_EFFECT_F, closeentities[i].getBlockX() + 0.5, closeentities[i].getBlockY(), closeentities[i].getBlockZ() + 0.5, 0.25, 1, 0.25, 0.5, 100);

                                                            closeentities[i].damage(variables_sw.FINALDMG)

                                                            closeentities.splice(i, 1)
                                                            closeentitiespos.splice(i, 1)
                                                        } else {
                                                            event.npc.getWorld().playSoundAt(closeentities[i].getPos(), variables_sw.SMALLJUMPSCARESOUND, variables_sw.VOLUME, variables_sw.PITCH)
                                                        }

                                                    }
                                                }


                                                event.npc.getAi().setMovingType(1)
                                                event.npc.getAi().setNavigationType(1)
                                                event.npc.getDisplay().setVisible(0)
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
    if ((curh) < (maxh * variables_sw.UPPER_HP_PERC) && (curh > (maxh * variables_sw.LOWER_HP_PERC))) {
        if (!fighting) {
            if (variables_sw.STARF_DIAG != "") {
                event.npc.say(variables_sw.STARF_DIAG)
            }
            event.npc.getTimers().stop(1)
            event.npc.getTimers().start(1, variables_sw.TIMER * 20, true);
            fighting = true
        }

    }
    else if (curh < (maxh * variables_sw.LOWER_HP_PERC)) {
        fighting = false
        event.npc.getTimers().stop(1)
    }
}
