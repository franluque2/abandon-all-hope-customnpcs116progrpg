var variables = {
    //dialogue on end of fight, leave empty to say nothing
    ENDF_DIAG:"",

    //loot reward nbt to be dropped, leave empty ( "" ) to give nothing
    LOOTNBT:'{id: "ydm:card", Count: 1, tag: {image_index: 0, code: "42625254_0", id: 42625254L, rarity: "Common"}}'


}

var FactionEnum = {
    FRIEND: 0,
    FOE: 2
}

var giveUp = false;


// Timer called to reset the npc.
function timer(event)
{
    //Countdown to reset aggro
    if(event.id==0)
    {
        
    giveUp = false;
    event.npc.setHealth(event.npc.getMaxHealth());
    event.npc.clearPotionEffects();
    event.npc.setFaction(FactionEnum.FOE);
    event.npc.getAi().setRetaliateType(0);
    // The boss bar line can be removed if the npc doesn't show it.
    var display = event.npc.getDisplay().setBossColor(2);
    }

    
}


/**
 * @param {NpcEvent.InitEvent} event
 */
function init(event){
    event.npc.getAi().setNavigationType(1)
}

function damaged(event)
{
    if(event.damageSource.getType() == 'indirectMagic') {
        event.setCanceled(true);
        return;
    }
    // The script is called before the damages are actually taken! Basically, the npc still has his current HPs.
    // So we need to calculate how much HP he will have after the attack. If it drops to 0, then we can do the script.
    var remainingHP = event.npc.getHealth() - event.damage;
    if(remainingHP <= 0)
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
             
            if(variables.ENDF_DIAG!=""){
                event.npc.say(variables.ENDF_DIAG)
                }
            if(variables.LOOTNBT!=""){
                var createdItem=event.npc.getWorld().createItemFromNbt( event.API.stringToNbt(variables.LOOTNBT) )
                event.npc.dropItem(createdItem)
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
    if(!(event.npc.getFaction().getId() == FactionEnum.FRIEND) && (!fighting)){
        fighting=true
        if(variables.STARF_DIAG!=""){
            event.npc.say(variables.STARF_DIAG)
        }
        event.npc.timers.stop(1)
        event.npc.getTimers().start(1, variables.TIMER*20, true);
    }
}