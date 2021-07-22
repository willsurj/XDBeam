<script>
    import LogInButton from './LogInButton.svelte';
    import {
        loggedIn
    } from './store.js';

    function logInClick() {
        console.log("Log In Button Clicked");
        loggedIn.update((li) => (!li));
    }
</script>

<header>
    <h1>XDBeam</h1>
    <LogInButton on:click={logInClick} loggedIn={$loggedIn} />
</header>

<style>
    header {
        background-color: var(--blak);
        display: flex;
        padding: 1em;
        margin: 0 auto;
        align-items: center;
        justify-content: space-between;
    }

    h1 {
        color: var(--wite);
        font-size: 4em;
        font-weight: 100;
        margin: 10px;
    }
</style>