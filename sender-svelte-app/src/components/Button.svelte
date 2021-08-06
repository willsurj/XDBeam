<script>
    export let btnClass = "";
    export let btnType = "button";
    export let disabled = false;
</script>

<button type={btnType} class={btnClass} disabled={disabled} on:click>
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
        font-size: 1.1em;
        font-weight: 700;
        font-family: "Quicksand", sans-serif;
        text-transform: uppercase;
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

    button:disabled {
        filter: grayscale(1) brightness(0.5);
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