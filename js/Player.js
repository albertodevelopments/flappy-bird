export class Player {
    constructor(game) {
        this.game = game
        this.spriteWidth = 941
        this.spriteHeight = 680
        this.width = Math.floor(this.spriteWidth / 10)
        this.height = Math.floor(this.spriteHeight / 10)
        this.x = this.game.width * 0.2
        this.y =
            this.game.height -
            this.height * 0.5 -
            this.game.verticalBorder -
            this.game.ground
        this.weight = 1
        this.speedY = 0
        this.maxSpeedY = 5
        this.fps = 20
        this.flapInterval = 1000 / this.fps
        this.flapTimer = 0

        /** Movimiento de arriba a abajo si el juego está detenido */
        this.angle = 0
        this.curve = 0
        this.angleSpeed = 0.15
        this.image = player
        this.maxFrames = 3
        this.frame = 0
    }

    update(input, deltaTime) {
        this.curve = Math.sin(this.angle) * 5

        // Animación del sprite
        if (this.flapTimer > this.flapInterval) {
            if (this.frame === this.maxFrames) this.frame = 0
            else this.frame++
            this.flapTimer = 0
        } else {
            this.flapTimer += deltaTime
        }

        // Oscilación vertical
        this.angle += this.angleSpeed

        // Movimiento vertical
        if (this.atTheBottom()) {
            this.y =
                this.game.height - this.height - this.game.ground + this.curve
            this.speedY = 0
        } else {
            this.speedY += this.weight
            this.speedY *= 0.9 /** Frenamos un poco el movimiento de bajada para suavizar el vuelo */
            this.y += this.speedY
        }

        if (this.atTheTop()) {
            this.y = this.game.verticalBorder
            this.speedY = 0
        }

        /** Añadimos this.y > this.height * 2 para que cuando lleguemos arriba y la velocidad
         * sea 0, al bajar un trecho y seguir manteniendo pulsado la barra espaciadora, vuelve
         * a subir, y el ciclo se repite mientras siga pulsada, creando un movimiento oscilatorio
         * en la parte superior en lugar de que el jugador quede fijo
         */
        if (input.includes('Space') && this.y > this.height * 0.5)
            this.speedY = -this.maxSpeedY
    }

    draw(context) {
        if (this.game.debug) {
            context.fillStyle = 'blue'
            context.strokeRect(
                this.x,
                this.y + 20,
                this.width,
                this.height - 30
            )
        }
        context.drawImage(
            this.image,
            this.frame * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }

    atTheTop() {
        return this.y < this.game.verticalBorder
    }

    atTheBottom() {
        return (
            this.y >
            this.game.height - this.height - this.game.ground + this.curve
        )
    }
}
