var variables_imm = {
    // radius (in blocks) checked for the npc to make this invulnerable
    RADIUS:10,

    //name of the npc that, if nearby, will make this immune
    INVNAME:"Immuneboy",

    //radius of the "force field" to display
    FFRADIUS:1.5,

    //rgb coloring of the dust immunity line
    RGBCOLORING:"1.000 0.000 0.000"
   
}

function drawLine(world, pos1, pos2, resolution, particle)
{
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
        var output = NpcAPI.executeCommand(world, "particle " + particle + " "+variables_imm.RGBCOLORING+" 1 "+ cords + " 0 0 0 1 0 force");
    }
}

/**
 * @param {NpcEvent.DamagedEvent} event
 */
function damaged(event)
{
    var closeentities=event.npc.getWorld().getNearbyEntities(event.npc.getPos(), variables_imm.RADIUS, 2)

    for (var i = 0; i < closeentities.length; i++) {
        if (closeentities[i].getName() == variables_imm.INVNAME){
            drawLine(event.npc.getWorld(),event.npc.getPos(),closeentities[i].getPos(),10,"dust")
            var r = variables_imm.FFRADIUS;
            for (var theta = 0; theta <= 360; theta += 45){
                for (var phi = 0; phi <= 180; phi += 45){
                var x = r * Math.sin(theta * (Math.PI / 180)) * Math.cos(phi * (Math.PI / 180));
                var y = r * Math.sin(theta * (Math.PI / 180)) * Math.sin(phi * (Math.PI / 180));
                var z = r * Math.cos(theta * (Math.PI / 180));

                event.npc.getWorld().spawnParticle("cloud", event.npc.getX() + x, event.npc.getY() + y + 1, event.npc.getZ() + z, 0,0,0,0.1, 1);

                event.npc.getWorld().spawnParticle("cloud", closeentities[i].getX() + x, closeentities[i].getY() + y + 1, closeentities[i].getZ() + z, 0,0,0,0.1, 1);
                }
  }
            event.setCanceled(true);
            return;
        }
        
    }
    
}
