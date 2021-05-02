import {errors, notifications} from 'lib/store';

/**
 * Shoves a new error on to the error message stack
 * @param {*} msg The message to show in the error
 */
export const pushNotification = msg => {
    notifications.update(v => {
        v.push(msg);
        return v;
    });
};

/**
 * Shoves a new error on to the error message stack
 * @param {*} msg The message to show in the error
 */
export const pushError = msg => {
    errors.update(v => {
        v.push(msg);
        return v;
    });
};