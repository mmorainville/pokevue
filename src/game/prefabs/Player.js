import Phaser from 'phaser'

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y, 'player', 1)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setSize(16, 16)
    this.setCollideWorldBounds(true)

    this.isMoving = false
    this.speed = 2 // 1
    this.lastKey = null
    this.steps = 0

    this.cursors = this.scene.input.keyboard.createCursorKeys()

    this.scene.anims.create({
      key: 'left',
      frames: this.scene.anims.generateFrameNumbers('player', { frames: [6, 7, 8, 7] }),
      frameRate: 10,
      repeat: -1
    })

    this.scene.anims.create({
      key: 'right',
      frames: this.scene.anims.generateFrameNumbers('player', { frames: [6, 7, 8, 7] }),
      frameRate: 10,
      repeat: -1
    })

    this.scene.anims.create({
      key: 'up',
      frames: this.scene.anims.generateFrameNumbers('player', { frames: [3, 4, 5, 4] }),
      frameRate: 10,
      repeat: -1
    })

    this.scene.anims.create({
      key: 'down',
      frames: this.scene.anims.generateFrameNumbers('player', { frames: [0, 1, 2, 1] }),
      frameRate: 10,
      repeat: -1
    })
  }

  update (args) {
    // console.log(this.x, this.y)
    this.scene.cameras.main.startFollow(this)

    if (!this.isMoving) {
      this.body.setVelocity(0)

      // Movements
      if (this.cursors.left.isDown) {
        // this.body.setVelocityX(-32)
        this.flipX = false
        this.anims.play('left', true)
        if (this.canMoveTo(this.x - 16, this.y)) {
          this.isMoving = true
          this.lastKey = 'left'
          this.move(this.lastKey)
        }
      } else if (this.cursors.right.isDown) {
        // this.body.setVelocityX(32)
        this.flipX = true
        this.anims.play('right', true)
        if (this.canMoveTo(this.x + 16, this.y)) {
          this.isMoving = true
          this.lastKey = 'right'
          this.move(this.lastKey)
        }
      } else if (this.cursors.up.isDown) {
        // this.body.setVelocityY(-32)
        this.anims.play('up', true)
        if (this.canMoveTo(this.x, this.y - 16)) {
          this.isMoving = true
          this.lastKey = 'up'
          this.move(this.lastKey)
        }
      } else if (this.cursors.down.isDown) {
        // this.body.setVelocityY(32)
        this.anims.play('down', true)
        if (this.canMoveTo(this.x, this.y + 16)) {
          this.isMoving = true
          this.lastKey = 'down'
          this.move(this.lastKey)
        }
      } else {
        this.anims.stop()
        this.isMoving = false
        this.lastKey = null
      }
    } else {
      this.steps++
      this.move(this.lastKey)
      if (this.steps === ((16 / this.speed) - 1)) { // 15 if speed === 1
        this.isMoving = false
        this.steps = 0
      }
    }
  }

  move (direction) {
    switch (direction) {
      case 'left':
        this.x -= this.speed
        break
      case 'right':
        this.x += this.speed
        break
      case 'up':
        this.y -= this.speed
        break
      case 'down':
        this.y += this.speed
        break
      default:
    }
  }

  canMoveTo (x, y) {
    // console.log(x, y)
    let nextTile = this.scene.map.getTileAtWorldXY(x, y)
    // console.log(nextTile)
    return !nextTile.collides
  }
}
