import {
    writable,
    derived
} from 'svelte/store';

export const loggedIn = writable(false);

export const logInKey = writable("");

export const apiData = writable({});

export const apiLoading = writable(true);

const apiRequest = async () => {
    apiLoading.set(true);
    let url = "https://frontier.testnet.digitalbits.io/accounts/" + $logInKey;
    fetch(url)
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