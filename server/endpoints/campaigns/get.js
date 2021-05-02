import fs from 'fs';
import json5 from 'json5';

import error from 'lib/errorHandling';
import load from 'lib/loader';

export async function loadUploadedMeta(name) {
    return await fs.promises.readFile(`../uploaded/${name}/index.grpg`, 'utf-8')
        .then(v => json5.parse(v))
        .then(o => ({
            name: o.name,
            description: o.description, 
            id: `uploaded/${name}`
        }))
        .then(o => load(o, `../uploaded/${name}`, o.images, o.music));
}

export async function loadUploaded() {
    try {
        const uploadedCampaigns = await fs.promises.readdir('../uploaded');
        const indexed = (await Promise.all(uploadedCampaigns.map(async v => ({
            name: v,
            valid: (await fs.promises.readdir(`../uploaded/${v}`)).includes('index.grpg')
        })))).filter(v => v.valid).map(v => v.name);
        return await Promise.all(indexed.map(v => loadUploadedMeta(v)));
    } catch (err) {
        console.log(err);
    }
}

export async function loadMeta(name) {
    return await fs.promises.readFile(`./campaigns/${name}/index.json5`, 'utf-8')
        .then(v => json5.parse(v))
        .then(o => ({
            name: o.name,
            description: o.description, 
            id: name
        }))
        .then(o => load(o, `./campaigns/${name}`));
}


export default async function(req, res) {
    try {
        const campaigns = await fs.promises.readdir('./campaigns');
        const metadata =  await Promise.all(campaigns.filter(name => name !== 'assets.js').map(name => loadMeta(name)));
        const uploaded = await loadUploaded();
        await loadUploaded();
        return res.status(200).json([...metadata, ...uploaded]);
    } catch(err) {
        console.log(err);
        error(err, res);
    }
}