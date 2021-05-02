import {fetchJson} from 'lib/doFetch';
import {makePublicRequest} from 'lib/requests';
import {pushError} from 'lib/notifications';

export default async function(file) {
    const fd = new FormData();
    fd.append('campaign', file);
    const result = await fetchJson('/api/campaigns/upload', {
        method: 'POST',
        body: fd,
    });
}