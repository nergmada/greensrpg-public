import zip from 'cross-zip';
import fs from 'fs';
import crypto from 'crypto';

export default async function(req, res) {
    try {
        const hash = crypto.createHmac("sha256", `${req.files.campaign.name.split('.')[0]}${new Date()}`).digest('hex').slice(0, 8);

        await new Promise((res, rej) => {
            zip.unzip(req.files.campaign.tempFilePath, '../uploaded', () => {
                res();
            });
        })

        
        await fs.promises.rename(`../uploaded/${req.files.campaign.name.split('.')[0]}`, `../uploaded/${hash}`)
        
        return res.status(200).json({});
    } catch(err) {
        console.log(err);
        error(err, res);
    }
}