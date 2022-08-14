export class UI {
    constructor(game) {
        this.game = game
    }

    draw(context) {
        context.save()
        context.font = '31px Helvetica'
        context.fillStyle = 'white'
        context.shadowOffsetX = 2
        context.shadowOffsetY = 2
        context.shadowColor = 'grey'
        context.fillText(`Score: ${this.game.score}`, 20, 40)
        context.restore()

        if (this.game.gameOver) {
            context.save()
            context.font = '35px Helvetica'
            context.fillStyle = 'white'
            context.shadowOffsetX = 2
            context.shadowOffsetY = 2
            context.shadowColor = 'grey'
            let gameOverText = `Game Over! Your score is ${this.game.score}`
            context.fillText(
                gameOverText,
                this.game.width * 0.5 -
                    context.measureText(gameOverText).width * 0.5,
                this.game.height * 0.5 - 40
            )
            gameOverText = 'Press Enter to restart'
            context.font = '25px Helvetica'
            context.fillText(
                gameOverText,
                this.game.width * 0.5 -
                    context.measureText(gameOverText).width * 0.5,
                this.game.height * 0.5 - 10
            )
            context.restore()
        }
    }
}
