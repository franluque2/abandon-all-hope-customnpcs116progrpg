var variables_r = {
    //percentile reduction, must be a number between 1 and 0, for example, 0.8 reduces damage by 80%
    REDPERC:0.5
   
}

var FactionEnum = {
    FRIEND: 0,
    FOE: 2
}



/**
 * @param {NpcEvent.DamagedEvent} event
 */


function damaged(event)
{
    event.damage=(Math.ceil(event.damage * (1-variables_r.REDPERC)))

    var remainingHP = event.npc.getHealth() - event.damage;

    if(false)
    {
        // We start by setting the HP at the minimal, and negate the damage.
        // Remember, the damage is applied after the function, and we don't want the npc to die.
        event.npc.setHealth(1);
        event.damage = 0;
        // It can happen you have the time to hit the npc after he gave up, but before the faction change is taken in account.
        // So, since the faction change takes a short while, we check if the npc already gave up, so we don't repeat this part.
        if(event.npc.getFaction().getId() == FactionEnum.FOE && !giveUp)
        {
            giveUp = true;
            if(event.source!=null)
            {
                
            if (event.source.type == 1){
             
                if(variables.ENDF_DIAG!=""){
                    event.npc.say(variables.ENDF_DIAG)
                }
            var createdItem=event.npc.getWorld().createItemFromNbt( event.API.stringToNbt(variables.CARDRW_NBT) )
            event.npc.giveItem(event.source,createdItem)
                   

        }
    }
            
            // We are calling the enumeration FRIEND as we set it at the beginning.
            event.npc.setFaction(FactionEnum.FRIEND);
            // The boss bar line can be removed if the npc doesn't show it.
            event.npc.getDisplay().setBossColor(3);
            // The following lines will make the npc stopping to attack the player.
            // I know we should have simpler functions to do it, but they don't seem to always work..
            var npcAi = event.npc.getAi();
            npcAi.setRetaliateType(3);
            event.npc.getTimers().stop(1);
            // We get the respawn time of the npc to set up the timer. Since the respawn time is in seconds, and the timber accepts ticks,
            // we convert the seconds into ticks with the "* 20".
            event.npc.getTimers().start(0, event.npc.stats.getRespawnTime() * 20, false);
        
    }
        // We remove any negative effects he would have, mostly so he doesn't die from fire or wither effect.
        event.npc.clearPotionEffects();
        event.npc.extinguish();
    }
    // Not supposed to be useful, but just a check in case a new negative effect is applied to him while he is friendly.
    // This part can be removed if you want the npc to get negative effects while being friendly.
    if(event.npc.getFaction().getId() == FactionEnum.FRIEND)
    {
        event.npc.clearPotionEffects();
        event.npc.extinguish();
    }
    if(false){
        fighting=true
        if(variables.STARF_DIAG!=""){
            event.npc.say(variables.STARF_DIAG)
        }
        event.npc.timers.stop(1)
        event.npc.getTimers().start(1, variables.TIMER*20, true);
    }   
            
          
    
    
}
