<script>
    let destination = "";

    import Button from './Button.svelte';
</script>

<main>
    <form action="">
        <div class="inputs">
            <div class="field">
                <input type="text" name="destination" class="input" placeholder=" " bind:value="{destination}" />
                <label for="email" class="label">Destination</label>
            </div>
            <div class="field" id="value">
                <input type="text" name="value" class="input" placeholder=" " />
                <label for="email" class="label">Value</label>
            </div>
        </div>
        <Button>Sign and Submit</Button>
    </form>
</main>

<style>
    main {
        border-radius: 2em;
        border: 1px solid var(--light);
        background-color: var(--middle-dark);
        color: white;
        padding: 1.3em;
        width: 48%;
        filter: drop-shadow(0px 0px 2px var(--middle));
        box-sizing: border-box;
        height: 300px;
    }

    form {
        width: 90%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        margin-bottom: 1.4em;
    }



    .field {
        width: 100%;
        margin: 0 auto;
        position: relative;
        border-bottom: 2px dashed white;
        margin: 2.4rem auto 1rem;
        transition: 500ms;
    }

    #value {
        width: 70%;
        margin: 2.4rem 0 1rem;
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