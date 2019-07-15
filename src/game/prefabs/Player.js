import MovableCharacter from './MovableCharacter'
import appBus from '../../shared/app-bus'

export default class Player extends MovableCharacter {
  constructor (scene, x, y) {
    super(scene, x, y, 'player')
  }

  update (args) {
    // console.log(this.x, this.y)
    this.scene.cameras.main.startFollow(this)
    super.update(args)
  }

  getNextTile () {
    switch (this.faces) {
      case 'left':
        return this.scene.map.getTileAtWorldXY(this.x - 16, this.y)
      case 'right':
        return this.scene.map.getTileAtWorldXY(this.x + 16, this.y)
      case 'up':
        return this.scene.map.getTileAtWorldXY(this.x, this.y - 16)
      case 'down':
        return this.scene.map.getTileAtWorldXY(this.x, this.y + 16)
      default:
    }
  }

  handleAction () {
    let nextTile = this.getNextTile()
    if (nextTile.isOccupied) {
      console.log('Start dialog')
      appBus.$emit('dialog:open')
      if (this.faces === 'up') {
        nextTile.isOccupiedBy.moveTo('down')
        nextTile.isOccupiedBy.stopMoving()
      } else if (this.faces === 'right') {
        nextTile.isOccupiedBy.moveTo('left')
        nextTile.isOccupiedBy.stopMoving()
      } else if (this.faces === 'down') {
        nextTile.isOccupiedBy.moveTo('up')
        nextTile.isOccupiedBy.stopMoving()
      } else if (this.faces === 'left') {
        nextTile.isOccupiedBy.moveTo('right')
        nextTile.isOccupiedBy.stopMoving()
      }
    }
  }
}
