import * as Phaser from 'phaser';
import { ThreeLayer } from '../game/three-layer';

const IMAGES = ['bg', 'board', 'btn_green', 'mascot', 'btn_blue_sq', 'pause', 'circle_cream', 'bst_add', 'bst_shuffle', 'bst_claw', 'bst_flower'];
const SOUNDS: Record<string, string> = {
    pop: 'pop.ogg', drop: 'cube_break_1.ogg', pick: 'SFX_INGAME_COIN_PICK.ogg', nest: 'count_reach.ogg',
    lose: 'sfx-Lose.wav', win: 'QuestRewardGet.ogg', click: 'ui_button_click.ogg', add: 'SFX_INGAME_ADD.ogg',
    music: 'music_gameplay.ogg',
};

// Loads sprites, sounds, the web font and the 3D meshes, then starts the game.
export class Boot extends Phaser.Scene {
    private label!: Phaser.GameObjects.Text;

    constructor() {
        super('Boot');
    }

    preload() {
        const { width, height } = this.scale;
        const label = (this.label = this.add.text(width / 2, height / 2, 'Loading...', { fontFamily: 'Arial', fontSize: '48px', color: '#7a4a24', align: 'center', wordWrap: { width: width - 120 } }).setOrigin(0.5));
        this.load.on('progress', (v: number) => label.setText(`Loading... ${Math.round(v * 100)}%`));
        this.load.setPath('assets/');
        for (const n of IMAGES) this.load.image(n, `img/${n}.png`);
        for (const [k, f] of Object.entries(SOUNDS)) this.load.audio(k, `sfx/${f}`);
    }

    async create() {
        try {
            const three = new ThreeLayer();
            // the web font comes from Google Fonts; if it is slow or blocked, start with the fallback font
            const font = Promise.race([
                document.fonts.load('48px "Lilita One"').catch(() => undefined),
                new Promise((res) => setTimeout(res, 2500)),
            ]);
            await Promise.all([three.load(''), font]);
            this.scene.start('Game', { three });
        } catch (e) {
            // show why the game could not start instead of hanging on the loading screen
            console.error(e);
            this.label.setText(`Could not start the game:\n${e instanceof Error ? e.message : String(e)}`);
        }
    }
}
