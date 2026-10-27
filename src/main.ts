import * as Phaser from 'phaser';
import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { H, W } from './game/layout';

// Portrait phone layout at 1080 x 1920, scaled to fit the window.
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    title: 'Colony Flow Sand',
    backgroundColor: '#f6c48e',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'game-container',
        width: W,
        height: H
    },
    scene: [Boot, Game]
};

const game = new Phaser.Game(config);

if (import.meta.env.DEV) (window as unknown as { game: Phaser.Game }).game = game;

export default game;
