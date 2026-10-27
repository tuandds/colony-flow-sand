import * as Phaser from 'phaser';
import { ThreeLayer } from '../game/three-layer';

const IMAGES = ['bg', 'board', 'btn_green', 'mascot', 'btn_blue_sq', 'pause', 'circle_cream', 'bst_add', 'bst_shuffle', 'bst_claw', 'bst_flower'];
const SOUNDS: Record<string, string> = {
    pop: 'pop.ogg', drop: 'box_drop_in.ogg', pick: 'SFX_INGAME_COIN_PICK.ogg', nest: 'count_reach.ogg',
    lose: 'sfx-Lose.wav', win: 'QuestRewardGet.ogg', click: 'ui_button_click.ogg', add: 'SFX_INGAME_ADD.ogg',
    music: 'music_gameplay.ogg',
};

// Loads sprites, sounds, the web font and the 3D meshes, then starts the game.
export class Boot extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        const { width, height } = this.scale;
        const label = this.add.text(width / 2, height / 2, 'Loading...', { fontFamily: 'Arial', fontSize: '48px', color: '#7a4a24' }).setOrigin(0.5);
        this.load.on('progress', (v: number) => label.setText(`Loading... ${Math.round(v * 100)}%`));
        this.load.setPath('assets/');
        for (const n of IMAGES) this.load.image(n, `img/${n}.png`);
        for (const [k, f] of Object.entries(SOUNDS)) this.load.audio(k, `sfx/${f}`);
    }

    async create() {
        const three = new ThreeLayer();
        await Promise.all([
            three.load(''),
            document.fonts.load('48px "Lilita One"').catch(() => undefined),
        ]);
        this.scene.start('Game', { three });
    }
}
