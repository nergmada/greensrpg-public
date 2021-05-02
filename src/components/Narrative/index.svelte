<script>
    import {audioManager, title_music} from 'lib/store';
    export let narrative = "";
    export let endCallback = () => {};
    
    let lines = narrative.split('\n').filter(l => l !== '');
    
    import Block from './Block.svelte';
    let current = 0;
    if ($title_music) {
        $audioManager.addAudio($title_music);
        $audioManager.play($title_music);
    } else {
        $audioManager.play('narrative_intro');
    }
</script>

{#if current < lines.length}
    <div on:click={() => { 
        if (current < lines.length - 1) current = current + 1;
        else {
            $audioManager.fade_and_stop('narrative_intro', endCallback);
        } 
    }}>
        <div class="inner">
            {#key current}
                <Block line={lines[current]} />
            {/key}
        </div>
    </div>
{/if}
<style>
    div {
        max-width: 800px;
        margin: auto;
        display: table;
        height: 100vh;
    }
    .inner {
        display: table-cell;
        vertical-align: middle;
    }
</style>

