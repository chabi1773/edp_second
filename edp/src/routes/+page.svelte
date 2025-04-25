<script lang="ts">
	import { onMount } from 'svelte';
	type Hospital = {
  			id: number;
  			name: string;
			hospitalname: string;
			macAddress: string;
			status: boolean;
					};
	let hospitals: Hospital[] = [];
	let hospitalname = '';
	let macAddress = '';
	let status = 0;

	async function addHospital() {
		await fetch('/api/hospitals', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ hospitalname, macAddress, status })
		});
		location.reload(); // quick refresh
	}

	onMount(async () => {
		const res = await fetch('/api/hospitals');
		hospitals = await res.json();
	});
</script>

<h1>Hospitals</h1>
{#each hospitals as h}
	<div>
		<h2>{h.hospitalname}</h2>
		<p>MAC: {h.macAddress} | Status: {h.status}</p>
		<a href={`/clients/${h.id}`}>Manage Clients</a>
	</div>
{/each}

<hr />
<h2>Add Hospital</h2>
<input bind:value={hospitalname} placeholder="Hospital Name" />
<input bind:value={macAddress} placeholder="MAC Address" />
<input type="number" bind:value={status} placeholder="Status" />
<button on:click={addHospital}>Add</button>
