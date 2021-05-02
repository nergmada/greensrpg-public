import {fetchJson} from 'lib/doFetch';
import {makePublicRequest} from 'lib/requests';
import {pushError} from 'lib/notifications';

export default async function get() {
    try {
        return await fetchJson('/api/campaigns', makePublicRequest('get'));
    } catch(err) {
        if (err.message) pushError(err.message);
        else pushError("An unknown error occurred");
    }
}