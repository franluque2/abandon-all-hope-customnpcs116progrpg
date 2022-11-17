//Time (In seconds) to despawn
var despawntimer=10


function timer(event)
{
    if(event.id==99)
    {
    event.npc.despawn()    
    }
}

/**
 * @param {NpcEvent.InitEvent} event
 */
 function init(event){
    if (event.npc.getTimers().has(99)) {
        event.npc.getTimers().stop(99);
    }
    event.npc.getTimers().start(99, despawntimer*20, true);
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

