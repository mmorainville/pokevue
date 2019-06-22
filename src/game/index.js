import Phaser from 'phaser'
import BootScene from './BootScene'
import WorldScene from './WorldScene'

let config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.DOM.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'game',
    width: '100%',
    height: '100%'
  },
  title: 'Pokevue',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: [
    BootScene,
    WorldScene
  ]
}

let game = new Phaser.Game(config)
console.log(game)
