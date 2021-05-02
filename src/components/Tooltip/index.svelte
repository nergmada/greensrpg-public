<script>
    import { scrollY } from './scrolly';

    export let icon = "error_outline";
    let showTip = false;
    let tipdiv = null;
    $: positionX = 0;
    $: positionY = 0;
</script>

<svelte:window bind:scrollY={$scrollY} />

<i
    class="material-icons" 
    on:mousemove={(event) => {
        showTip = true;
        positionX = event.pageX + 10;
        if (positionX + 250 > window.innerWidth) {
            positionX = event.pageX - 260;
        }
        positionY = event.pageY - window.scrollY + 10;
    }}
    on:mouseout={() => showTip = false} 
>{icon}</i> 

{#if showTip}
    <div bind:this={tipdiv} class="tooltip" style="top: {positionY}px; left: {positionX}px;">
        <slot></slot>
    </div>
{/if}

<style>
    .material-icons {
        vertical-align: middle;
    }
    .tooltip {
        position: fixed;
        background-color: #ffea8dee;
        z-index: 1;
        font-size: 15px;
        margin: 0;
        color: #000;
    }
    div {
        padding: 5px;
        border-radius: 2px;
        max-width: 300px;
    }
</style>