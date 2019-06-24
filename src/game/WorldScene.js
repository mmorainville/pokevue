import Phaser from 'phaser'

export default class WorldScene extends Phaser.Scene {
  constructor () {
    super({ key: 'WorldScene' })
  }

  preload () {
    this.load.image('tiles', require('../assets/map/spz3zUx_small.png'))
    this.load.tilemapTiledJSON('map', require('../assets/tiled/spz3zUx_small.json'))

    this.load.spritesheet('player', require('../assets/sprites/player.png'), { frameWidth: 16, frameHeight: 32 })

    this.load.image('logo', 'http://labs.phaser.io/assets/sprites/phaser3-logo.png')
  }

  create () {
    const map = this.make.tilemap({ key: 'map' })
    const tileset = map.addTilesetImage('spz3zUx_small', 'tiles')

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    // const belowLayer = map.createStaticLayer('Below Player', tileset, 0, 0)
    const worldLayer = map.createStaticLayer('World', tileset, 0, 0)
    // const aboveLayer = map.createStaticLayer('Above Player', tileset, 0, 0)

    worldLayer.setCollisionByProperty({ collides: true })

    // const debugGraphics = this.add.graphics().setAlpha(0.75)
    // worldLayer.renderDebug(debugGraphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // })

    // Phaser supports multiple cameras, but you can access the default camera like this:
    const camera = this.cameras.main

    // Set up the arrows to control the camera
    // const cursors = this.input.keyboard.createCursorKeys()
    // this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
    //   camera: camera,
    //   left: cursors.left,
    //   right: cursors.right,
    //   up: cursors.up,
    //   down: cursors.down,
    //   speed: 0.5
    // })

    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

    // this.map = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'map').setOrigin(0)
    // this.scale.on('resize', this.resize, this)
    //
    // this.logo = this.add.image(this.scale.width / 2, this.scale.height / 2, 'logo')

    this.player = this.physics.add.sprite(0, 0, 'player', 1)
    this.player.setSize(16, 16)
    this.physics.world.bounds.width = map.widthInPixels
    this.physics.world.bounds.height = map.heightInPixels
    this.player.setCollideWorldBounds(true)

    this.cursors = this.input.keyboard.createCursorKeys()

    camera.startFollow(this.player)
    camera.roundPixels = true

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { frames: [6, 7, 8, 7] }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { frames: [6, 7, 8, 7] }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { frames: [3, 4, 5, 4] }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { frames: [0, 1, 2, 1] }),
      frameRate: 10,
      repeat: -1
    })

    this.physics.add.collider(this.player, worldLayer)
  }

  update (time, delta) {
    // Apply the controls to the camera each update tick of the game
    // this.controls.update(delta)

    this.player.body.setVelocity(0)

    // Movements
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-80)
      this.player.flipX = false
      this.player.anims.play('left', true)
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(80)
      this.player.flipX = true
      this.player.anims.play('right', true)
    } else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-80)
      this.player.anims.play('up', true)
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(80)
      this.player.anims.play('down', true)
    } else {
      this.player.anims.stop()
    }
  }

  resize (gameSize, baseSize, displaySize, resolution) {
    let width = gameSize.width
    let height = gameSize.height

    console.log(this.game)

    // this.game.renderer.resize(width, height)
    this.cameras.main.setViewport(0, 0, width, height)

    // this.cameras.resize(width, height)
    //
    // this.map.setSize(width, height)
    // this.logo.setPosition(width / 2, height / 2)
  }
}
