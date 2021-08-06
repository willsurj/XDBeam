<script>
    import {
        fade
    } from 'svelte/transition';

    import MdClose from 'svelte-icons/md/MdClose.svelte'

    import {
        txPopupActive
    } from '../store';

    export const show = () => {
        txPopupActive.set(true);
    }

    export const hide = () => {
        txPopupActive.set(false);
    }
</script>

{#if $txPopupActive}
    <div on:focus={hide} tabindex="0" class="bg" transition:fade>
        <div tabindex="0" class="popup">
            <div class="x" on:click={hide}>
                <MdClose  />
            </div>
            <div class="content">
                <slot></slot>
            </div>
        </div>
    </div>
{/if}

<style>
    .bg {
        position: fixed;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 1;
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding-top: 18em;
    }

    .popup {
        position: relative;
        height: 300px;
        width: 500px;
        border: 1px solid var(--light);
        background-color: var(--middle-dark);
        border-radius: 2em;
        filter: drop-shadow(0px 0px 7px var(--middle)) drop-shadow(0px 0px 15px black);
        box-sizing: border-box;
        color: white;
    }

    .content {
        height: 80%;
        margin: 2em;
        background-color: var(--middle-darkless);
        box-sizing: border-box;
        border-radius: 1em;
    }
    
    .x {
        position: absolute;
        right: -0.7em;
        top: -0.7em;
        height: 2.3em;
        width: 2.3em;
        background-color: var(--btn-bg);
        color: var(--middle);
        border-radius: 100%;
        cursor: pointer;
    }
</style>