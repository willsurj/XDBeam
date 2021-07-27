<script>
    import {
        apiData,
        apiLoading,
        logInKey,
        apiRequest
    } from '../store';

    import {
        onMount
    } from 'svelte';

    import Button from './Button.svelte'

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

    <div class={$apiLoading ? "loading" : "response" }>
        <code>
            {JSON.stringify($apiData)}
        </code>
    </div>
</main>

<style lang="scss">
    .response,
    .loading {
        max-width: 80%;
        overflow: scroll;
    }

    .loading {
        color: rgb(172, 172, 172);
    }
</style>