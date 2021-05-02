<script>
    import {connect} from 'lib/admin';
    import {name} from 'lib/store';
    import Campaign from './Campaign.svelte';
    export let campaigns = [];
</script>

<div>
    {#each campaigns as campaign}
        <Campaign campaign={campaign} on:click={() => connect().createCampaign(campaign.id, instance => {
            window.location.href = `/?admin=${$name}&id=${instance.instance_id}`
        })} />
    {/each}
</div>

<style>
    div {
        width: 800px;
        margin: auto;
    }
</style>