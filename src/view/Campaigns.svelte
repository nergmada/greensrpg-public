<script>
    import {name} from 'lib/store';
    import get from 'lib/campaigns/get';
    const params = (new URLSearchParams(window.location.search));
    const admin = params.get('admin');
    if (admin) {
        $name = admin;
    }
</script>
<div class="inner">
    {#if !admin}
        <h1>Error</h1>
        <p>No name supplied, <a href="/">click here</a> to get back to login</p>
    {:else}
        {#await get()}
            <h2>Loading...</h2>
            <p>Just a second, we've asked the server what campaigns are currently available</p>
        {:then result} 
            {#each result as c}
                <div class="campaign" on:click={() => {
                    window.location.href = `/play?admin=${admin}&campaign=${c.id}`
                }}>
                    <h2>{c.name}</h2>
                    <p>{c.description}</p>
                </div>
            {/each}
        {/await}
    {/if}
</div>

<style>
    .inner {
        max-width: 900px;
        margin: auto;
        padding-top: 10px;
    }
    .campaign {
        border: 1px solid #fff;
        margin: 10px;
        padding: 10px;
        cursor: pointer;
    }
    h2 {
        font-size: 50px;
    }
</style>