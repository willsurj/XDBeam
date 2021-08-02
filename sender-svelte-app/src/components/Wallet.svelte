<script>
    import {
        balances,
        apiLoading,
        apiRequest,
        apiDataTransactions
    } from '../store';

    import {
        onMount
    } from 'svelte';

    import TokenBalance from './TokenBalance.svelte';
    import Button from './Button.svelte';
    import TransactionDisplay from './TransactionDisplay.svelte';

    let btnText;

    $: if ($apiLoading) {
        btnText = "Loading..."
    } else {
        btnText = "Refresh";
    }

    onMount(() => {
        apiLoading.set(true);
        apiRequest();
    });
</script>
<div class="everything">
    <h2>Check Your Wallet</h2>
    <main>
        <Button on:click="{apiRequest}">{btnText}</Button>

        <div class={$apiLoading ? "loading" : "response" }>
            <h3>Token Balances</h3>

            {#if !$apiLoading}
            {#each $balances as tb}
               <TokenBalance {...tb}/>
            {/each}
            {/if}

            <h3>Recent Transactions</h3>

            {#if !$apiLoading}
                {#each $apiDataTransactions as tx}
                   <TransactionDisplay {...tx}/>
                {/each}
            {/if}
        </div>
    </main>
</div>
<style lang="scss">
    .response,
    .loading {
        display: flex;
        flex-direction: column;
        justify-content: safe;
        align-items: center;
        width: 100%;
        overflow: hidden;
    }

    .loading {
        color: rgb(172, 172, 172);
    }

    main {
        border-radius: 2em;
        border: 1px solid var(--light);
        background-color: var(--middle-dark);
        color: white;
        padding: 1.3em;
        filter: drop-shadow(0px 0px 2px var(--middle));
        box-sizing: border-box;
    }

    .everything {
        box-sizing: border-box;
        width: 48%;
    }

    
    h2 {
        text-align: center;
    }

</style>