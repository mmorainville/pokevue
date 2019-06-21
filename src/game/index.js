import Phaser from 'phaser'

let config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.DOM.RESIZE,
    parent: 'game',
    width: '100%',
    height: '100%'
  },
  parent: 'game',
  title: 'Pokevue',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: {
    preload: preload,
    create: create
  }
}

let game = new Phaser.Game(config)
console.log(game)

function preload () {
  this.load.image('sky', '../assets/map/spz3zUx_small.png')
  this.load.image('logo', 'http://labs.phaser.io/assets/sprites/phaser3-logo.png')
}

function create () {
  this.add.image(this.scale.height / 2, this.scale.width / 2, 'sky')

  let logo = this.physics.add.image(400, 100, 'logo')

  logo.setVelocity(100, 200)
  logo.setBounce(1, 1)
  logo.setCollideWorldBounds(true)
}
