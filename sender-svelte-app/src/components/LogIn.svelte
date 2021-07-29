<script>
    import Button from './Button.svelte'
    import {
        apiData,
        apiLoading,
        loggedIn,
        logInKey
    } from '../store.js';
    import {
        fade,
        fly
    } from 'svelte/transition';

    let wantsToLogIn = false;
    let text;
    $: key = $logInKey;
    $: if ($loggedIn) {
        text = "Log Out";
    } else {
        text = "Log In";
    }

    function logInFormClick() {
        wantsToLogIn = true;
    }

    function logOutClick() {
        console.log("Log Out Button Clicked");
        loggedIn.update((li) => (!li));
        wantsToLogIn = false;
        logInKey.set("");
        apiData.set("");
        apiLoading.set(false);
    }

    function logInClick() {
        console.log("Log In Button Clicked");
        logInKey.set(key);
        loggedIn.update((li) => (!li));
        wantsToLogIn = false;
        console.log(logInKey);
        console.log($logInKey);
    }
</script>

{#if $loggedIn} 
<!-- log out button -->
<div>
<Button btnClass="lib" on:click={logOutClick}>
    <span>{text}</span>
</Button>
</div>
{:else}
<!-- log in block -->
{#if !wantsToLogIn}
<Button btnClass="lib" on:click={logInFormClick}>
    <span>{text}</span>
</Button>

{:else}

<form action="">
    <label><input type="text" bind:value={key} in:fade></label>  
        <Button btnClass="lib" on:click={logInClick}>
            <span>{text}</span>
        </Button>
    </form>
{/if}
{/if}

<style lang="scss">
    // hehe
    label {
        display: inline;
    }
    form > * {
        margin-right: 1em;
    }

</style>