<script lang="ts">
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
	<link rel="icon" href="/favicon.svg" />
	<meta name="theme-color" content="#0a0e1a" />
</svelte:head>

{@render children()}
