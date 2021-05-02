import {writable, derived, readable} from 'svelte/store';
import {get} from 'svelte/store';
import {connect} from 'lib/admin';
import AudioManager from 'lib/audio';
import {pushNotification} from 'lib/notifications';

const params = (new URLSearchParams(window.location.search));
const skip = params.get('skip');

export const instanceId = writable(null);
export const name = writable('');


export const audioManager = readable(new AudioManager());

export const volume = writable(localStorage.getItem('volume') ? localStorage.getItem('volume') : 1);
volume.subscribe(v => {
    get(audioManager).setMasterVolume(v);
    localStorage.setItem('volume', v);
});

export const players = writable([]);

export const me = derived([players, name], ([p, n], set) => {
    set(p.find(pl => pl.player_name === n));
})

export const npcs = writable([]);
export const availableNpcs = writable([]);

export const time = writable(0);


export const log = writable([]);

export const map = writable(null);
export const availableMaps = writable([]);

export const availableLocations = writable([]);
export const location = writable(null);

export const adminStatus = writable(false);

export const act = writable(1);
export const acts = writable(null);

export const title = writable(null);
export const author = writable(null);

export const title_image = writable(null);
export const title_music = writable(null);

players.subscribe(v => {
    if (!v || v.length === 0) return;
    if (get(adminStatus)) {
        connect().updatePlayerData(get(instanceId), v);
    }
})

npcs.subscribe(v => {
    if (!Array.isArray(v)) return;
    if (get(adminStatus)) {
        connect().updateNpcs(get(instanceId), v);
    }
    if (!get(audioManager) 
        || get(adminStatus) 
        || (get(location) && get(location).combat_override)) return; 
    if (v.some(n => n.hostile)) {
        get(audioManager).start_combat();
    } else {
        get(audioManager).end_combat();
    }
})

location.subscribe(v => {
    if (!v || v.length === 0) return;
    if (skip) {
        get(audioManager).play('location_change');
        get(audioManager).location_change(v.audio ? v.audio : 'default_location');
    }
    if (get(adminStatus)) {
        connect().updateLocation(get(instanceId), v);
    }
    console.log(v);
    if (v.act && get(act) !== v.act) {
        act.set(v.act);
    }
})

time.subscribe(v => {
    if (v === 0) return;
    if (get(adminStatus)) {
        connect().updateTime(get(instanceId), v);
    }
})