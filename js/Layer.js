export class Layer {
    constructor(game, image, x, y, height, speedModifier) {
        this.game = game
        this.x = x
        this.y = y
        this.width = 2880
        this.height = height
        this.image = image
        this.speedModifier = speedModifier
    }

    update() {
        if (this.x < -this.width) this.x = 0
        this.x -= this.game.speed * this.speedModifier
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
        context.drawImage(
            this.image,
            this.x + this.width,
            this.y,
            this.width,
            this.height
        )
    }
}
