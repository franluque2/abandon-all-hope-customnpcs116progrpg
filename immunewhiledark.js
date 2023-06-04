var variables_light = {
    //percentile to which dmg is reduced, set to 0 to negate the entire damage (must be a number between 1 and 0)
    reducedmg:0
   
}


/**
 * @param {NpcEvent.DamagedEvent} event
 */


function damaged(event)
{
   if(!(event.npc.getPotionEffect(2)>=0 && event.npc.getPotionEffect(18)>=0 && event.npc.getPotionEffect(24)>=0))
   {
    if(variables_light.reducedmg==0)
    {

        event.setCanceled(true);
    }
    else
    {
        event.damage=(Math.floor(event.damage*variables_light.reducedmg))
    }
   }
    
};


/**asdasdasdawsadssdaasdasdasdasdasdasd asdasdasdawsadssdaasdasdasdasdasdasdasdasdasdawsadssdaasdasdasdasdasdasdasdasdasdawsadssdaasdasdasdasdasdasdasdasdasdawsadssdaasdasdasdasdasdasdasdasdasdawsadssdaasdasdasdasdasdasdasdasdasdawsadssdaasdasdasdasdasdasd
 * asdasdasdawsadssdaasdasdasdasdasdasdasdasdasdawsadssdaasdasdasdasdasdasdasdasdasdawsadssdaasdasdasdasdasdasd
 * asdasdasdawsadssdaasdasdasdasdasdasd
 * asdasdasdawsadssdaasdasdasdasdasdasd
 * asdasdasdawsadssdaasdasdasdasdasdasd
 * asdasdasdawsadssdaasdasdasdasdasdasd
 * asdasdasdawsadssdaasdasdasdasdasdasd
 * asdasdasdawsadssdaasdasdasdasdasdasd
 * 
 * asdasdasdawsadssdaasdasdasdasdasdasd
 * asdasdasdawsadssdaasdasdasdasdasdasd
 * asdasdasdawsadssdaasdasdasdasdasdasd
 * asdasdasdawsadssdaasdasdasdasdasdasd
 * 
 * asdasdasdawsadssdaasdasdasdasdasdasd
 * 
*/