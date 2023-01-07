// what block should this look like
var MODEL_BLOCK = '{id:"minecraft:sea_lantern",Count:1b,Damage:0s}'

//what it looks like when its off

var MODEL_BLOCK_OFF='{id:"minecraft:redstone_lamp",Count:1b,Damage:0s}'

//name of the key
var KEYNAME="Golden Key"

var isblockactive=false;

//time (in seconds) block is off when punched
var timeoff=6000

/**
 * @param {BlockEvent.TimerEvent} event
 */
function timer(event)
{
        
if(event.id==2)
{
    isblockactive=true;
    var mblock = event.block.getWorld().createItemFromNbt(event.API.stringToNbt(MODEL_BLOCK));

	event.block.setModel(mblock);

    event.block.setRedstonePower(0)


}
            
               
    }

/**
 * @param {BlockEvent.InteractEvent} e
 */

function interact(e)
{
    if (isblockactive && e.player.getMainhandItem().getDisplayName()==KEYNAME)
    {

  
        if (e.block.getTimers().has(2)) {
            e.block.getTimers().stop(2);
        }
        isblockactive=false

        var mblock = e.block.getWorld().createItemFromNbt(e.API.stringToNbt(MODEL_BLOCK_OFF));

	    e.block.setModel(mblock);

        e.block.getTimers().start(2, timeoff*20, false);

        e.block.setRedstonePower(15)


        e.player.setMainhandItem(null)


    }
    else
    {
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


    if (e.block.getTimers().has(2)) {
        e.block.getTimers().stop(2);
    }

    isblockactive=true;
}