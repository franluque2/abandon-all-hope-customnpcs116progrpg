// what block should this look like
var MODEL_BLOCK = '{id:"minecraft:sea_lantern",Count:1b,Damage:0s}'

//what it looks like when its off

var MODEL_BLOCK_OFF='{id:"minecraft:redstone_lamp",Count:1b,Damage:0s}'
//leave alone
var lastelectrified = 0;
var isblockactive=true;
//seconds between each zap
var electricInterval = 1;

//health restored each zap
var healthrestored=15

var RGBCOLORING = "0.4274 0.76078 0.87058"

var INVNAME="Adreus, Keeper of Armageddon"

var RADIUS=50

//radius when turned off, in blocks
var EXPLOSION_RADIUS=4

//damage of explosion

var EXPLOSIONDAMAGE=100

//time (in seconds) block is off when punched
var timeoff=30

/**
 * @param {BlockEvent.TimerEvent} event
 */
function timer(event)
{
        
    if(event.id==1)
    {

        var closeentities=event.block.getWorld().getNearbyEntities(event.block.getPos(), RADIUS, 2)
var closeentitiesplayer=event.block.getWorld().getNearbyEntities(event.    block.getPos(), RADIUS, 1)
        if (closeentitiesplayer.length!=0)
        {
        for (var i = 0; i < closeentities.length; i++) {
            if (closeentities[i].getName() == INVNAME){
                drawLine(event.block.getWorld(),event.block.getPos(),closeentities[i].getPos(),10,"dust")
                event.block.getWorld().playSoundAt(event.block.getPos(),"minecraft:entity.bee.loop",1,0.2)

                var toheal=closeentities[i].getHealth()+healthrestored;
                if(toheal>closeentities[i].getMaxHealth())
                {
                    closeentities[i].setHealth(closeentities[i].getMaxHealth());
                }else{
                    closeentities[i].setHealth(toheal);
                }
                //var r = variables_imm.FFRADIUS;
                //for (var theta = 0; theta <= 360; theta += 45){
                  //  for (var phi = 0; phi <= 180; phi += 45){
                   // var x = r * Math.sin(theta * (Math.PI / 180)) * Math.cos(phi * (Math.PI / 180));
                   // var y = r * Math.sin(theta * (Math.PI / 180)) * Math.sin(phi * (Math.PI / 180));
                   // var z = r * Math.cos(theta * (Math.PI / 180));
    
                    //event.block.getWorld().spawnParticle("cloud", event.block.getX() + x, event.block.getY() + y + 1, event.block.getZ() + z, 0,0,0,0.1, 1);
    
                    //event.block.getWorld().spawnParticle("cloud", closeentities[i].getX() + x, closeentities[i].getY() + y + 1, closeentities[i].getZ() + z, 0,0,0,0.1, 1);
                    //}
                    }
      }
    }
}
else if(event.id==2)
{
    isblockactive=true;
    var mblock = event.block.getWorld().createItemFromNbt(event.API.stringToNbt(MODEL_BLOCK));

	event.block.setModel(mblock);

    if (event.block.getTimers().has(1)) {
        event.block.getTimers().stop(1);
    }
    event.block.getTimers().start(1, electricInterval*20, true);

}
            
               
    }
    

function drawLine(world, pos1, pos2, resolution, particle)
{
    pos2=pos2.add(0,3,0)
    var resolution = resolution || 1; // Draw 1 particle per block
    var particle = particle || "endRod"; // Particle Id
    var NpcAPI = Java.type("noppes.npcs.api.NpcAPI").Instance();
    
    var drawAmount = Math.ceil(pos1.distanceTo(pos2))*resolution;

    var subs = pos2.subtract(pos1);
    for(var i = 0; i < drawAmount; i++) // Draw all particles
    {
        var x = (pos1.getX() + subs.getX()*(i/drawAmount)+0.5).toFixed(4);
        var y = (pos1.getY() + subs.getY()*(i/drawAmount)+0.5).toFixed(4);
        var z = (pos1.getZ() + subs.getZ()*(i/drawAmount)+0.5).toFixed(4);
        var cords =  x + " " + y + " " + z;
        var output = NpcAPI.executeCommand(world, "particle " + particle + " "+RGBCOLORING+" 1 "+ cords + " 0 0 0 1 0 force");
    }
}

/**
 * @param {BlockEvent.InteractEvent} e
 */

function interact(e)
{
    if (isblockactive)
    {
        if (e.block.getTimers().has(1)) {
            e.block.getTimers().stop(1);
        }

        if (e.block.getTimers().has(2)) {
            e.block.getTimers().stop(2);
        }

        var closeentities=e.block.getWorld().getNearbyEntities(e.block.getPos(), EXPLOSION_RADIUS, 1)
        if (closeentities.length!=0){
            e.block.getWorld().spawnParticle("explosion",e.block.getX()+0.5,e.block.getY(),e.block.getZ()+0.5,0.25,1,0.25,0.5,100);
            e.block.getWorld().playSoundAt(e.block.getPos(),"entity.generic.explode",1,1)
            for (var i = 0; i < closeentities.length; i++) {
                closeentities[i].damage(EXPLOSIONDAMAGE)
            }
        }
        isblockactive=false

        var mblock = e.block.getWorld().createItemFromNbt(e.API.stringToNbt(MODEL_BLOCK_OFF));

	    e.block.setModel(mblock);

        e.block.getTimers().start(2, timeoff*20, false);

    }
}


/**
 * @param {BlockEvent.InitEvent} e
 */

function init(e) {
    var mblock = e.block.getWorld().createItemFromNbt(e.API.stringToNbt(MODEL_BLOCK));

	e.block.setModel(mblock);

	e.block.setHardness(999);

    e.block.setLight(15)

    if (e.block.getTimers().has(1)) {
        e.block.getTimers().stop(1);
    }

    if (e.block.getTimers().has(2)) {
        e.block.getTimers().stop(2);
    }

    isblockactive=true;

    e.block.getTimers().start(1, electricInterval*20, true);
}