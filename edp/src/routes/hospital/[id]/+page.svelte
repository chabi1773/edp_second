<script lang="ts">
    export let data;
  </script>
  
  <div class="p-4 space-y-6">
    <h1 class="text-3xl font-bold">
      Clients for {data.hospital?.hospitalname}
    </h1>
  
    {#if data.hospital?.clients.length === 0}
      <p>No clients yet for this hospital.</p>
    {:else}
      <ul class="space-y-4">
        {#each data.hospital.clients as client}
          <li class="card bg-base-200 p-4 shadow-md">
            <form method="POST" class="space-y-2" use:enhance>
              <input type="hidden" name="clientId" value={client.id} />
              <input name="name" bind:value={client.name} class="input input-bordered w-full" />
              <button type="submit" name="intent" value="updateClient" class="btn btn-secondary w-full">
                Update Client
              </button>
            </form>
  
            {#if client.records.length}
              <div class="mt-2 text-sm text-gray-600">
                <strong>Records:</strong>
                <ul class="list-disc list-inside">
                  {#each client.records as record}
                    <li>{record.temperature}°C at {new Date(record.timestamp).toLocaleString()}</li>
                  {/each}
                </ul>
              </div>
            {/if}
          </li>
        {/each}
      </ul>
    {/if}
  </div>
  