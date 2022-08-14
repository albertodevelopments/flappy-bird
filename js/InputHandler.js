export class InputHandler {
    constructor(game) {
        this.game = game
        this.keys = []
        addEventListener('keydown', e => {
            if (e.key === ' ' && !this.keys.includes('Space')) {
                this.keys.push('Space')
            } else if (e.key === 'd') {
                // Debug mode
                this.game.debug = !this.game.debug
            }
        })

        addEventListener('keyup', e => {
            if (e.key === ' ' && this.keys.includes('Space')) {
                this.keys = this.keys.filter(key => key !== 'Space')
            }
        })
    }
}
