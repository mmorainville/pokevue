import Phaser from 'phaser'
import appBus from '../shared/app-bus'
import appSnackbar from '../shared/app-snackbar'

export default class WorldScene extends Phaser.Scene {
  constructor () {
    super({ key: 'WorldScene' })
  }

  preload () {
    this.load.image('tiles', require('../assets/map/spz3zUx_small.png'))
    this.load.tilemapTiledJSON('map', require('../assets/tiled/spz3zUx_small.json'))

    this.load.spritesheet('player', require('../assets/sprites/player_16x20.png'), { frameWidth: 16, frameHeight: 20 })

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
    const cursors = this.input.keyboard.createCursorKeys()
    this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
      camera: camera,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      speed: 1
    })

    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

    const spawnPoint = map.findObject('Objects', obj => obj.name === 'Spawn Point')
    this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'player', 1)
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

    this.isMoving = false
    this.steps = 0
    this.lastKey = null
    this.map = map
    this.useCameraView = false

    this.input.keyboard.on('keydown-' + 'V', (event) => {
      this.useCameraView = !this.useCameraView
    })

    this.input.keyboard.on('keydown-' + 'ESC', (event) => {
      console.log('ESC')
      appBus.$emit('keydown:esc')
    })

    this.input.keyboard.on('keydown-' + 'N', (event) => {
      console.log('Test snackbar')
      appSnackbar.success('Test snackbar')
    })
  }

  update (time, delta) {
    if (this.useCameraView) {
      console.log(this.useCameraView)
      this.cameras.main.stopFollow()
      // Apply the controls to the camera each update tick of the game
      this.controls.update(delta)
    } else {
      // console.log(this.player.x, this.player.y)
      this.cameras.main.startFollow(this.player)

      if (!this.isMoving) {
        this.player.body.setVelocity(0)

        // Movements
        if (this.cursors.left.isDown) {
          // this.player.body.setVelocityX(-32)
          this.player.flipX = false
          this.player.anims.play('left', true)
          if (this.canMoveTo(this.player.x - 16, this.player.y)) {
            this.isMoving = true
            this.lastKey = 'left'
            this.move(this.lastKey)
          }
        } else if (this.cursors.right.isDown) {
          // this.player.body.setVelocityX(32)
          this.player.flipX = true
          this.player.anims.play('right', true)
          if (this.canMoveTo(this.player.x + 16, this.player.y)) {
            this.isMoving = true
            this.lastKey = 'right'
            this.move(this.lastKey)
          }
        } else if (this.cursors.up.isDown) {
          // this.player.body.setVelocityY(-32)
          this.player.anims.play('up', true)
          if (this.canMoveTo(this.player.x, this.player.y - 16)) {
            this.isMoving = true
            this.lastKey = 'up'
            this.move(this.lastKey)
          }
        } else if (this.cursors.down.isDown) {
          // this.player.body.setVelocityY(32)
          this.player.anims.play('down', true)
          if (this.canMoveTo(this.player.x, this.player.y + 16)) {
            this.isMoving = true
            this.lastKey = 'down'
            this.move(this.lastKey)
          }
        } else {
          this.player.anims.stop()
          this.isMoving = false
          this.lastKey = null
        }
      } else {
        this.steps++
        this.move(this.lastKey)
        if (this.steps === 7) { // 15 if speed === 1
          this.isMoving = false
          this.steps = 0
        }
      }
    }
  }

  move (direction) {
    let speed = 2 // 1
    switch (direction) {
      case 'left':
        this.player.x -= speed
        break
      case 'right':
        this.player.x += speed
        break
      case 'up':
        this.player.y -= speed
        break
      case 'down':
        this.player.y += speed
        break
      default:
    }
  }

  canMoveTo (x, y) {
    // console.log(x, y)
    let nextTile = this.map.getTileAtWorldXY(x, y)
    // console.log(nextTile)
    return !nextTile.collides
  }
}
