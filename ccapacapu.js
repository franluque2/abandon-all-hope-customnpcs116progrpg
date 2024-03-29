var ccapacvariables={

    //Dialogue on Starting fight
    startfdiag:"You've yet to even reach the eye of the storm.",

    //base texture url
    basetextureurl:"https://i.imgur.com/ppz7S0p.png",

    //How many seconds should stay in each texture
    alttexturetime:4,

    //Condor Texture
    condortextureurl:"https://i.imgur.com/4Awu2y8.png",

    //hummingbird texture
    hummingbirdtextureurl:"https://i.imgur.com/CSLZxUf.png",

    //monkey texture
    monkeytextureurl:"https://i.imgur.com/hun30i4.png",

    //whale texture
    whaletextureurl:"https://i.imgur.com/0n4GNQz.png",

    //coords of the redstone block to place whenever a glyph is used
    coords:[-122, 95, -487],




    //MARK OF THE CONDOR (HP TO 1)
    diagcondorwindup:"Your death will be fuel for my reign.",
    diagcondordamage:"Glyph of the Condor!",

    windupcondordelay:2,
    followthroughcondordelay:2,
    condorcd:20,
    condormajorcd:60,
    condorchance:0.4,
    condorradius:64,
    condorsoundeff:"entity.elder_guardian.curse",
    condorparticle:"falling_obsidian_tear",


    //MARK OF THE HUMMINGBIRD (DMG)
    diaghummingbird:"Your party is weak and frail. Glyph of the Hummingbird!",
    hummingbirdcd:20,
    hummingbirdmajorcd:40,
    hummingbirdchance:0.6,
    hummingbirdradius:64,
    hummingbirdsoundeff:"entity.dragon_fireball.explode",
    hummingbirdparticle:"explosion_emitter",
    hummingbirddmg:600,


    //MARK OF THE WHALE (SLOW)
    diagwhale:"You're too weak to even move! Glyph of the Whale!",
    whalecd:10,
    whalemajorcd:40,
    whalechance:0.6,
    whaleradius:64,
    whalesoundeff:"block.beacon.activate",
    whaleparticle:"poof",
    whaleslowstr:20,
    whalelowduration:6,



    //MARK OF THE MONKEY (NEGATE DMG AND SET HEALTH TO PERCENTILE)
    diagmonkey:"Glyph of the Monkey! Suffer the pain you've inflicted!",
    monkeythresholds:[0.9,0.8,0.7,0.6,0.5,0.4,0.3,0.2,0.1],
    monkeyradius:64,
    monkeysoundeff:"entity.blaze.death",
    monkeyparticle:"minecraft:large_smoke",
    monkeypercentile:0.5,

    //teleport everyone in range to boss
    diagteleport:"You thought you were safe, casters?",
    teleportrange:64,
    teleportcd:10,
    teleportsoundeff:"minecraft:entity.ender_eye.death",
    teleportparticle:"portal",
    teleportchance:0.8,


    //dialogue on death
    deathdiag:"You've... done... nothing...!",

}

var constants=
{
    CONDOR_HPTO1:1,
    CONDORWINDUP:2,
    CONDORFOLLOWTHROUGH:3,

    HUMMINGBIRD_DEALDMG:4,

    WHALE_SLOW:5,


    TELEPORT_TO_BOSS:6,

    RETURN_TO_BASE_TEXTURE:7,


    PLACEREDSTONEBLOCK:8

}

var Fighting=false;
var CurrentPercentiles=[1]

/**
 * @param {NpcEvent.TimerEvent} e
 */
function timer(e)
{
    if(e.id==constants.CONDOR_HPTO1)
    {
        if(e.npc.getTempdata().has("condoroncd"))
        {
            e.npc.getTempdata().remove("condoroncd");
            e.npc.getTimers().stop(constants.CONDOR_HPTO1)
            e.npc.getTimers().start(constants.CONDOR_HPTO1,ccapacvariables.condorcd*20,true)
        }
        else
        {
            if(Math.random()<=ccapacvariables.condorchance)
            {
                e.npc.getTempdata().put("condoroncd",true);
                e.npc.getTimers().stop(constants.CONDOR_HPTO1)

                changeskin(e.npc, ccapacvariables.condortextureurl)
                e.npc.getDisplay().setBossColor(0)

                activateredstone(e.npc)



                if(ccapacvariables.diagcondorwindup!="")
                {
                    e.npc.say(ccapacvariables.diagcondorwindup)
                }

                e.npc.getAi().setMovingType(0)
                e.npc.getAi().setRetaliateType(3)
                e.npc.getDisplay().setHasLivingAnimation(false)
                e.npc.getAi().setWalkingSpeed(0)


                e.npc.getTimers().stop(constants.CONDORWINDUP)
                e.npc.getTimers().start(constants.CONDORWINDUP,ccapacvariables.windupcondordelay*20,false)

                restarttimers(e,constants.CONDOR_HPTO1)
            }
            else
            {

            }
        }
        
    }
    else if(e.id==constants.CONDORWINDUP)
    {
        if(ccapacvariables.diagcondordamage!="")
        {
            e.npc.say(ccapacvariables.diagcondordamage)
        }

        e.npc.getWorld().spawnParticle(ccapacvariables.condorparticle,e.npc.getBlockX()+0.5,e.npc.getBlockY(),e.npc.getBlockZ()+0.5,0.25,1,0.25,0.5,100);
        e.npc.getWorld().playSoundAt(e.npc.getPos(),ccapacvariables.condorsoundeff,10,1)

        var hit=e.npc.getWorld().getNearbyEntities(e.npc.getPos(), ccapacvariables.condorradius, 1)
        
        if (hit.length!=0){
            for (var i = 0; i < hit.length; i++) {
                hit[i].setHealth(1)
            }

        }

        e.npc.getTimers().stop(constants.CONDORFOLLOWTHROUGH)
        e.npc.getTimers().start(constants.CONDORFOLLOWTHROUGH,ccapacvariables.followthroughcondordelay*20,false)
        
    }
    else if(e.id==constants.CONDORFOLLOWTHROUGH)
    {
        e.npc.getAi().setMovingType(1)
        e.npc.getAi().setRetaliateType(0)
        e.npc.getDisplay().setHasLivingAnimation(true)
        e.npc.getAi().setWalkingSpeed(8)


        e.npc.getTimers().start(constants.CONDOR_HPTO1,ccapacvariables.condormajorcd*20,false)

    }
    else if(e.id==constants.HUMMINGBIRD_DEALDMG)
    {
        if(e.npc.getTempdata().has("hummingbirdcd"))
        {
            e.npc.getTempdata().remove("hummingbirdcd");
            e.npc.getTimers().stop(constants.HUMMINGBIRD_DEALDMG)
            e.npc.getTimers().start(constants.HUMMINGBIRD_DEALDMG,ccapacvariables.hummingbirdcd*20,true)
        }
        else
        {
            if(Math.random()<=ccapacvariables.hummingbirdchance)
            {
            e.npc.getTempdata().put("hummingbirdcd",true);
            restarttimers(e, constants.HUMMINGBIRD_DEALDMG)
            changeskin(e.npc, ccapacvariables.hummingbirdtextureurl)
            e.npc.getDisplay().setBossColor(2)
            activateredstone(e.npc)



            if(ccapacvariables.diaghummingbird!="")
            {
                e.npc.say(ccapacvariables.diaghummingbird)
            }


            e.npc.getWorld().spawnParticle(ccapacvariables.hummingbirdparticle,e.npc.getBlockX()+0.5,e.npc.getBlockY(),e.npc.getBlockZ()+0.5,0.25,1,0.25,0.5,100);
            e.npc.getWorld().playSoundAt(e.npc.getPos(),ccapacvariables.hummingbirdsoundeff,10,1)

            var hit=e.npc.getWorld().getNearbyEntities(e.npc.getPos(), ccapacvariables.hummingbirdradius, 1)
        
            if (hit.length!=0){
                for (var i = 0; i < hit.length; i++) {
                    hit[i].damage(ccapacvariables.hummingbirddmg)
                }

            }

            e.npc.getTimers().stop(constants.HUMMINGBIRD_DEALDMG)
            e.npc.getTimers().start(constants.HUMMINGBIRD_DEALDMG,ccapacvariables.hummingbirdmajorcd*20,false)
        }
        }
    }
    else if(e.id==constants.WHALE_SLOW)
    {
        if(e.npc.getTempdata().has("whalecd"))
        {
            e.npc.getTempdata().remove("whalecd");
            e.npc.getTimers().stop(constants.WHALE_SLOW)
            e.npc.getTimers().start(constants.WHALE_SLOW,ccapacvariables.whalecd*20,true)
        }
        else
        {
            if(Math.random()<=ccapacvariables.whalechance)
            {

            e.npc.getTempdata().put("whalecd",true);
            restarttimers(e, constants.WHALE_SLOW)
            changeskin(e.npc, ccapacvariables.whaletextureurl)
            e.npc.getDisplay().setBossColor(5)
            activateredstone(e.npc)


            if(ccapacvariables.diagwhale!="")
            {
                e.npc.say(ccapacvariables.diagwhale)
            }

            e.npc.getWorld().spawnParticle(ccapacvariables.whaleparticle,e.npc.getBlockX()+0.5,e.npc.getBlockY(),e.npc.getBlockZ()+0.5,0.25,1,0.25,0.5,100);
            e.npc.getWorld().playSoundAt(e.npc.getPos(),ccapacvariables.whalesoundeff,10,1)

            var hit=e.npc.getWorld().getNearbyEntities(e.npc.getPos(), ccapacvariables.whaleradius, 1)
        
            if (hit.length!=0){
                for (var i = 0; i < hit.length; i++) {
                    hit[i].addPotionEffect(2,ccapacvariables.whalelowduration,ccapacvariables.whaleslowstr,false)
                }

            }

            e.npc.getTimers().stop(constants.WHALE_SLOW)
            e.npc.getTimers().start(constants.WHALE_SLOW,ccapacvariables.whalemajorcd*20,false)
        }
        }
    }
    else if(e.id==constants.TELEPORT_TO_BOSS)
    {
        if(Math.random()<=ccapacvariables.teleportchance)
        {
            if(ccapacvariables.diagteleport!="")
            {
                e.npc.say(ccapacvariables.diagteleport)
            }


            var hit=e.npc.getWorld().getNearbyEntities(e.npc.getPos(), ccapacvariables.teleportrange, 1)
        
            if (hit.length!=0){
                for (var i = 0; i < hit.length; i++) {
                    e.npc.getWorld().spawnParticle(ccapacvariables.teleportparticle,hit[i].getBlockX()+0.5,hit[i].getBlockY(),hit[i].getBlockZ()+0.5,0.25,1,0.25,0.5,100);
                    e.npc.getWorld().playSoundAt(hit[i].getPos(),ccapacvariables.teleportsoundeff,10,1)
        
                    hit[i].setPos(e.npc.getPos());
                }

            }

            e.npc.getWorld().spawnParticle(ccapacvariables.teleportparticle,e.npc.getBlockX()+0.5,e.npc.getBlockY(),e.npc.getBlockZ()+0.5,0.25,1,0.25,0.5,100);
            e.npc.getWorld().playSoundAt(e.npc.getPos(),ccapacvariables.teleportsoundeff,10,1)


        }
    }
    else if(e.id==constants.RETURN_TO_BASE_TEXTURE)
    {
        e.npc.getDisplay().setSkinUrl(ccapacvariables.basetextureurl)
        e.npc.getDisplay().setBossColor(1)
    }
    else if(e.id==constants.PLACEREDSTONEBLOCK)
    {
        var command='setblock '+ccapacvariables.coords[0].toString()+' '+ccapacvariables.coords[1].toString()+' '+ccapacvariables.coords[2].toString()+' '+"minecraft:air"
        e.API.executeCommand(e.npc.getWorld(),command)
        
    }

}

/**
 * @param {NpcEvent.TimerEvent} e
 * @param {Number} id
 */
function restarttimers(e, id)
{
    if(id!=constants.CONDOR_HPTO1)
    {
        if(!e.npc.getTempdata().has("condoroncd"))
        {
            e.npc.getTimers().stop(constants.CONDOR_HPTO1)
            e.npc.getTimers().start(constants.CONDOR_HPTO1,ccapacvariables.condorcd*20,true)
        } 
    }

    if(id!=constants.HUMMINGBIRD_DEALDMG)
    {
        if(!e.npc.getTempdata().has("hummingbirdcd"))
        {
            e.npc.getTimers().stop(constants.HUMMINGBIRD_DEALDMG)
            e.npc.getTimers().start(constants.HUMMINGBIRD_DEALDMG,ccapacvariables.hummingbirdcd*20,true)
        } 
    }

    if(id!=constants.WHALE_SLOW)
    {
        if(!e.npc.getTempdata().has("whalecd"))
        {
            e.npc.getTimers().stop(constants.WHALE_SLOW)
            e.npc.getTimers().start(constants.WHALE_SLOW,ccapacvariables.whalecd*20,true)
        } 
    }

}

/**
 * @param {ICustomNpc} e
 * @param {String} url
 */
function changeskin(e,url)
{
    e.getDisplay().setSkinUrl(url)
    if (e.getTimers().has(constants.RETURN_TO_BASE_TEXTURE)) {
        e.getTimers().stop(constants.RETURN_TO_BASE_TEXTURE);
    }
    e.getTimers().start(constants.RETURN_TO_BASE_TEXTURE,ccapacvariables.alttexturetime*20,false)
}

/**
 * @param {ICustomNpc} e
 */
function activateredstone(e){
    var command='setblock '+ccapacvariables.coords[0].toString()+' '+ccapacvariables.coords[1].toString()+' '+ccapacvariables.coords[2].toString()+' '+"minecraft:redstone_block"
    e.executeCommand(command)
    if (e.getTimers().has(constants.PLACEREDSTONEBLOCK)) {
        e.getTimers().stop(constants.PLACEREDSTONEBLOCK);
    }
    e.getTimers().start(constants.PLACEREDSTONEBLOCK,1*20,false)
    
}


/**
 * @param {ICustomNpc} e
 */
function stopalltimers(e)
{

    if (e.getTimers().has(constants.CONDOR_HPTO1)) {
        e.getTimers().stop(constants.CONDOR_HPTO1);
    }
    if (e.getTimers().has(constants.CONDORFOLLOWTHROUGH)) {
        e.getTimers().stop(constants.CONDORFOLLOWTHROUGH);
    }
    if (e.getTimers().has(constants.CONDORWINDUP)) {
        e.getTimers().stop(constants.CONDORWINDUP);
    }
    if (e.getTimers().has(constants.HUMMINGBIRD_DEALDMG)) {
        e.getTimers().stop(constants.HUMMINGBIRD_DEALDMG);
    }
    if (e.getTimers().has(constants.WHALE_SLOW)) {
        e.getTimers().stop(constants.WHALE_SLOW);
    }
    if (e.getTimers().has(constants.TELEPORT_TO_BOSS)) {
        e.getTimers().stop(constants.TELEPORT_TO_BOSS);
    }

    if (e.getTimers().has(constants.RETURN_TO_BASE_TEXTURE)) {
        e.getTimers().stop(constants.RETURN_TO_BASE_TEXTURE);
        e.getDisplay().setSkinUrl(ccapacvariables.basetextureurl)
        e.getDisplay().setBossColor(1)

    }

    if (e.getTimers().has(constants.PLACEREDSTONEBLOCK)) {
        e.getTimers().stop(constants.PLACEREDSTONEBLOCK);
        var command='setblock '+ccapacvariables.coords[0].toString()+' '+ccapacvariables.coords[1].toString()+' '+ccapacvariables.coords[2].toString()+' '+"minecraft:air"
        e.executeCommand(command)

    }
}

/**
 * @param {NpcEvent.DamagedEvent} e
 */

function damaged(e)
{
    var curh=e.npc.getHealth()
    var maxh=e.npc.getMaxHealth()

    if(!Fighting)
    {
        if(ccapacvariables.startfdiag!="")
        {
            e.npc.say(ccapacvariables.startfdiag)
        }
        Fighting=true;

        stopalltimers(e.npc)

        e.npc.getTimers().start(constants.CONDOR_HPTO1,ccapacvariables.condorcd*20,true)
        e.npc.getTimers().start(constants.HUMMINGBIRD_DEALDMG,ccapacvariables.hummingbirdcd*20,true)
        e.npc.getTimers().start(constants.WHALE_SLOW,ccapacvariables.whalecd*20,true)
        e.npc.getTimers().start(constants.TELEPORT_TO_BOSS,ccapacvariables.teleportcd*20,true)


        return;
    }

    ccapacvariables.monkeythresholds.forEach(function(percentile)
    {
    if(curh-e.damage<=Math.floor(maxh*percentile) && !(CurrentPercentiles.indexOf(percentile) >= 0))
    {
        CurrentPercentiles.push(percentile)

        changeskin(e.npc, ccapacvariables.monkeytextureurl)
        e.npc.getDisplay().setBossColor(4)
        activateredstone(e.npc)
        



        if(ccapacvariables.diagmonkey!="")
        {
            e.npc.say(ccapacvariables.diagmonkey)
        }


        e.npc.getWorld().spawnParticle(ccapacvariables.monkeyparticle,e.npc.getBlockX()+0.5,e.npc.getBlockY(),e.npc.getBlockZ()+0.5,0.25,1,0.25,0.5,100);
        e.npc.getWorld().playSoundAt(e.npc.getPos(),ccapacvariables.monkeysoundeff,10,1)

        var hit=e.npc.getWorld().getNearbyEntities(e.npc.getPos(), ccapacvariables.monkeyradius, 1)
        
        if (hit.length!=0){
            for (var i = 0; i < hit.length; i++) {
                hit[i].setHealth(Math.ceil(hit[i].getMaxHealth()*ccapacvariables.monkeypercentile))
            }

        }

        e.setCanceled(true);
        return;

    }});

}

/**
 * @param {NpcEvent.InitEvent} e
 */
function init(e)
{
    stopalltimers(e.npc)
    Fighting=false;
    CurrentPercentiles=[1]
    e.npc.getDisplay().setSkinUrl(ccapacvariables.basetextureurl)
    e.npc.getDisplay().setBossColor(1)

    e.npc.getAi().setMovingType(0)
    e.npc.getAi().setRetaliateType(0)
    e.npc.getAi().setWalkingSpeed(8)

    e.npc.getDisplay().setHasLivingAnimation(true)

}

/**
 * @param {NpcEvent.DiedEvent} e
 */
function died(e)
{
    
    stopalltimers(e.npc)
    Fighting=false;
    CurrentPercentiles=[1]

    if(ccapacvariables.deathdiag!="")
        {
            e.npc.say(ccapacvariables.deathdiag)
        }

    e.npc.getDisplay().setSkinUrl(ccapacvariables.basetextureurl)
    e.npc.getDisplay().setBossColor(1)
    e.npc.getAi().setMovingType(0)
    e.npc.getAi().setRetaliateType(0)
    e.npc.getAi().setWalkingSpeed(8)

    e.npc.getDisplay().setHasLivingAnimation(true)

    
}