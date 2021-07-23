<script>
    import Logo from '../public/assets/logoColour.svg'
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
    <Logo width="200px" style="fill:white" />
    <LogInButton on:click={logInClick} loggedIn={$loggedIn} />
</header>

<style>
    header {
        background: var(--middle);
        background: linear-gradient(-150deg, rgba(34, 181, 115, 1) 0%, rgba(39, 141, 193, 1) 100%);
        display: flex;
        padding: 1em;
        margin: 0 auto;
        align-items: center;
        justify-content: space-between;
    }
</style>