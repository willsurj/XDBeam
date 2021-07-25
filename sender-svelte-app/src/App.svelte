<script>
	import {
		onMount
	} from 'svelte';

	import Header from './components/Header.svelte';

	let name;
	let text;



	onMount(() => {
		name = "will";
		text = 'hi';
	})
</script>

<Header />

<main>
	<h1>{text} {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>


<style>
	h1 {
		color: var(--blak);
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
		margin: 10px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>