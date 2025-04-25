<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let hospitalId = '';
	let clients: { id: number; name: string }[] = [];
	let name = '';

	// Wait for page store to populate
	$: hospitalId = $page.params.hospitalId;

	async function addClient() {
		await fetch('/api/clients', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, deviceId: hospitalId })
		});
		location.reload(); // optional: consider updating `clients` array instead of full reload
	}

	onMount(async () => {
		const res = await fetch(`/api/clients/${hospitalId}`);
		clients = await res.json();
	});
</script>

<h1>Clients for Hospital</h1>
{#each clients as c}
	<div>
		<p>{c.name}</p>
		<a href={`/records/${c.id}`}>View Temp Records</a>
	</div>
{/each}

<hr />
<h2>Add Client</h2>
<input bind:value={name} placeholder="Client Name" />
<button on:click={addClient}>Add Client</button>
