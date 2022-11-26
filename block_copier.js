var savedNbt = '';
var savedBlock='';
function init(event) {
  event.item.setCustomName('Scripted Block Copy Tool')
  event.item.setLore(['Empty','Left click a scripted block to record'])
}
function attack(event) {
event.setCanceled(true);
if(event.type == 2 && event.target.hasTileEntity() && event.target.getName() == 'customnpcs:npcscripted') {
  if(!event.player.isSneaking()) {
    if(!savedNbt) { /*comment this to allow overriding recorded data*/
      savedNbt = event.target.getBlockEntityNBT()
      savedBlock=event.target.getName()
      event.item.setLore(['x:'+event.target.pos.x+' y:'+event.target.pos.y+' z:'+event.target.pos.z,'Shift-left click a scripted block to write recorded script','Toss to clear'])
      event.player.message('Recorded block at x:'+event.target.pos.x+' y:'+event.target.pos.y+' z:'+event.target.pos.z)
      event.item.setCustomName('Scripted Block Copy Tool (Filled)')
    } else {event.player.message('A block is already recorded, drop tool to clear')}
  } else {
    if(savedNbt) {
       savedNbt.setInteger('x', event.target.pos.x)
       savedNbt.setInteger('y', event.target.pos.y)
       savedNbt.setInteger('z', event.target.pos.z)
       var newtar = event.target.setBlock(savedBlock)
       newtar.setTileEntityNBT(savedNbt);
       event.player.message('Block at x:'+newtar.pos.x+' y:'+newtar.pos.y+' z:'+newtar.pos.z+' written successfully')
    }
  }
  }
  else if(event.type == 2 && event.player.isSneaking())
  {
    if(savedNbt) {
      savedNbt.setInteger('x', event.target.pos.x)
      savedNbt.setInteger('y', event.target.pos.y)
      savedNbt.setInteger('z', event.target.pos.z)
      var newtar = event.target.setBlock(savedBlock)
       newtar.setTileEntityNBT(savedNbt);
       event.player.message('Block at x:'+newtar.pos.x+' y:'+newtar.pos.y+' z:'+newtar.pos.z+' written successfully')
   }
  }
}
function toss(event) {
  savedNbt = '';
  savedBlock='';
  event.item.setCustomName('Scripted Block Copy Tool (Filled)')
}