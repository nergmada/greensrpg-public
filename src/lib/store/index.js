import {writable} from 'svelte/store';

export * from './game';

export const view = writable(window.location.pathname);
export const notifications = writable([]);
export const errors = writable([]);

//legacy
export const sessionToken = writable(null);
export const profile = writable(null);