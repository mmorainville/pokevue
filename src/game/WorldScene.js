import Phaser from 'phaser'
import Player from './prefabs/Player'
import appBus from '../shared/app-bus'
import appSnackbar from '../shared/app-snackbar'

export default class WorldScene extends Phaser.Scene {
  constructor () {
    super({ key: 'WorldScene' })
  }

  preload () {
    this.load.image('tiles', require('../assets/map/spz3zUx_small.png'))
    this.load.tilemapTiledJSON('map', require('../assets/tiled/spz3zUx_small.json'))

    let isGirl = Math.floor(Math.random() * 2) === 1
    this.load.spritesheet('player', require('../assets/sprites/player_18x22' + (isGirl ? '_girl' : '') + '.png'), { frameWidth: 18, frameHeight: 22 })
    // this.load.spritesheet('player', require('../assets/sprites/prof_chen_18x22.png'), { frameWidth: 18, frameHeight: 22 })
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
    this.player = new Player(this, spawnPoint.x, spawnPoint.y)
    this.physics.world.bounds.width = map.widthInPixels
    this.physics.world.bounds.height = map.heightInPixels

    camera.startFollow(this.player)
    camera.roundPixels = true

    this.physics.add.collider(this.player, worldLayer)

    this.map = map
    this.useCameraView = false

    this.input.keyboard.on('keydown-' + 'V', (event) => {
      this.useCameraView = !this.useCameraView
    })

    this.input.keyboard.on('keydown-' + 'ESC', (event) => {
      console.log('ESC')
      appBus.$emit('keydown:esc')
    })
  }

  update (time, delta) {
    if (this.useCameraView) {
      console.log(this.useCameraView)
      this.cameras.main.stopFollow()
      // Apply the controls to the camera each update tick of the game
      this.controls.update(delta)
    } else {
      this.player.update(time, delta)
      let nextTile = this.player.getNextTile()
      // console.log(nextTile)

      if (nextTile.collides) {
        if (this.player.faces === 'down' || this.player.faces === 'up') {
          if (!appSnackbar.isVisible) {
            appSnackbar.success(`<strong>Bourg Palette</strong><br>Un monde de couleurs s'ouvre à vous !`)
          }
        }
      } else {
        appSnackbar.close()
      }
    }
  }
}
