<script>
    import {map, availableMaps} from 'lib/store';
    import {maps} from 'lib/assets/images';
    export let image_pos_x = 0;
    export let image_pos_y = 0;
    export let mouse_pos_x = 0;
    export let mouse_pos_y = 0;
    export let viewer_height = 0;
    export let viewer_width = 0;

    let img = null;

    $: console.log(`x: ${image_pos_x}, y: ${image_pos_y}`);
    $: console.log(`mx: ${mouse_pos_x}, my: ${mouse_pos_y}`);
</script>
{#if mouse_pos_x != 0 && mouse_pos_y != 0}
    <div style="top: {mouse_pos_y + 40}px; left: {mouse_pos_x + 40}px;">
        <img 
            bind:this={img} 
            style="position: relative; top: -{img ? (img.height/(viewer_height * 1.5))*(image_pos_y) - 125 : 0}px; left: -{img ? (img.width/(viewer_width * 1.5))*(image_pos_x) - 125 : 0}px;" src={$availableMaps.length > 0 ? $map : maps[$map]} alt="map_zoom" />
    </div>
{/if}

<style>
    div {
        position: absolute;
        width: 250px;
        height: 250px;
        overflow-x: hidden;
        overflow-y: hidden;
    }
</style>