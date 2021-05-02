<script>
    import {adminStatus} from 'lib/store';
    import {connect} from 'lib/admin';
    import AdminScreen from './AdminScreen.svelte';
    export let name = null;
    export let id = null;
    export let campaign_id = null;
    $adminStatus = true;
    if (!id) {
        connect().createCampaign(campaign_id, instance => {
            window.location.href = `/play?admin=${name}&id=${instance.instance_id}`
        })
    }
</script>

{#if name && id}
    <AdminScreen id={id} />
{:else if !name || !campaign_id}
    <h2>Error</h2>
    <p>No campaign name or campaign ID was supplied, please <a href="/">click here</a> to try again</p>
{:else}
    <h2>Loading</h2>
    <p>We're just getting your campaign ready</p>
{/if}