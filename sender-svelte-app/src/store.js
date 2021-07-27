import {
    writable
} from 'svelte/store';

export const loggedIn = writable(false);

export const logInKey = writable("");

export const apiData = writable({});

export const apiLoading = writable(true);