import {sessionToken} from 'lib/store';
import {get} from 'svelte/store';



/**
 * Used to generate a secure header to send to the API
 * the headers automatically have the sessionToken attached
 * @param {*} method The method to use (e.g. POST/GET)
 * @param {Object} data The body of the request as a JSON
 * @return {Object} The correctly formatted and prepared header
 */
export const makeSecureRequest = async (method, data = undefined) =>{
    if (data != undefined) {
        return ({
            method,
            mode: 'same-origin',
            redirect: 'manual',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + get(sessionToken),
            },
            body: JSON.stringify(data),
        });
    } else {
        return ({
            method,
            mode: 'same-origin',
            redirect: 'manual',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + get(sessionToken),
            },
        });
    }
};


/**
 * Used the generate a public header to send to the API
 * whilst the server will ignore unnecessary tokens, it seems
 * prudent not to dispatch tokens unless necessary
 * @param {*} method The method to use (e.g. POST/GET)
 * @param {Object} data The body of the request as a JSON
 * @return {Object} The correctly formatted and prepared header
 */
export const makePublicRequest = (method, data) => ({
    method,
    mode: 'same-origin',
    redirect: 'manual',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
});
