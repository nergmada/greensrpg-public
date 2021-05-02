import path from 'path';
import fs from 'fs';
import json5 from 'json5';
import * as assets from 'campaigns/assets';

async function do_array(array, root, images, music) {
    const result = await Promise.all(array.map(v => {
        if (typeof v === 'string') {
            return load({value: v}, root, images, music).then(o => {
                return o.value;
            });
        }
        if (Array.isArray(v)) {
            return do_array(v, root, images, music);
        }
        if (typeof v === 'object') {
            return load(v, root, images, music);
        }
        return v;
    }));
    return result;
}


export async function load(json, root, images, music) {
    const keys = Object.keys(json);
    let result = {
        ...json,
    };
    for (let i = 0; i < keys.length; ++i) {
        const k = keys[i];
        if (typeof json[k] === 'string' && json[k].startsWith("json5:")) {
            const textpath = path.join(root, json[k].slice(7));
            const jsonData = json5.parse(await fs.promises.readFile(textpath, 'utf-8'));
            if (Array.isArray(jsonData)) result[k] = await do_array(jsonData, root, images, music);
            else result[k] = await load(jsonData, root, images, music);
        }
        else if (typeof json[k] === 'string' && json[k].startsWith("file:")) {
            const textpath = path.join(root, json[k].slice(6));
            result[k] = await fs.promises.readFile(textpath, 'utf-8');
        }
        else if (typeof json[k] === 'string' && json[k].startsWith("image:")) {
            const imageName = json[k].slice(6);
            if (images && Array.isArray(images) && images.some(v => v.name === imageName)) {
                const data = images.find(v => v.name === imageName);
                result[k] = path.join(root, data.relative);
            }
        }
        else if (typeof json[k] === 'string' && json[k].startsWith("music:")) {
            const musicName = json[k].slice(6);
            if (music && Array.isArray(music) && music.some(v => v.name === musicName)) {
                const data = music.find(v => v.name === musicName);
                result[k] = path.join(root, data.relative);
            }
        }
        else if (typeof json[k] === 'string' && json[k].startsWith("asset:")) {
            const textpath = path.join(root, json[k].slice(7)).split('/');
            result[k] = textpath.slice(1).reduce((prev, curr) => {
                return prev[curr];
            }, assets);
            console.log(result[k]);
        }
        else if (Array.isArray(json[k])) {
            result[k] = await do_array(json[k], root, images, music);
        }
        else if (typeof json[k] === 'object') {
            result[k] = await load(json[k], root, images, music);
        }
    }
    return result;
}


export default load;