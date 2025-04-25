<script lang="ts">
    export let data;
    let hospitalname = '';
    let macAddress = '';
    let status = 0;
  </script>
  
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Hospitals</h1>
  
    <form method="POST" class="mb-6 card bg-base-100 shadow-md p-4 space-y-4" use:enhance>
      <input name="hospitalname" bind:value={hospitalname} placeholder="Hospital Name" class="input input-bordered w-full" required />
      <input name="macAddress" bind:value={macAddress} placeholder="MAC Address" class="input input-bordered w-full" required />
      <input name="status" type="number" bind:value={status} class="input input-bordered w-full" required />
      <button type="submit" name="intent" value="addHospital" class="btn btn-primary w-full">Add Hospital</button>
    </form>
  
    <ul class="space-y-2">
      {#each data.hospitals as hospital}
        <li class="card bg-base-200 p-4 shadow-sm">
          <a href="{hospital.id}"><div class="text-lg font-semibold">{hospital.hospitalname}</div></a>
          <div class="text-sm text-gray-500">MAC: {hospital.macAddress}</div>
          <div class="text-sm">Status: {hospital.status}</div>
        </li>
      {/each}
    </ul>
  </div>
  