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
<label>
    <button>
        Log Out
    </button>
</label>

{:else}
<!-- log in block -->
<form action="">
    <label><input type="text"></label>  
        <Button btnClass="lib" on:click={logInClick}>
            {text}
        </Button>
    </form>
{/if}

<style lang="scss">
    // hehe
    label {
        display: inline;
    }
</style>