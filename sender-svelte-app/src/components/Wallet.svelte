<script>
    import {
        apiData,
        apiLoading
    } from '../store';

    import {
        onMount
    } from 'svelte';

    import Button from './Button.svelte'

    const apiRequest = async () => {
        apiLoading.set(true);
        fetch("https://frontier.testnet.digitalbits.io/assets")
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

    let btnText;

    $: if ($apiLoading) {
        btnText = "Loading..."
    } else {
        btnText = "Refresh Data";
    }

    onMount(apiRequest);
</script>

<main>
    <Button on:click="{apiRequest}">{btnText}</Button>

    <p>
        {JSON.stringify($apiData)}
    </p>
</main>