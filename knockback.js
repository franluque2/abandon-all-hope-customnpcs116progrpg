var variables = {
    KNOCKBACK_HORIZONTAL: 10,
    KNOCKBACK_VERTICAL: 1,
    //block distance players will be checked to apply knockback
    DISTANCE:20,
    // time (in seconds) between in check
    TIMER: 5,
    //chance it will do the knockback every time it checks, must be a number between 1 and 0
    CHANCE:1,
    //visual effect used for the explosion
    EXPLOSION_EFFECT:"explosion",
    //sound effect used for the explosion
    SOUND_EFFECT:"entity.generic.explode",

    // volume and pitch
    VOLUME:1,
    PITCH:1,

    // dialogue when starting fight, leave empty ("") to say nothing
    STARF_DIAG:"",

    //dialogue every time knockback is done
    KNOC_DIAG:"",

    //dialogue on death, leave empty to say nothing
    ENDF_DIAG:"",

    //damage to players
    DAMAGE:1,

}

var fighting=false;

function timer(event)
{
    //knockback countdown
    if(fighting)
    {
        
    if(event.id==0)
    {
        if(Math.random()<variables.CHANCE)
        {
        var players = event.npc.getWorld().getAllPlayers()
        if(variables.KNOC_DIAG!=""){
            event.npc.say(variables.KNOC_DIAG)
        }
        var playersavailable=false

        if (players != null){
            
            for(var i in players) {

                if (players[i].getPos().distanceTo(event.npc.getPos())<=variables.DISTANCE) {

                playersavailable=true

                var x1 = event.npc.x;
                var z1 = event.npc.z;
                
                var x2 = players[i].x;
                var z2 = players[i].z;
                
                var xdir = x2 - x1; 
                var zdir = z2 - z1;
                var angle = Math.atan(xdir / zdir); // x and z distance triangle
                var pi = Math.PI;
                var degrees = (angle * (180/pi)); // Convert Radians => Degrees
                if (xdir < 0 && zdir > 0) { // Quad I
                    degrees = Math.abs(degrees);
                }
                if (xdir < 0 && zdir < 0) { // Quad II
                    angle = Math.atan((xdir*-1) / zdir);
                    degrees = (angle * (180/pi)) + 180;
                }
                if (xdir > 0 && zdir < 0) { // Quad III
                    angle = Math.atan((xdir*-1) / zdir);
                    degrees = (angle * (180/pi)) + 180;
                }
                if (xdir > 0 && zdir > 0) { // Quad IV
                    degrees = 360 - degrees;
                }
                
                //var d = Math.sqrt(Math.pow(xdir,2) + Math.pow(zdir,2));
                //if (d!=0){
                //    d=1/d
                //}
                players[i].damage(variables.DAMAGE)
                players[i].knockback(variables.KNOCKBACK_HORIZONTAL, degrees);
                players[i].setMotionY(variables.KNOCKBACK_VERTICAL) 
                }
               
            }
            
        }
        if(playersavailable===true)
        {
            event.npc.getWorld().spawnParticle(variables.EXPLOSION_EFFECT,event.npc.getBlockX()+0.5,event.npc.getBlockY(),event.npc.getBlockZ()+0.5,0.25,1,0.25,0.5,100);
            event.npc.getWorld().playSoundAt(event.npc.getPos(),variables.SOUND_EFFECT,variables.VOLUME,variables.PITCH)
        }
        }
    }
        
    }
    
}

function damaged(event)
{
    if(!fighting){
        fighting=true
        if(variables.STARF_DIAG!=""){
            event.npc.say(variables.STARF_DIAG)
        }
        event.npc.timers.stop(0)
        event.npc.getTimers().start(0, variables.TIMER*20, true);
    }
}

function died(event)
{

    if(variables.ENDF_DIAG!=""){
        event.npc.say(variables.ENDF_DIAG)
    }
    fighting=false
    event.npc.timers.stop(0)
}