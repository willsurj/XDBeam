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

<Button on:click>
    {text}
</Button>