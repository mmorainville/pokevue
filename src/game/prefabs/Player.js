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
      appBus.$emit('dialog:open', {
        strings: [
          'Bien le bonjour ! Bienvenue dans le monde incroyable des Pokémon !',
          'Mon nom est Chen ! Les gens m\'appellent amicalement le Prof. Pokémon !',
          'Pour certains, les Pokémon sont des animaux domestiques, pour d\'autres, ils sont un moyen de combattre.',
          'Des Pokémon sauvages infestent les hautes herbes ! Il te faut un Pokémon pour te protéger... Tiens ! Prends ça !',
          '<em>Reçu</em><br><strong>3 Pokémon</strong>, <strong>5 Pokéballs</strong>'
        ],
        action: () => {
          this.receiveItems({
            pokemon: 3,
            pokeballs: 5
          })
        }
      })

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

  receiveItems (payload) {
    console.log('Received items!', payload)
  }
}
