import { Player } from './Player.js'
import { InputHandler } from './InputHandler.js'
import { Obstacle } from './Obstacle.js'
import { UI } from './UI.js'
import { Particle } from './Particle.js'
import { Background } from './Background.js'

export class Game {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.verticalBorder = 30
        this.obstacles = []
        this.obstacleTimer = 0
        this.obstacleInterval = 2000
        this.score = 0
        this.gameOver = false
        this.speed = 2
        this.debug = false
        this.ground = 112

        this.layers = []
        this.particles = []

        this.input = new InputHandler(this)
        this.player = new Player(this)
        this.UI = new UI(this)
        this.background = new Background(this)
        this.musicAudio = new Audio()
        this.musicAudio.src = '../assets/music/background.mp3'
        this.musicAudio.loop = true
        this.hitAudio = new Audio()
        this.hitAudio.src = '../assets/music/hit.wav'
        this.hitAudio.volume = 0.3
        this.scoreAudio = new Audio()
        this.scoreAudio.src = '../assets/music/point.wav'
        this.scoreAudio.volume = 0.3

        this.explosionImage = explosion
        this.explosionWidth = 192
        this.explosionHeight = 192
    }

    update(deltaTime) {
        // Background
        this.background.update()

        this.player.update(this.input.keys, deltaTime)
        let collision = this.checkCollision()

        // Colisiones
        if (collision) {
            this.gameOver = true
            return
        }

        if (this.obstacleTimer > this.obstacleInterval) {
            this.obstacleTimer = 0
            this.addObstacle()
        } else {
            this.obstacleTimer += deltaTime
        }
        this.obstacles.forEach(obstacle => {
            obstacle.update()
        })
        this.checkScoredObstacles()

        /** Eliminamos los obstáculos que rebasen el margen izquierdo */
        this.obstacles = this.obstacles.filter(
            obstacle => !obstacle.markedToDeletion
        )

        /** Añadimos las partículas */
        this.particles.push(
            new Particle(
                this,
                this.player.x + 30,
                this.player.y + this.player.height * 0.5
            )
        )
        this.particles.forEach(particle => {
            particle.update()
        })
        this.particles = this.particles.filter(
            particle => !particle.markedToDeletion
        )
    }

    draw(context) {
        this.background.draw(context)
        this.obstacles.forEach(obstacle => {
            obstacle.draw(context)
        })
        this.particles.forEach(particle => {
            particle.draw(context)
        })
        this.player.draw(context)
        this.UI.draw(context)

        if (this.gameOver) {
            context.drawImage(
                this.explosionImage,
                0,
                0,
                this.explosionWidth,
                this.explosionHeight,
                this.player.x - this.player.width * 0.5,
                this.player.y - this.player.height,
                this.explosionWidth,
                this.explosionHeight
            )
        }
    }

    addObstacle() {
        this.obstacles.push(new Obstacle(this))
    }

    checkCollision() {
        let collision = false
        this.obstacles.forEach(obstacle => {
            /** Colisión con la barra superior */
            if (
                this.player.x < obstacle.x + obstacle.width &&
                this.player.x + this.player.width > obstacle.x &&
                this.player.y + 20 < obstacle.yTop + obstacle.heightTop &&
                this.player.y + this.player.height > obstacle.yTop
            ) {
                collision = true
            }

            /** Colisión con la barra inferior */
            if (
                this.player.x + 30 < obstacle.x + obstacle.width &&
                this.player.x + this.player.width - 10 > obstacle.x &&
                this.player.y < obstacle.yBottom + obstacle.heightBottom &&
                this.player.y + this.player.height - 20 > obstacle.yBottom
            )
                collision = true
        })

        if (collision) {
            this.musicAudio.pause()
            this.hitAudio.play()
        }

        return collision
    }

    checkScoredObstacles() {
        this.obstacles
            .filter(obstacle => !obstacle.scored)
            .forEach(obstacle => {
                if (this.player.x > obstacle.x + obstacle.width) {
                    this.score++
                    obstacle.scored = true
                    this.scoreAudio.play()
                }
            })
    }
}
