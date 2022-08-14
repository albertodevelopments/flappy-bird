import { Layer } from './Layer.js'

export class Background {
    constructor(game) {
        this.game = game
        this.topBackgroundImage = background
        this.bottomBackgroundImage = ground
        this.createLayers()
    }

    createLayers() {
        /** Parte superior */
        this.game.layers.push(
            new Layer(this.game, this.topBackgroundImage, 0, 0, 512, 0.5)
        )

        /** Parte inferior */
        this.game.layers.push(
            new Layer(this.game, this.bottomBackgroundImage, 0, 512, 112, 1)
        )
    }

    update() {
        this.game.layers.forEach(layer => layer.update())
    }

    draw(context) {
        this.game.layers.forEach(layer => layer.draw(context))
    }
}
