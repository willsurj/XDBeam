<script>
    import {
        balances,
        apiLoading,
        apiRequest
    } from '../store';

    import {
        onMount
    } from 'svelte';

    import TokenBalance from './TokenBalance.svelte';
    import Button from './Button.svelte'

    let btnText;

    $: if ($apiLoading) {
        btnText = "Loading..."
    } else {
        btnText = "Refresh Data";
    }

    onMount(() => {
        apiLoading.set(true);
        apiRequest();
    });
</script>

<main>
    <Button on:click="{apiRequest}">{btnText}</Button>

    <div class={$apiLoading ? "loading" : "response" }>
        <h3>Token Balances</h3>

        {#if !$apiLoading}
            {#each $balances as tb}
               <TokenBalance {...tb}/>
            {/each}
        {/if}
    </div>
</main>

<style lang="scss">
    .response,
    .loading {
        display: flex;
        flex-direction: column;
        justify-content: safe;
        align-items: center;
        width: 50%;
        overflow: hidden;
    }

    .loading {
        color: rgb(172, 172, 172);
    }
</style>