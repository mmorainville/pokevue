import Phaser from 'phaser'

const MOVE_TIMER = 3

export default class MovableCharacter extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, texture) {
    super(scene, x, y, texture, 1)

    this.name = texture

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setSize(18, 22) // 16 x 20 || 18x22
    this.setDisplayOrigin(9, 13) // 16 - 8, 20 - 8 || 18 - (8 + 1), 22 - (8 + 1)
    this.setCollideWorldBounds(true)

    this.isMoving = false
    this.isMovingAutomatically = false
    this.speed = 2 // 1
    this.lastKey = null
    this.steps = 0
    this.faces = 'down'
    this.moveTimer = MOVE_TIMER

    this.cursors = this.scene.input.keyboard.createCursorKeys()

    this.scene.anims.create({
      key: this.name + '_left',
      frames: this.scene.anims.generateFrameNumbers(texture, { frames: [6, 7, 8, 7] }),
      frameRate: 10,
      repeat: -1
    })

    this.scene.anims.create({
      key: this.name + '_right',
      frames: this.scene.anims.generateFrameNumbers(texture, { frames: [6, 7, 8, 7] }),
      frameRate: 10,
      repeat: -1
    })

    this.scene.anims.create({
      key: this.name + '_up',
      frames: this.scene.anims.generateFrameNumbers(texture, { frames: [3, 4, 5, 4] }),
      frameRate: 10,
      repeat: -1
    })

    this.scene.anims.create({
      key: this.name + '_down',
      frames: this.scene.anims.generateFrameNumbers(texture, { frames: [0, 1, 2, 1] }),
      frameRate: 10,
      repeat: -1
    })
  }

  update (args) {
    // console.log(this.x, this.y)

    if (!this.isMovingAutomatically) {
      if (!this.isMoving) {
        // this.body.setVelocity(0)

        // Movements
        if (this.cursors.left.isDown) {
          // this.body.setVelocityX(-32)
          this.moveTo('left')
        } else if (this.cursors.right.isDown) {
          // this.body.setVelocityX(32)
          this.moveTo('right')
        } else if (this.cursors.up.isDown) {
          // this.body.setVelocityY(-32)
          this.moveTo('up')
        } else if (this.cursors.down.isDown) {
          // this.body.setVelocityY(32)
          this.moveTo('down')
        } else {
          this.stopMoving()
        }
      } else {
        this.continueMoving()
      }
    }
  }

  moveTo (direction) {
    this.flipX = direction === 'right'
    this.anims.play(this.name + '_' + direction, true)
    if (this.canMoveTo(this.getNextPosition(direction).x, this.getNextPosition(direction).y)) {
      this.isMoving = true
      this.lastKey = direction
      this.move(this.lastKey)
    }
    this.faces = direction
  }

  stopMoving () {
    this.anims.stop()
    this.setFrame(this.getIdleFrame())
    this.isMoving = false
    this.lastKey = null
    this.moveTimer = MOVE_TIMER
  }

  continueMoving () {
    this.steps++
    this.move(this.lastKey)
    if (this.steps === ((16 / this.speed) - 1)) { // 15 if speed === 1
      this.isMoving = false
      this.steps = 0
      this.moveTimer = MOVE_TIMER
    }
  }

  getNextPosition (direction) {
    switch (direction) {
      case 'left':
        return {
          x: this.x - 16,
          y: this.y
        }
      case 'right':
        return {
          x: this.x + 16,
          y: this.y
        }
      case 'up':
        return {
          x: this.x,
          y: this.y - 16
        }
      case 'down':
        return {
          x: this.x,
          y: this.y + 16
        }
      default:
        return {
          x: this.x,
          y: this.y
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
    // console.log(this.moveTimer)
    // Wait for a certain amount of time before really moving
    if (this.moveTimer === 0 || this.lastKey != null) {
      this.moveTimer = MOVE_TIMER
      // console.log(x, y)
      let nextTile = this.scene.map.getTileAtWorldXY(x, y)
      // console.log(nextTile)
      return nextTile && !nextTile.collides && !nextTile.isOccupied
    } else {
      this.moveTimer--
    }
  }

  getIdleFrame () {
    switch (this.faces) {
      case 'left':
        this.flipX = false
        return 7
      case 'right':
        this.flipX = true
        return 7
      case 'up':
        return 4
      default:
        return 1
    }
  }

  isFullyOnTile () {
    return ((this.x - 8) % 16 === 0) && ((this.y - 8) % 16 === 0)
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

  moveAlongPath (path) {
    console.log(path)
    // Sets up a list of tweens, one for each tile to walk, that will be chained by the timeline
    let tweens = []
    for (let i = 0; i < path.length - 1; i++) {
      let currentX = path[i].x
      let currentY = path[i].y
      let nextX = path[i + 1].x
      let nextY = path[i + 1].y
      tweens.push({
        targets: this,
        x: { value: nextX * this.scene.map.tileWidth + 8, duration: 300 / this.speed },
        y: { value: nextY * this.scene.map.tileHeight + 8, duration: 300 / this.speed },
        onStart: () => {
          if (this.getNextTile().isOccupied) {
            this.timeline.stop()

            this.isMovingAutomatically = false
            this.anims.stop()
            this.setFrame(this.getIdleFrame())
          } else {
            this.isMovingAutomatically = true
            if (nextX < currentX && nextY === currentY) {
              // Left
              this.flipX = false
              this.anims.play(this.name + '_left', true)
              this.faces = 'left'
            } else if (nextX > currentX && nextY === currentY) {
              // Right
              this.flipX = true
              this.anims.play(this.name + '_right', true)
              this.faces = 'right'
            } else if (nextY < currentY && nextX === currentX) {
              // Up
              this.anims.play(this.name + '_up', true)
              this.faces = 'up'
            } else if (nextY > currentY && nextX === currentX) {
              // Bas
              this.anims.play(this.name + '_down', true)
              this.faces = 'down'
            }
          }
        },
        onComplete: () => {
          // console.log(i, path.length)
          if (i === path.length - 2) {
            this.isMovingAutomatically = false
            this.anims.stop()
            this.setFrame(this.getIdleFrame())
          }
        }
      })
    }

    this.timeline = this.scene.tweens.timeline({
      tweens
    })
  }

  updateCaseOccupation () {
    this.scene.map.getTileAtWorldXY(this.x, this.y).isOccupied = true
    this.scene.map.getTileAtWorldXY(this.x, this.y).isOccupiedBy = this
    this.scene.map.getTileAtWorldXY(this.x - 16, this.y).isOccupied = false
    delete this.scene.map.getTileAtWorldXY(this.x - 16, this.y).isOccupiedBy
    this.scene.map.getTileAtWorldXY(this.x + 16, this.y).isOccupied = false
    delete this.scene.map.getTileAtWorldXY(this.x + 16, this.y).isOccupiedBy
    this.scene.map.getTileAtWorldXY(this.x, this.y - 16).isOccupied = false
    delete this.scene.map.getTileAtWorldXY(this.x, this.y - 16).isOccupiedBy
    this.scene.map.getTileAtWorldXY(this.x, this.y + 16).isOccupied = false
    delete this.scene.map.getTileAtWorldXY(this.x, this.y + 16).isOccupiedBy
  }
}
