import * as Phaser from 'phaser';
import { Game } from './scenes/Game';

// Portrait phone: 390x844 points rendered at 2x for crisp text.
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    title: 'Colony Flow Sand',
    backgroundColor: '#1b1b24',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'game-container',
        width: 780,
        height: 1688
    },
    scene: [Game]
};

const game = new Phaser.Game(config);

if (import.meta.env.DEV) (window as unknown as { game: Phaser.Game }).game = game;

export default game;
