
//giving kill credit for pvp quests

/**
 * @param {PlayerEvent.DiedEvent} event
 */

function died(event){
    var currentquests=[]
    var currentobjs=[]
    var closeentities=event.player.getWorld().getNearbyEntities(event.player.getPos(), 20, 1)
    if (closeentities.length!=0){
        for (var i = 0; i < closeentities.length; i++) {
            if (closeentities[i]==event.player)
            {


            }else{
                
                
            currentquests=closeentities[i].getActiveQuests()
            if (currentquests.length!=0){
                for (var j = 0; j < currentquests.length; j++) {
                    currentobjs=currentquests[j].getObjectives(closeentities[i])
                    if (currentobjs.length!=0){
                        for (var k = 0; k < currentobjs.length; k++) {
                            if (currentobjs[k].getText()=="Player"){
                                var newprogress=currentobjs[k].getProgress()+1
                                currentobjs[k].setProgress(newprogress)
                            }
                        }
                    }

                }
            }
        }
        
    }
        
    }
    }