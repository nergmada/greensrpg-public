import io from 'socket.io-client';
import {name, adminStatus} from 'lib/store';
import {get} from 'svelte/store';

let instance = null; 
export const connect = () => {
    if (instance) return instance;
    if (!get(adminStatus)) throw { message: 'Not an admin' };
    console.log("connecting as admin");
    
    const socket = io({
        extraHeaders: {
            type: 'admin',
            name: get(name),
        }
    });
    
    socket.on('connect_error', err => console.log(err));
    socket.connect();

    instance = {};

    instance.getCampaigns = (callback) => {
        socket.once('campaigns', callback);
        socket.emit('get_campaigns');
    }
    
    instance.createCampaign = (id, callback) => {
        socket.once('campaign_created', callback);
        socket.emit('create_campaign', id);
    }
    
    instance.listenFor = (event, callback) => {
        socket.on(event, callback);
    }
    
    instance.getInstance = (instance_id, callback) => {
        socket.once('campaign_instance_retrieved', callback);
        socket.emit('get_campaign_instance', instance_id);
    }

    instance.updatePlayerData = (instance_id, data) => {
        socket.emit('update_players', instance_id, data);
    }

    instance.updateTime = (instance_id, data) => {
        socket.emit('update_time', instance_id, data);
    }

    instance.updateMap = (instance_id, data) => {
        socket.emit('update_map', instance_id, data);
    }

    instance.message = (instance_id, message) => {
        socket.emit('log_message', instance_id, message);
    }

    instance.updateNpcs = (instance_id, npcs) => {
        socket.emit('update_npcs', instance_id, npcs);
    }
    instance.updateLocation = (instance_id, location) => {
        socket.emit('update_location', instance_id, location);
    }

    return instance;
}
