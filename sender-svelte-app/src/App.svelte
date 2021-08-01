<script>
	import Wallet from './components/Wallet.svelte';
	import WalletPreview from './components/WalletPreview.svelte'
	import Header from './components/Header.svelte';
	import Footer from './components/Footer.svelte';

	import {
		loggedIn
	} from './store'
</script>

<Header />

{#if $loggedIn}
<Wallet />
{:else}
<WalletPreview />
{/if}
<Footer />