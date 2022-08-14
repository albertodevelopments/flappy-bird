import { Game } from './Game.js'

/** El evento load se dispara una vez se haya cargado todo
 *  el html así como su contenido. A diferencia del DOMContentLoad,
 *  que se lanza cuando se carga la página, pero no sus imágenes
 *  y otros assets
 */
addEventListener('load', () => {
    const ctx = canvas.getContext('2d')
    canvas.width = 1200
    canvas.height = 620
    let lastTime = 0

    const game = new Game(canvas.width, canvas.height)
    game.musicAudio.play()

    addEventListener('keydown', e => {
        if (e.key === 'Enter' && game.gameOver) restart()
    })

    const animate = timeStamp => {
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.update(deltaTime)
        game.draw(ctx)

        !game.gameOver && requestAnimationFrame(animate)
    }
    animate(0)

    const restart = () => {
        game.player.x = game.width * 0.2
        game.player.y =
            game.height -
            game.player.height * 0.5 -
            game.verticalBorder -
            game.ground

        game.obstacles = []
        game.gameOver = false
        game.score = 0
        game.musicAudio.play()

        animate(0)
    }
})
