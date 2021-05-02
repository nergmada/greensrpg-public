<script>
    import {map, availableMaps, adminStatus, instanceId} from 'lib/store';
    import {maps} from 'lib/assets/images';

    import {connect} from 'lib/admin';
    import Zoomer from './Zoomer.svelte';
    let zoomed = false;
    let image_pos_x = 0;
    let image_pos_y = 0;
    let window_pos_x = 0;
    let window_pos_y = 0;
    let img = null;
    const updateMap = (mapName) => {
        connect().updateMap($instanceId, mapName);
    }
</script>

{#if $map}
    <div>
        {#if $adminStatus}
            {#if $availableMaps.length > 0}
                {#each $availableMaps as m, i}
                    <button on:click={() => updateMap(m)}>Map {i + 1}</button>
                {/each}
            {:else}
                <div>
                    <button on:click={() => updateMap('map_1')}>Map 1</button>
                    <button on:click={() => updateMap('map_2')}>Map 2</button>
                    <button on:click={() => updateMap('map_3')}>Map 3</button>
                    <button on:click={() => updateMap('map_4')}>Map 4</button>
                    <button on:click={() => updateMap('map_5')}>Map 5</button>
                </div>
            {/if}
        {/if}
        <div on:click={() => {
            zoomed = !zoomed;
        }} on:mouseout={() => {
            //zoomed = false;
        }} on:mousemove={event => {
            if (zoomed) {
                var rect = event.target.getBoundingClientRect();
                image_pos_x = event.clientX - rect.left; //x position within the element.
                image_pos_y = event.clientY - rect.top;  //y position within the element.
                window_pos_x = event.clientX;
                window_pos_y = event.clientY;
            };
        }}>
            <img bind:this={img} class:zoomed src={$availableMaps.length > 0 ? $map : maps[$map]} alt="map" />
        </div>
    </div>
    {#if zoomed}
        <Zoomer 
            bind:image_pos_x 
            bind:image_pos_y 
            bind:mouse_pos_x={window_pos_x} 
            bind:mouse_pos_y={window_pos_y}
            bind:viewer_height={img.height}
            bind:viewer_width={img.width} />
    {/if}
{/if}

<style>
    div {
        width: 900px;
        display: inline-block;
    }
    img {
        width: 100%;
        height: auto;
        cursor: pointer;
    }
    .zoomed {
        transform: scale(1.5);
    }
</style>