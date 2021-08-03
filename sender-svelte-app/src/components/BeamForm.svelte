<script>
    let destination = "";

    import {
        balances,
        apiLoading,
        txPopupActive
    } from '../store';
    import Button from './Button.svelte';

    function signForm() {
        txPopupActive.set(true);
    }
</script>
<div class="everything">
    <h2>Send DigitalBits to Anyone</h2>
    <main>
        <form action="">
            {#if !$apiLoading}
        <div class="inputs">
            <div class="field">
                <input type="text" name="destination" class="input" placeholder=" " bind:value="{destination}" />
                <label for="email" class="label">Destination Address</label>
            </div>
            <div class="field" id="value">
                <input type="text" name="value" class="input" placeholder=" " />
                <label for="email" class="label">Value</label>
            </div>
                <select name="token" id="token">
                    {#each $balances as bal, i}
                    <option value="i">
                        {bal.asset_type === "native" ? "XDB" : bal.asset_code}
                    </option>
                    {/each}
                </select>
        </div>
        <Button on:click={signForm}>Sign and Submit</Button>
        {/if}
    </form>
</main>
</div>

<style>
    main {
        border-radius: 2em;
        border: 1px solid var(--light);
        background-color: var(--middle-dark);
        color: white;
        padding: 1.3em;
        padding-top: 0.3em;
        filter: drop-shadow(0px 0px 2px var(--middle));
        box-sizing: border-box;
        height: 260px;
    }

    form {
        width: 90%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        /* margin-bottom: 1.4em; */
    }


    h2 {
        text-align: center;
    }

    .field {
        width: 100%;
        margin: 0 auto;
        position: relative;
        border-bottom: 2px dashed white;
        margin: 2.2rem auto 1rem;
        transition: 500ms;
    }

    #value {
        width: 70%;
        margin: 2.2rem 0 1rem;
        float: left;
    }

    #token {
        position: relative;
        left: 35px;
        top: 31px;
        height: 25%;
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

    .everything {
        box-sizing: border-box;
        width: 48%;
    }

</style>