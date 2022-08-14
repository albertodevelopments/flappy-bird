export class Particle {
    constructor(game, x, y) {
        this.game = game
        this.x = x
        this.y = y
        this.size = Math.random() * 7 + 3
        this.speedX = Math.random()
        this.speedY = Math.random()
        this.color = '#343434'
        this.markedForDeletion = false
    }

    update() {
        this.x -= this.game.speed
        this.y += this.speedY
        this.size *= 0.95
        if (this.size < 0.5) this.markedForDeletion = true
    }

    draw(context) {
        context.fillStyle = this.color
        context.beginPath()
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        context.fill()
    }
}
