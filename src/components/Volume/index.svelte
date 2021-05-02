<script>
    import {volume} from 'lib/store';
    import Bar from './Bar.svelte';
    let current = Math.round(100 * $volume);
    $: {
        $volume = current / 100;
    }
</script>

<div class="inner">
    <h4>Volume:</h4>
    <Bar max={100} bind:current />
    <button on:click={() => {
        document.documentElement.requestFullscreen();
    }}>
        <span class="material-icons">
            fullscreen
        </span>
    </button>
    <button on:click={() => {
        current = 0;
    }}>
        <span class="material-icons">
            volume_off
        </span>
    </button>
</div>


<style>
    .inner {
        position: absolute;
        bottom: 0;
        left: 200px;
        z-index: 1;
        padding: 10px;
        box-sizing: border-box;
        border: 1px solid #fff;
        background-color: #000;
    }
    h4 {
        margin-top: 0;
    }
    button {
        background: none;
        color: #fff;
        border: none;
        outline: none;
        cursor: pointer;
    }
</style>