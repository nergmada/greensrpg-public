import io from 'socket.io-client';
import {name} from 'lib/store';
import {get} from 'svelte/store';

let instance = null;
export const connect = () => {
    if (instance) return instance;
    console.log("connecting as player");
    const socket = io({
        extraHeaders: {
            type: 'player',
            name: get(name),
        }
    });
    socket.on('connect_error', err => console.log(err));
    
    socket.connect();

    instance = {};
    
    instance.listenFor = (event, callback) => {
        socket.on(event, callback);
    }
    
    instance.rollSix = (instance_id) => {
        socket.emit('dice_six', instance_id);
    }
    
    instance.rollTwenty = (instance_id) => {
        socket.emit('dice_twenty', instance_id);
    }
    
    instance.rollHundred = (instance_id) => {
        socket.emit('dice_hundred', instance_id);
    }

    instance.getInstance = (instance_id, callback) => {
        socket.once('campaign_instance_retrieved', callback);
        socket.emit('get_campaign_instance', instance_id);
    }

    instance.message = (instance_id, message) => {
        socket.emit('log_message', instance_id, message);
    }

    instance.getCharacters = (instance_id, callback) => {
        socket.once('characters_retrieved', callback);
        socket.emit('get_characters', instance_id);
    }

    return instance;
}
