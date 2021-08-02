<script>
	import Wallet from './components/Wallet.svelte';
	import WalletPreview from './components/WalletPreview.svelte'
	import Header from './components/Header.svelte';
	import Footer from './components/Footer.svelte';
	import BeamForm from './components/BeamForm.svelte';

	import {
		loggedIn
	} from './store'
</script>

<Header />

{#if $loggedIn}
<div>
	<article class="ui">
		<Wallet />
		<BeamForm />
	</article>
</div>
{:else}
<div>
	<WalletPreview />
</div>
{/if}
<Footer />

<style>
	div {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin: 1em 0;
	}

	.ui {
		justify-content: space-between;
	}
	article {
		display: flex;
		width: 100%;
		max-width: 1000px;
		flex-direction: row;
		box-sizing: border-box;
	}
</style>