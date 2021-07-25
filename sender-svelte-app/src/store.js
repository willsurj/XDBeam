import {
    writable,
    derived
} from 'svelte/store';

export const loggedIn = writable(false);

export const apiData = writable({});