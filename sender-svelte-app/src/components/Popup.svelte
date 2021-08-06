<script>
    import PopupTemplate from "./PopupTemplate.svelte";
    import Button from './Button.svelte';

    let seed;
    let signed = false;

    function sign() {
        signed = true;
    }
</script>

<PopupTemplate>
    <main>
        <h2>Enter Secret Seed to Send</h2>
        <form action="">
            <div class="field">
                <input type="text" name="seed" class="input" placeholder=" " bind:value="{seed}" />
                <label for="seed" class="label">Secret Seed</label>
            </div>
            <div class="buttons">
                <Button on:click={sign}>Sign</Button>
                <Button disabled={!signed}>Submit</Button>
            </div>
        </form>
    </main>
</PopupTemplate>

<style>
    main {
        border-radius: 2em;
        color: white;
        padding: 1.3em;
        padding-top: 0.3em;
        box-sizing: border-box;
    }

    .buttons {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }

    .field {
        width: 100%;
        margin: 0 auto;
        position: relative;
        border-bottom: 2px dashed white;
        margin: 2.2rem auto 1rem;
        transition: 500ms;
    }

    form {
        width: 90%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        margin-bottom: 1.4em;
        box-sizing: border-box;
    }

    .label {
        color: white;
        font-size: 1.2rem;
    }

    .input {
        outline: none;
        border: none;
        overflow: hidden;
        margin: 0;
        width: 100%;
        padding: 0.25rem 0;
        background: none;
        color: white;
        font-size: 1.2em;
        font-weight: bold;
        transition: border 500ms;
    }

    /* Border animation */
    .field::after {
        content: "";
        position: relative;
        display: block;
        height: 4px;
        width: 100%;
        background: var(--light);
        transform: scaleX(0);
        transform-origin: 0%;
        opacity: 0;
        transition: all 500ms ease;
        top: 2px;
    }

    .field:focus-within {
        border-color: transparent;
    }

    .field:focus-within::after {
        transform: scaleX(1);
        opacity: 1;
    }

    /* Label animation */
    .label {
        z-index: -1;
        position: absolute;
        transform: translateY(-2rem);
        transform-origin: 0%;
        transition: transform 400ms;
    }

    .field:focus-within .label,
    .input:not(:placeholder-shown)+.label {
        transform: scale(0.8) translateY(-5rem);
        opacity: 1;
    }
</style>