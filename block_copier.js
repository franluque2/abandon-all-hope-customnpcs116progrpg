var savedNbt = '';
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
      event.item.setLore(['x:'+event.target.pos.x+' y:'+event.target.pos.y+' z:'+event.target.pos.z,'Shift-left click a scripted block to write recorded script','Toss to clear'])
      event.player.message('Recorded block at x:'+event.target.pos.x+' y:'+event.target.pos.y+' z:'+event.target.pos.z)
      event.item.setCustomName('Scripted Block Copy Tool (Filled)')
    } else {event.player.message('A block is already recorded, drop tool to clear')}
  } else {
    if(savedNbt) {
       savedNbt.setInteger('x', event.target.pos.x)
       savedNbt.setInteger('y', event.target.pos.y)
       savedNbt.setInteger('z', event.target.pos.z)
       event.target.setTileEntityNBT(savedNbt);
       event.player.message('Block at x:'+event.target.pos.x+' y:'+event.target.pos.y+' z:'+event.target.pos.z+' written successfully')
    }
  }
  }
}
function toss(event) {
  savedNbt = ''
  event.item.setCustomName('Scripted Block Copy Tool (Filled)')
}