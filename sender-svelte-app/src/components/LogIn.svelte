<script>
    import Button from './Button.svelte'
    import {
        loggedIn
    } from '../store.js';

    let text;
    $: if ($loggedIn) {
        text = "Log Out";
    } else {
        text = "Log In";
    }

    function logInClick() {
        console.log("Log In Button Clicked");
        loggedIn.update((li) => (!li));
    }
</script>

{#if $loggedIn} 
<!-- log out button -->
<Button btnClass="lib" on:click={logInClick}>
    {text}
</Button>
{:else}
<!-- log in block -->
<form action="">
    <label><input type="text"></label>  
        <Button btnClass="lib" on:click={logInClick}>
            {text}
        </Button>
    </form>
{/if}

<style>
    label {
        display: inline;
        margin-right: 1em;
        color: -internal-light-dark(var(--middle), white);
    }
</style>