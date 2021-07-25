<script>
    import Button from './Button.svelte'
    export let loggedIn = false;
    let text;
    $: if (loggedIn) {
        text = "Log Out";
    } else {
        text = "Log In";
    }
</script>

<Button btnClass="lib" on:click>
    {text}
</Button>