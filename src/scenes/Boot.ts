import * as Phaser from 'phaser';
import { ThreeLayer } from '../game/three-layer';

/** The win screen's art (public/assets/win): its background, the "AMAZING" title, the coin pile,
 * the two buttons and their icons, plus the glow, rays and confetti. */
const WIN = ['win_bg', 'amazing', 'rewards', 'btn_reward', 'btn_continue', 'icon_coin', 'icon_ads', 'glow_rays', 'glow', 'confetti_ribbon', 'confetti_star'];
const IMAGES = ['bg', 'btn_blue_sq', 'pause', 'btn_speed_on', 'btn_speed_off', 'icon_ff', 'bst_btn', 'bst_btn_locked', 'icon_lock', 'bst_frame', 'badge_red', 'badge_plus', 'bst_magnet', 'bst_arrows', 'bst_cannon'];
/** The Pause panel's art (public/assets/settings), loaded as `set_<name>`. */
const SETTINGS = ['board', 'btn_blue', 'btn_gray', 'btn_close', 'btn_green', 'btn_red', 'music_on', 'music_off', 'sound_on', 'sound_off', 'vibe_on', 'vibe_off', 'icon_retry', 'icon_home'];
/** The lose panels' art (public/assets/lose): the board, its close button, the broken heart, the
 * revive buttons (ad, coins) and their icons, Try Again, and the lives (hearts, blank heart, refill time box). */
const LOSE = ['lose_board', 'btn_close', 'heart_break', 'btn_rv', 'icon_rv', 'btn_purchase', 'icon_coin', 'btn_try_again', 'heart', 'heart_blank', 'heart_timebox'];
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
        for (const n of SETTINGS) this.load.image(`set_${n}`, `settings/${n}.png`);
        for (const [k, f] of Object.entries(SOUNDS)) this.load.audio(k, `sfx/${f}`);
        for (const n of WIN) this.load.image(n, `win/${n}.png`);
        for (const n of LOSE) this.load.image(`lose_${n}`, `lose/${n}.png`);
        // Colony Flow's confetti sheet: 5 x 5 shapes
        this.load.spritesheet('confetti', 'win/confetti.png', { frameWidth: 102, frameHeight: 102 });
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
