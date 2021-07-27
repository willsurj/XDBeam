<script>
    export let btnClass = "";
    export let btnType = "button";
</script>

<button type={btnType} class={btnClass} on:click>
    <slot>Click Me</slot>
</button>

<style lang="scss">
    button {
        background: var(--btn-bg);
        color: var(--btn-txt);
        border: unset;
        border-radius: 6px;
        padding: .5rem 1rem;
        cursor: pointer;
        transition: 100ms;
        margin: 0;
    }

    button:hover {
        background: var(--btn-bg-h);
        color: var(--btn-txt-h);
    }

    button:active {
        transition: 50ms;
        background: var(--btn-bg-a);
        color: var(--btn-txt-a);
    }

    .lib {
        margin-right: 1em;
        width: 7rem;
        height: 3em;
        font-size: 1.1em;
        font-weight: 700;
        font-family: "Quicksand", sans-serif;
    }
</style>