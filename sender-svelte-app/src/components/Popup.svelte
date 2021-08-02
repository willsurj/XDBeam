<script>
    import {
        fade
    } from 'svelte/transition';

    import {
        txPopupActive
    } from '../store';

    export const show = () => {
        txPopupActive = true;
    }

    export const hide = () => {
        txPopupActive = false;
    }
</script>

{#if txPopupActive}
    <div class="bg" transition:fade>
        <div class="popup">

        </div>
    </div>
{/if}

<style>
    .bg {
        position: fixed;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.6);
    }

    .popup {
        background-color: var(--light);
        color: var(--middle-dark);
    }
</style>