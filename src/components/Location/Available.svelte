<script>
    import Card from './Card.svelte';
    import { availableLocations, location as currentLocation } from 'lib/store';
    let visible = false;
</script>
<div class="topfix">
    {#if visible}
        {#each $availableLocations as location}
            <Card bind:location={location} />
        {/each}
    {/if}
    <div class="show" on:click={() => {
        visible = !visible;
    }}>
        <h2>
            Show Available Locations
        </h2>
    </div>
</div>
    
<style>
    .show {
        margin: auto;
        width: 300px;
        border: 1px solid #fff;
        cursor: pointer;
        background-color: #000;
    }
    h3 {
        margin: 0;
    }
    .card {
        display: flex;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;
        vertical-align: middle;
        flex: 1 1 auto;
        clear: right;
    }
    .border {
        border: 1px solid #fff;
        background-color: #000;
        width: 600px;
        margin: auto;
    }
    .topfix {
        position: absolute;
        top: 0;
        width: 100%;
        max-height: 60vh;
        overflow-x: auto;
    }
    .topfix::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }
    .topfix::-webkit-scrollbar-track {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
    }
    .topfix::-webkit-scrollbar-thumb {
        background-color: #11171a;
        border-radius: 10px;
    }
    button {
        background: none;
        color: #fff;
        border: none;
        outline: none;
        cursor: pointer;
    }
</style>