var variables_l={
    //radius players will be checked around the enemy for the death damage
    RADIUS: 5,

    //radius players will be checked around the enemy for the periodic damage
    RADIUS_P:5,

    //damage for the death effect
    DMG_DEATH:10,
    //damage for the periodic damage
    DMG_P:2,

    //time (in seconds) of the periodic damage
    P_TIME:3,
    //thing to say on death, leave empty to say nothing
    DEATHMSG:"",
    //thing to say on periodic damage, leave empty to say nothing
    PMSG:"",
    //chance for the periodic damage, must be a number between 1 (always happens) and 0 (never)
    P_CHANCE:1,

    //visual effect used for the explosion on death
    EXPLOSION_EFFECT_DEATH:"explosion",
    //sound effect used for the explosion on death
    SOUND_EFFECT_DEATH:"entity.generic.explode",

    //visual effect used for the periodic damage
    EXPLOSION_EFFECT_P:"instant_effect",
    //sound effect used for the periodic damage
    SOUND_EFFECT_P:"entity.lightning_bolt.impact",

        // volume and pitch
        VOLUME:1,
        PITCH:1,
    
}


function timer(event)
{
    if(event.id==0)
    {
        if(Math.random()<variables_l.P_CHANCE)
        {
            
        if(variables_l.PMSG!=""){
            event.npc.say(variables_l.PMSG)
        }

        var closeentities=event.npc.getWorld().getNearbyEntities(event.npc.getPos(), variables_l.RADIUS_P, 1)
        if (closeentities.length!=0){
            event.npc.getWorld().spawnParticle(variables_l.EXPLOSION_EFFECT_P,event.npc.getBlockX()+0.5,event.npc.getBlockY(),event.npc.getBlockZ()+0.5,0.25,1,0.25,0.5,100);
            event.npc.getWorld().playSoundAt(event.npc.getPos(),variables_l.SOUND_EFFECT_P,variables_l.VOLUME,variables_l.PITCH)
            for (var i = 0; i < closeentities.length; i++) {
                closeentities[i].damage(variables_l.DMG_P)
            }
        }

    }


    }
}

/**
 * @param {NpcEvent.InitEvent} event
 */
 function init(event){
    if (event.npc.getTimers().has(0)) {
        event.npc.getTimers().stop(0);
    }
    event.npc.getTimers().start(0, variables_l.P_TIME*20, true);
}



// /**
//  * @param {NpcEvent.DamagedEvent} event
//  */
// function damaged(event)
// {


//     var remainingHP = event.npc.getHealth() - event.damage;
//     if(remainingHP <= 0)
//     {
//         var closeentities=event.npc.getWorld().getNearbyEntities(event.npc.getPos(), variables_l.RADIUS, 1)
//             if (closeentities.length!=0){
//                 for (var i = 0; i < closeentities.length; i++) {
//                     event.npc.say(closeentities[i].getName())
//                     event.npc.executeCommand(variables_l.COMMAND.replace('/playername/g',closeentities[i].getName()))
//                 }
//             }     
//    }
            
// }


/**
 * @param {NpcEvent.DiedEvent} event
 */

function died(event){
    var closeentities=event.npc.getWorld().getNearbyEntities(event.npc.getPos(), variables_l.RADIUS, 1)
    if (closeentities.length!=0){
        if (variables_l.DEATHMSG!=""){
            event.npc.say(variables_l.DEATHMSG)
        }
        event.npc.getWorld().spawnParticle(variables_l.EXPLOSION_EFFECT_DEATH,event.npc.getBlockX()+0.5,event.npc.getBlockY(),event.npc.getBlockZ()+0.5,0.25,1,0.25,0.5,100);
            event.npc.getWorld().playSoundAt(event.npc.getPos(),variables_l.SOUND_EFFECT_DEATH,variables_l.VOLUME,variables_l.PITCH)
        for (var i = 0; i < closeentities.length; i++) {
            closeentities[i].damage(variables_l.DMG_DEATH)
        }
    }     
}