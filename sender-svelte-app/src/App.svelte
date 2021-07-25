<script>
	import {
		apiData,
		apiLoading
	} from './store';

	import {
		onMount
	} from 'svelte';

	import Button from './components/Button.svelte';
	import Header from './components/Header.svelte';

	const apiRequest = async () => {
		apiLoading.set(true);
		fetch("https://frontier.testnet.digitalbits.io/assets")
			.then(response => response.json())
			.then(data => {
				console.log(data);
				apiData.set(data);
				apiLoading.set(false);
			}).catch(error => {
				console.log(error);
				return {};
			})

	}

	let btnText;

	$: if ($apiLoading) {
		btnText = "Loading..."
	} else {
		btnText = "Pull from API";
	}

	onMount(apiRequest);
</script>

<Header />

<main>
	<Button on:click="{apiRequest}">{btnText}</Button>

	<p>
		{JSON.stringify($apiData)}
	</p>
</main>