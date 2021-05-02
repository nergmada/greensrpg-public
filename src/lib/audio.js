import {Howl, Howler} from 'howler';
import * as audio from 'lib/assets/audio';

export default class AudioManager {
    constructor() {
        this.sounds = {
            good_dice: new Howl({
                src: [audio.good_dice]
            }),
            bad_dice: new Howl({
                src: [audio.bad_dice]
            }),
            location_change: new Howl({
                src: [audio.location_change]
            }),
            intro: new Howl({
                src: [audio.intro]
            }),
            narrative_intro: new Howl({
                src: [audio.narrative_intro]
            }),
            default_location: new Howl({
                src: [audio.default_location]
            }),
            bron_y_de_bar: new Howl({
                src: [audio.bron_y_de_bar]
            }),
            forest: new Howl({
                src: [audio.forest]
            }),
            forest_2: new Howl({
                src: [audio.forest_2]
            }),
            lady_arthurs_bedroom: new Howl({
                src: [audio.lady_arthurs_bedroom]
            }),
            combat: new Howl({
                src: [audio.combat]
            }),
            lodge: new Howl({
                src: [audio.lodge]
            }),
            traveller_camp: new Howl({
                src: [audio.traveller_camp]
            }),
            camp: new Howl({
                src: [audio.camp]
            }),
            captured: new Howl({
                src: [audio.captured]
            }),
            chamber_of_the_gods: new Howl({
                src: [audio.chamber_of_the_gods]
            }),
            final_fight: new Howl({
                src: [audio.final_fight]
            }),
            first_encounter: new Howl({
                src: [audio.first_encounter]
            }),
            shrine_entrance: new Howl({
                src: [audio.shrine_entrance]
            }),
            thirlby: new Howl({
                src: [audio.thirlby]
            }),
            temple_approach: new Howl({
                src: [audio.temple_approach]
            }),
            inner_temple: new Howl({
                src: [audio.inner_temple]
            }),
            cavern: new Howl({
                src: [audio.cavern]
            }),
            end: new Howl({
                src: [audio.end]
            }),
            credits: new Howl({
                src: [audio.credits]
            })
        }
    }

    addAudio(path) {
        if (Object.keys(this.sounds).includes(path)) return;
        this.sounds[path] = new Howl({
            src: [path]
        });
    }

    setMasterVolume(level) {
        Howler.volume(level);
    }

    getMasterVolume() {
        return Howler.volume();
    }

    play(sound_id, volume = 1) {
        console.log(sound_id);
        this.sounds[sound_id].volume(volume);
        this.sounds[sound_id].play();
    }

    fade_and_stop(sound_id, callback = null) {
        this.sounds[sound_id].once('fade', () => {
            if (callback) this.sounds[sound_id].once('stop', callback);
            this.sounds[sound_id].stop();
        });
        this.sounds[sound_id].fade(this.sounds[sound_id].volume(), 0, 2000);
    }

    location_change(new_loc, callback = null) {
        if (new_loc.includes('uploaded')) {
            this.addAudio(new_loc);
        }
        if (this.current_location === new_loc) return;
        if (this.combat && new_loc !== 'combat') { 
            this.before = new_loc;
            return;
        }
        if (this.current_location) {
            this.sounds[this.current_location].once('fade', () => {
                this.sounds[this.current_location].once('stop', () => {
                    this.current_location = null;
                    this.location_change(new_loc, callback);
                })
                this.sounds[this.current_location].stop();
            });
            this.sounds[this.current_location].fade(0.5, 0, 2000);
        } else {
            if (new_loc === 'silence') {
                this.current_location = null;
                return;
            }
            if (!Object.keys(this.sounds).includes(new_loc)) {
                this.location_change('default_location', callback);
            } else {
                this.current_location = new_loc;
                this.sounds[new_loc].volume(0);
                this.sounds[new_loc].loop(true);
                this.sounds[new_loc].play();
                this.sounds[new_loc].once('fade', callback);
                this.sounds[new_loc].fade(0, 0.5, 2000);
            }
        }
    }

    start_combat() {
        if (this.combat || this.current_location === 'combat') return;
        this.before = this.current_location;
        this.combat = true;
        this.location_change('combat');
    }

    end_combat() {
        if (!this.combat) return;
        this.combat = false;
        this.location_change(this.before);
    }
}