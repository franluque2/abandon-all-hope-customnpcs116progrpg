var variables_eldlich = {
    // dialogue when falling below starting designated health, leave empty ("") to say nothing
    STARF_DIAG: "You come for the Eldlixir? Thousands have died doing the same.",

    //dialogue every time mooks are spawned, leave empty to say nothing
    SPAWN_DIAG: "",

    //dialogue once all 3 mobs are dead
    ALLMOOKSDEADDIAG:"They may all be gone... but I can still transmute you!",

    //dialogue on death
    DEATHDIAG:"Impossible... I was promised... infinite power...",

    //health percentile from which to start spawning guys, must be a number between 1 (full hp) and 0
    UPPER_HP_PERC: 0.999,

    //health percentile from which to stop spawning guys, must be a number between 1 (full hp) and 0
    LOWER_HP_PERC: 0.0001,

    MOOKS: [
        {
            //guy to spawn, must be the EXACT name of the npc to spawn in the mob cloning tool
            MOOKNAME: "Conquistador of the Golden Land",
            //tab in which the guy to spawn is in the mob cloning tool
            MOOKTAB: 1,

            //number of guys to spawn
            NUMOOKS: 1,



            //x coordinate of where to spawn mook
            XCOORD: 65.499,
            //y coordinate
            YCOORD: 178,
            //z coordinate
            ZCOORD: -151.419,

            //dialogue said when it dies and sacrifices the guy
            SACDIAG:"Conquistador... I'll transmute you into my power, relish in becoming part of a divine king.",

            //x coordinate of where to move mook on fight start
            XCOORDMOV: 35.331,
            //y coordinate
            YCOORDMOV: 160,
            //z coordinate
            ZCOORDMOV: -151.818,
        },
        {
            //guy to spawn, must be the EXACT name of the npc to spawn in the mob cloning tool
            MOOKNAME: "Huaquero of the Golden Land",
            //tab in which the guy to spawn is in the mob cloning tool
            MOOKTAB: 1,

            //number of guys to spawn
            NUMOOKS: 1,



            //x coordinate of where to spawn mook
            XCOORD: 42.368,
            //y coordinate
            YCOORD: 178,
            //z coordinate
            ZCOORD: -140.388,
            //dialogue said when it dies and sacrifices the guy
            SACDIAG:"You finally meet your end by having your energy stolen, Huaquero, how ironic.",


            //x coordinate of where to move mook on fight start
            XCOORDMOV: 42.368,
            //y coordinate
            YCOORDMOV: 160,
            //z coordinate
            ZCOORDMOV: -140.388,
        },
        {
            //guy to spawn, must be the EXACT name of the npc to spawn in the mob cloning tool
            MOOKNAME: "Guardian of the Golden Land",
            //tab in which the guy to spawn is in the mob cloning tool
            MOOKTAB: 1,

            //number of guys to spawn
            NUMOOKS: 1,



            //x coordinate of where to spawn mook
            XCOORD: 42.451,
            //y coordinate
            YCOORD: 178,
            //z coordinate
            ZCOORD: -162.493,
            //dialogue said when it dies and sacrifices the guy
            SACDIAG:"Fulfill your role as guardian and become my energy!",

            //x coordinate of where to move mook on fight start
            XCOORDMOV: 42.451,
            //y coordinate
            YCOORDMOV: 160,
            //z coordinate
            ZCOORDMOV: -162.493,
        }
    ],


    //will only spawn enemies if there are players in this radius
    RADIUS_PCHECK: 30,

    HITRADIUS:64
}

var fighting = false
var deadmooks=["Eldlich the Golden Lord"]
var validnames=[""]

/**
 * @param {NpcEvent.InitEvent} event
 */
function init(event) {
    fighting = false
    deadmooks=[event.npc.getName()]
    validnames=[""]
        var pos = event.npc.getPos();
        variables_eldlich.MOOKS.forEach(function(mook)
            {
            validnames.push(mook.MOOKNAME)
            var entities_at_pos = event.npc.getWorld().getNearbyEntities(mook.XCOORD, mook.YCOORD, mook.ZCOORD, 0.2, 2)
            if (entities_at_pos.length == 0) {
                event.npc.getWorld().spawnClone(mook.XCOORD, mook.YCOORD, mook.ZCOORD, mook.MOOKTAB, mook.MOOKNAME);
            }
            
            
        });
        

    

}

/**
 * @param {NpcEvent.DamagedEvent} event
 */
function damaged(event) {
    var maxh = event.npc.getMaxHealth();
    var curh = Math.floor(event.npc.getHealth());
    var nearbymooks=[""];
    if ((curh) < (maxh * variables_eldlich.UPPER_HP_PERC) && (curh > (maxh * variables_eldlich.LOWER_HP_PERC))) {
        if (!fighting) {
            if (variables_eldlich.STARF_DIAG != "") {
                event.npc.say(variables_eldlich.STARF_DIAG)
            }

        nearbymooks=event.npc.getWorld().getNearbyEntities(event.npc.getPos(),50, 2)
        if(nearbymooks.length!=0)
        {
            for (var i = 0; i < nearbymooks.length; i++) {
                if (validnames.indexOf(nearbymooks[i].getName()) >= 0)
                {
                    variables_eldlich.MOOKS.slice()
                    .forEach(function(mook) {
                    
                    if (mook.MOOKNAME==nearbymooks[i].getName())
                    {
                        nearbymooks[i].setPosition(mook.XCOORDMOV,mook.YCOORDMOV,mook.ZCOORDMOV)
                    }
                    })
                }}

            
        }
        fighting = true
    }
    }
    else if (curh < (maxh * variables_eldlich.LOWER_HP_PERC)) {
        fighting = false
    }
    /*event.npc.say(curh)
    event.npc.say(event.damage)*/
    if (curh-Math.ceil(event.damage)<=10)
    {
        nearbymooks=event.npc.getWorld().getNearbyEntities(event.npc.getPos(),50, 2)

        if(nearbymooks.length!=0)
        {
            for (var i = 0; i < nearbymooks.length; i++) {
                if ((!(deadmooks.indexOf(nearbymooks[i].getName()) >= 0)) && (validnames.indexOf(nearbymooks[i].getName()) >= 0))
                {
                    deadmooks.push(nearbymooks[i].getName())
                    nearbymooks[i].getAi().setMovingType(0)
                    nearbymooks[i].getAi().setRetaliateType(3)
                    
                    nearbymooks[i].getDisplay().setTint(0xFFFF00)
                    nearbymooks[i].getDisplay().setHasLivingAnimation(false)

                    event.npc.getWorld().spawnParticle("explosion",nearbymooks[i].getBlockX()+0.5,nearbymooks[i].getBlockY(),nearbymooks[i].getBlockZ()+0.5,0.25,1,0.25,0.5,100);
                    event.npc.getWorld().playSoundAt(nearbymooks[i].getPos(),"entity.generic.explode",10,1)


                    variables_eldlich.MOOKS.slice()
                    .forEach(function(mook) {
                    
                    if (mook.MOOKNAME==nearbymooks[i].getName())
                    {
                        event.npc.say(mook.SACDIAG)
                    }
                    })

                    if(deadmooks.length==4)
                    {
                        if (variables_eldlich.ALLMOOKSDEADDIAG != "") {
                            event.npc.say(variables_eldlich.ALLMOOKSDEADDIAG)
                        }

                        event.npc.getWorld().spawnParticle("explosion_emitter",event.npc.getBlockX()+0.5,event.npc.getBlockY(),event.npc.getBlockZ()+0.5,0.25,1,0.25,0.5,100);
                        event.npc.getWorld().playSoundAt(event.npc.getPos(),"entity.generic.explode",10,1)

                        var hit=event.npc.getWorld().getNearbyEntities(event.npc.getPos(), variables_eldlich.HITRADIUS, 1)
                        
                        if (hit.length!=0){
                            for (var i = 0; i < hit.length; i++) {
                                hit[i].setHealth(Math.ceil(hit[i].getMaxHealth()*0.15))
                            }
        
                        }
                    }


                    event.npc.setHealth(event.npc.getMaxHealth())
                    event.setCanceled(true);

                    return;
                } 
            }

            
            Java.from(nearbymooks).slice().reverse()
                .forEach(function(entity) {
                    
                    if (validnames.indexOf(entity.getName()) >= 0)
                    {
                        entity.despawn()
                    }
                    })
            
            if (variables_eldlich.DEATHDIAG != "") {
                event.npc.say(variables_eldlich.DEATHDIAG)
            }

        }
        
    }
    
}
