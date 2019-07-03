import Phaser from 'phaser'
import BootScene from './BootScene'
import WorldScene from './WorldScene'

let config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.DOM.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'game',
    width: '100%',
    height: '100%'
  },
  title: 'Pokevue',
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  },
  scene: [
    BootScene,
    WorldScene
  ]
}

// eslint-disable-next-line no-unused-vars
let game = new Phaser.Game(config)
