export class Obstacle {
    constructor(game) {
        this.game = game
        this.x = game.width
        this.width = 30
        this.markedToDeletion = false
        this.scored = false
        this.yTop = 0
        this.heightTop =
            (Math.random() * (this.game.height - this.game.ground) - 30) / 3 +
            50
        this.heightBottom =
            (Math.random() * (this.game.height - this.game.ground) - 30) / 3 +
            50
        // this.heightTop = (this.game.height - this.game.ground - 30) / 3 + 50
        // this.heightBottom = (this.game.height - this.game.ground - 30) / 3 + 50
        this.yBottom = this.game.height - this.heightBottom - this.game.ground
        this.image = pipe
    }

    update() {
        this.x -= this.game.speed
        if (this.x < -this.width) this.markedToDeletion = true
    }

    draw(context) {
        context.drawImage(
            topPipe,
            this.x,
            this.yTop,
            this.width,
            this.heightTop
        )
        context.drawImage(
            pipe,
            this.x,
            this.game.height - this.heightBottom - this.game.ground + 5,
            this.width,
            this.heightBottom
        )
    }
}
