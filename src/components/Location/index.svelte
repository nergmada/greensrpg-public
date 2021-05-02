<script>
    import Card from './Card.svelte';
    import {location, me, adminStatus} from 'lib/store';
</script>
{#if $adminStatus}
    <div class="topfix" style={$me ? '' : 'bottom:0px;'}>
        <Card bind:location={$location} />
    </div>
{:else}
    <div class="topfix" style={$me ? '' : 'bottom:0px;'}>
        <Card location={$location} />
    </div>
{/if}
    
<style>
    .topfix {
        position: absolute;
        bottom: 130px;
        width: 100%;
    }
</style>