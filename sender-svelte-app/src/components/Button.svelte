<script>
    export let btnClass = "";
</script>

<button class={btnClass} on:click>
    <slot>Click Me</slot>
</button>

<style>
    button {
        background: var(--btn-bg);
        color: var(--btn-txt);
        border: unset;
        border-radius: 6px;
        padding: .75rem 1.5rem;
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
        margin-right: 1em
    }
</style>