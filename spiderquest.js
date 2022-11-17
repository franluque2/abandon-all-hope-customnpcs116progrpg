
/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
 function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

/**
 * @param {NpcEvent.TimerEvent} event
 */
function timer(event)
{
    //Countdown to move
    if(event.id==1)
    {
        event.npc.addPotionEffect(8,80,8,false)

        
        
        event.npc.ai.setMovingType(2);
        event.npc.ai.setMovingPathType(0,false);

        var customPath = [[626,76,864], [626,76,845], [635,76,852], [642,76,864]];
        shuffle(customPath)
        var nbtcache = event.npc.entityNbt;
        var list = nbtcache.getList("MovingPathNew",10);
        list = Java.from(list);
        list = [];
        for(var i =0;i<customPath.length;i++){
        list[i] = event.API.stringToNbt("{Array:["+customPath[i]+"]}");
        }
        list = Java.to(list);
        nbtcache.setList("MovingPathNew", list);
        event.npc.setEntityNbt(nbtcache);
    

    
    
    

    
    }
    else if (event.id==2)
    {

        var pos1=event.API.getIPos(635,72,851)
        var closeentities1=event.npc.getWorld().getNearbyEntities(pos1, 5, 1)

        var pos2=event.API.getIPos(634,72,863)
        var closeentities2=event.npc.getWorld().getNearbyEntities(pos1, 5, 1)

        var pos3=event.API.getIPos(634,72,849)
        var closeentities3=event.npc.getWorld().getNearbyEntities(pos1, 5, 1)

        if (closeentities1.length!=0){
            for (var i = 0; i < closeentities1.length; i++) {
                closeentities1[i].addPotionEffect(15,10,1,true)
            }
        }
        if (closeentities2.length!=0){
            for (var i = 0; i < closeentities2.length; i++) {
                closeentities2[i].addPotionEffect(15,10,1,true)
            }
        }
        if (closeentities3.length!=0){
            for (var i = 0; i < closeentities3.length; i++) {
                closeentities3[i].addPotionEffect(15,10,1,true)
            }
        }
    }
}



/**
  * @param {NpcEvent.UpdateEvent} event
  */
 function tick(event){
    var timers = event.npc.getTimers();
    if(!(timers.has(1))) {
        event.npc.getTimers().start(1,30*20,true)
        event.npc.getTimers().start(2,5*20,true)
    }
    
 }
