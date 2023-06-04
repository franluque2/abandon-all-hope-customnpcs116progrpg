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

            //melee atk stat change on death (additive to base)
            CHANGETOATKDMG:50,
            CHANGETOATKSPEED:10
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

            //melee atk stat change on death (additive to base)
            CHANGETOATKDMG:50,
            CHANGETOATKSPEED:10
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

            //melee atk stat change on death (additive to base)
            CHANGETOATKDMG:50,
            CHANGETOATKSPEED:10
        }
    ],


    //will only spawn enemies if there are players in this radius
    RADIUS_PCHECK: 30,

    HITRADIUS:64,

    //teleport everyone in range to boss
    diagteleport:"You thought you were safe, casters?",
    teleportrange:64,
    teleportcd:10,
    teleportsoundeff:"minecraft:entity.ender_eye.death",
    teleportparticle:"portal",
    teleportchance:0.8,

    //base stats to reset npc
    basemeleeatkstr:500,
    basemeleeatkspeed:60,

    //base music to reset npc
    basemusic: " ",

    //bard to change music, must be the EXACT name of the npc to spawn in the mob cloning tool
    bardname: "bard person",


    //final phase music
    finalphasemusic:" ",
   



}

var fighting = false
var deadmooks=["Eldlich the Golden Lord"]
var validnames=[""]

var eldconstants=
{

    TELEPORT_TO_BOSS:1,

}

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
        
        if (event.npc.getTimers().has(eldconstants.TELEPORT_TO_BOSS)) {
            event.npc.getTimers().stop(eldconstants.TELEPORT_TO_BOSS);
        }
    changemusic(event.npc, variables_eldlich.basemusic)
    event.npc.getStats().getMelee().setStrength(variables_eldlich.basemeleeatkstr)
    event.npc.getStats().getMelee().setDelay(variables_eldlich.basemeleeatkspeed)


    
}

/**
 * @param {ICustomNpc} e
 * @param {string} str
 */
function changemusic(e, str)
{
    var nearbymooks=e.getWorld().getNearbyEntities(e.getPos(),50, 2)
    if(nearbymooks.length!=0)
    {
        for (var i = 0; i < nearbymooks.length; i++) {
            if (nearbymooks[i].getName() == variables_eldlich.bardname)
            {
                nearbymooks[i].getJob().setSong(str)
            }}

        
    }
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
        
        if (event.npc.getTimers().has(eldconstants.TELEPORT_TO_BOSS)) {
            event.npc.getTimers().stop(eldconstants.TELEPORT_TO_BOSS);
        }
        event.npc.getTimers().start(eldconstants.TELEPORT_TO_BOSS,variables_eldlich.teleportcd*20,true)


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
        //event.npc.say("HERE")
        nearbymooks=event.npc.getWorld().getNearbyEntities(event.npc.getPos(),50, 2)

        if(nearbymooks.length!=0)
        {
            for (var i = 0; i < nearbymooks.length; i++) {
                if ((!(deadmooks.indexOf(nearbymooks[i].getName()) >= 0)) && (validnames.indexOf(nearbymooks[i].getName()) >= 0))
                {
                    deadmooks.push(nearbymooks[i].getName())
                    nearbymooks[i].getAi().setMovingType(0)
                    nearbymooks[i].getAi().setRetaliateType(3)
                    nearbymooks[i].getAi().setWalkingSpeed(0)

                    
                    nearbymooks[i].getDisplay().setTint(0xFFFF00)
                    nearbymooks[i].getDisplay().setHasLivingAnimation(false)

                    event.npc.getWorld().spawnParticle("explosion",nearbymooks[i].getBlockX()+0.5,nearbymooks[i].getBlockY(),nearbymooks[i].getBlockZ()+0.5,0.25,1,0.25,0.5,100);
                    event.npc.getWorld().playSoundAt(nearbymooks[i].getPos(),"entity.generic.explode",10,1)


                    variables_eldlich.MOOKS.slice()
                    .forEach(function(mook) {
                    
                    if (mook.MOOKNAME==nearbymooks[i].getName())
                    {
                        event.npc.say(mook.SACDIAG)

                        event.npc.getStats().getMelee().setStrength(event.npc.getStats().getMelee().getStrength()+mook.CHANGETOATKDMG)
                        event.npc.getStats().getMelee().setDelay(event.npc.getStats().getMelee().getDelay()+mook.CHANGETOATKSPEED)
                    }
                    })

                    if(deadmooks.length==4)
                    {
                        if (variables_eldlich.ALLMOOKSDEADDIAG != "") {
                            event.npc.say(variables_eldlich.ALLMOOKSDEADDIAG)
                        }

                        changemusic(event.npc, variables_eldlich.finalphasemusic)

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
            changemusic(event.npc, variables_eldlich.basemusic)


        }
        
    }
    
}


/**
 * @param {NpcEvent.TimerEvent} e
 */
function timer(e)
{
    if(e.id==eldconstants.TELEPORT_TO_BOSS)
    {
        if(Math.random()<=variables_eldlich.teleportchance)
        {
            if(variables_eldlich.diagteleport!="")
            {
                e.npc.say(variables_eldlich.diagteleport)
            }


            var hit=e.npc.getWorld().getNearbyEntities(e.npc.getPos(), variables_eldlich.teleportrange, 1)
        
            if (hit.length!=0){
                for (var i = 0; i < hit.length; i++) {
                    e.npc.getWorld().spawnParticle(variables_eldlich.teleportparticle,hit[i].getBlockX()+0.5,hit[i].getBlockY(),hit[i].getBlockZ()+0.5,0.25,1,0.25,0.5,100);
                    e.npc.getWorld().playSoundAt(hit[i].getPos(),variables_eldlich.teleportsoundeff,10,1)
        
                    hit[i].setPos(e.npc.getPos());
                }

            }

            e.npc.getWorld().spawnParticle(variables_eldlich.teleportparticle,e.npc.getBlockX()+0.5,e.npc.getBlockY(),e.npc.getBlockZ()+0.5,0.25,1,0.25,0.5,100);
            e.npc.getWorld().playSoundAt(e.npc.getPos(),variables_eldlich.teleportsoundeff,10,1)

            var nearbymooks=e.npc.getWorld().getNearbyEntities(e.npc.getPos(),50, 2)
            if(nearbymooks.length!=0)
            {
                for (var i = 0; i < nearbymooks.length; i++) {
                    if (validnames.indexOf(nearbymooks[i].getName()) >= 0)
                    {
                        variables_eldlich.MOOKS.slice()
                        .forEach(function(mook) {
                        
                        if (mook.MOOKNAME==nearbymooks[i].getName())
                        {
                            nearbymooks[i].setPosition(e.npc.getBlockX()+0.5,e.npc.getBlockY(),e.npc.getBlockZ()+0.5)
                        }
                        })
                    }}

                
            }


        }
    }



}

/**
 * @param {NpcEvent.DiedEvent} e
 */

function died(e)
{
    fighting = false
    deadmooks=[e.npc.getName()]
    validnames=[""]        
    if (e.npc.getTimers().has(eldconstants.TELEPORT_TO_BOSS)) {
        e.npc.getTimers().stop(eldconstants.TELEPORT_TO_BOSS);
    }
    changemusic(e.npc, variables_eldlich.basemusic)

    e.npc.getStats().getMelee().setStrength(variables_eldlich.basemeleeatkstr)
    e.npc.getStats().getMelee().setDelay(variables_eldlich.basemeleeatkspeed)
}