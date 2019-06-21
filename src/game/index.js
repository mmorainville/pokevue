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
  this.load.setBaseURL('http://labs.phaser.io')

  this.load.image('sky', 'assets/skies/space3.png')
  this.load.image('logo', 'assets/sprites/phaser3-logo.png')
  this.load.image('red', 'assets/particles/red.png')
}

function create () {
  this.add.image(this.scale.height / 2, this.scale.width / 2, 'sky')

  let particles = this.add.particles('red')

  let emitter = particles.createEmitter({
    speed: 100,
    scale: { start: 1, end: 0 },
    blendMode: 'ADD'
  })

  let logo = this.physics.add.image(400, 100, 'logo')

  logo.setVelocity(100, 200)
  logo.setBounce(1, 1)
  logo.setCollideWorldBounds(true)

  emitter.startFollow(logo)
}
