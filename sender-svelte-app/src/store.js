import {
    writable
} from 'svelte/store';

export const loggedIn = writable(false);

export const logInKey = writable("");

export const apiData = writable({});

export const apiLoading = writable(true);

export const apiRequest = async () => {
    apiLoading.set(true);
    let key;
    logInKey.subscribe(value => {
        key = value;
    })
    let url = "https://frontier.testnet.digitalbits.io/accounts/" + key; // How do i read the value of logInKey???
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            apiData.set(data);
            apiLoading.set(false);
        }).catch(error => {
            console.log(error);
            apiLoading.set(false);
            return {};
        })
}