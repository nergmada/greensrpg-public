import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import fs from 'fs';
import crypto from 'crypto';
import json5 from 'json5';
import load from 'lib/loader';
import { exit } from 'process';

let db = {};

export async function getDB(id = null) {
    try {
        if (id && db[id]) {
            return db[id];
        } else if (!id && db['db']) {
            return db['db'];
        }
        const adapter = new FileSync(id ? `../saves/${id}.json` : './saves/db.json');
        const result = await low(adapter);
        if (id) {
            db[id] = result;
        } else {
            db['db'] = result;
        }
        if (Object.keys(result.getState()).length === 0) {
            await result.defaults({ campaigns: [] }).write();
        }
        return result;
    } catch (err) {
        console.log(err);
        exit(1);
    }
}

export async function loadCampaign(name) {
    if (name.includes("uploaded")) {
        return await fs.promises.readFile(`../${name}/index.grpg`, 'utf-8')
            .then(v => json5.parse(v))
            .then(o => ({
                ...o, 
                id: name,
                url: true,
            }))
            .then(o => load(o, `../${name}`, o.images, o.music));    
    }
    return await fs.promises.readFile(`./campaigns/${name}/index.json5`, 'utf-8')
        .then(v => json5.parse(v))
        .then(o => ({
            ...o, 
            id: name
        }))
        .then(o => load(o, `./campaigns/${name}`));
}


export async function createCampaign(id, name) {
    try {
        const created = new Date();
        const instance_id = crypto.createHmac("sha256", `${id}${name}${created}`).digest('hex');
        const db = await getDB(instance_id);
        console.log("got db");
        const campaign = await loadCampaign(id);
        console.log("campaign loaded");
        await db.get('campaigns').push({
            instance_id,
            campaign_id: id,
            game_master: name,
            created,
            campaign,
            log: [],
            npcs: [],
            current_location: campaign.start_location
        }).write();
        console.log("Added campaign")
        return db.get('campaigns').find({ instance_id }).value();
    } catch (err) {
        console.log(err);
        exit(1);
    }
}

export async function getCampaign(instance_id) {
    try {
        const db = await getDB(instance_id);
        return db.get('campaigns').find({ 
            instance_id
        }).value();
    } catch(err) {
        console.log(err);
    }
}

export async function setPlayerData(instance_id, data) {
    try {
        console.log(instance_id);
        const db = await getDB(instance_id);
        return await db.get('campaigns')
            .find({ instance_id })
            .set('campaign.player_characters', data)
            .write();
    } catch(err) {
        console.log(err);
    }
}

export async function setTime(instance_id, data) {
    try {
        const db = await getDB(instance_id);
        return await db.get('campaigns')
            .find({ instance_id })
            .set('campaign.time', data)
            .write();
    } catch(err) {
        console.log(err);
    }
}

export async function getTime(instance_id) {
    try {
        const db = await getDB(instance_id);
        return await db.get('campaigns')
            .find({ instance_id })
            .get('campaign.time')
            .value();
    } catch(err) {
        console.log(err);
    }
}

export async function addMessage(instance_id, name, message) {
    try {
        const db = await getDB(instance_id);
        const messages = await db.get('campaigns').find({ instance_id }).value();
        return await db.get('campaigns')
            .find({ instance_id })
            .set('log', [
                ...(messages ? messages.log : []),
                {
                    name,
                    message,
                    time: await getTime(instance_id),
                }
            ])
            .write();
    } catch(err) {
        console.log(err);
    }
}
export async function getLog(instance_id) {
    try {
        const db = await getDB(instance_id);
        return (db.get('campaigns').find({ instance_id }).value()).log;
    } catch(err) {
        console.log("cant get log");
        console.log(err);
    }
}

export async function setMap(instance_id, data) {
    try {
        const db = await getDB(instance_id);
        return await db.get('campaigns')
            .find({ instance_id })
            .set('campaign.current_map', data)
            .write();
    } catch(err) {
        console.log(err);
    }
}

export async function setNpcs(instance_id, data) {
    try {
        const db = await getDB(instance_id);
        return await db.get('campaigns')
            .find({ instance_id })
            .set('npcs', data)
            .write();
    } catch(err) {
        console.log(err);
    }
}

export async function setLocation(instance_id, data) {
    try {
        const db = await getDB(instance_id);
        return await db.get('campaigns')
            .find({ instance_id })
            .set('current_location', data)
            .write();
    } catch(err) {
        console.log(err);
    }
}