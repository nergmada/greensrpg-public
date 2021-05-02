<script>
    import {location as currentLocation, adminStatus} from 'lib/store';
    import Bio from './Bio.svelte';
    import Dropdown from './Dropdown';
    import Images from './Images.svelte';
    export let location = null;
    let dropdown = false;
    let images = null;
</script>

<Images bind:images />

{#if location}
    <div class="border">
        <div class="card">
            <div>
                <h3>{location.name}</h3>
            </div>
            <div>
                <Bio 
                    bio={location.description} 
                    adminDescriptor={location.private_description}  />
                <button on:click={() => {
                    dropdown = !dropdown;
                }}>
                    <span class="material-icons">
                        {dropdown ? "arrow_drop_up" : "arrow_drop_down"}
                    </span>
                </button>
                {#if $adminStatus}
                    <button on:click={() => {
                        $currentLocation = location;
                    }}>
                        <span class="material-icons">
                            cloud
                        </span>
                    </button>
                {/if}
                {#if location.images}
                    <button on:click={() => {
                        images = location.images;
                    }}>
                        <span class="material-icons">
                            collections
                        </span>
                    </button>
                {/if}
            </div>
        </div>
        {#if dropdown}
            <Dropdown bind:items={location.features} />
        {/if}
    </div>
{/if}
    
<style>
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
    button {
        background: none;
        color: #fff;
        border: none;
        outline: none;
        cursor: pointer;
    }
</style>