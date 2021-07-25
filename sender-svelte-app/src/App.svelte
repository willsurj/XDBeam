<script>
	import {
		onMount
	} from 'svelte';

	import {
		apiData
	} from './store';

	import Button from './components/Button.svelte';
	import Header from './components/Header.svelte';

	onMount(async () => {
		fetch("https://frontier.livenet.digitalbits.io/fee_stats")
			.then(response => response.json())
			.then(data => {
				console.log(data);
				apiData.set(data);
			}).catch(error => {
				console.log(error);
				return {};
			})
	})
</script>

<Header />

<main>
	<Button>API Request</Button>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>

	<pre>
{JSON.stringify($apiData.last_ledger)}
	</pre>
</main>


<style>
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>