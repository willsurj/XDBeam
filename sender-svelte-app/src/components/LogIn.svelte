<script>
    import Button from './Button.svelte'
    import {
        apiData,
        apiLoading,
        loggedIn,
        logInKey,
        accountTest
    } from '../store.js';
    import {
        fade
    } from 'svelte/transition';

    let wantsToLogIn = false;
    let tryAgain = false;
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
        console.log("Logged Out");
        loggedIn.update((li) => (!li));
        wantsToLogIn = false;
        logInKey.set("");
        apiData.set({});
        apiLoading.set(false);
    }

    function logInClick() {
        console.log("Log In Button Clicked");

        logInKey.set(key);
        accountTest().then(x => {
            console.log(x);
            if (x) {
                console.log("gj")
                loggedIn.update((li) => (!li));
                wantsToLogIn = false;
                console.log(`${$logInKey} logged in`);
                tryAgain = false;
            } else {
                tryAgain = true;
                console.log("try again bucko")
            }
        })
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
    <label><input class={tryAgain ? "error" : false} type="text" bind:value={key} in:fade></label>  
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
    input {
        border-radius: 3px;
        outline: none;
        &:focus {
            border: 2px solid var(--btn-bg);
        }
    }

    .error {
        border: 2px solid red;
        outline: none;
        &:focus {
            border: 3px solid red;
        }
    }

</style>