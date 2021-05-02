<script>
    import Credits from 'components/Credits';
    import {audioManager, acts} from 'lib/store';
    $audioManager.play('intro');
    export let act = 1;
    let visible = true;
    if (act !== 4) {
        const hide = () => {
            visible = false;
            document.removeEventListener('click', hide);
        }
        document.addEventListener('click', hide);
    }
    console.log($acts);
</script>
{#if visible && $acts && $acts.length > 0} 
    <div class="outer">
        <div class="inner">
            <h2>Act {act}:</h2>
            <h1>{$acts[act-1]}</h1>
            <p>(click to continue)</p>
        </div>
    </div>
{:else if visible && act !== 4}
    <div class="outer">
        <div class="inner">
            {#if act === 1}
                <h2>Act I:</h2>
                <h1>A Scream in the Night</h1>
            {:else if act === 2}
                <h2>Act II:</h2>
                <h1>A Tale as Old as Time</h1>
            {:else if act === 3}
                <h2>Act III:</h2>
                <h1>A Mother's Love</h1>
            {/if}
            <p>(click to continue)</p>
        </div>
    </div>
{:else if visible}
    <Credits />
{/if}

<style>
    .outer {
        width: 100vw;
        height: 100vh;
        text-align: center;
        display: table;
        position: absolute;
        top: 0;
        left: 0;
    }
    h2, p {
        font-size: 40px;
        text-shadow: 5px 5px 5px #000;
    }
    h1 {
        font-size: 80px;
        text-shadow: 10px 10px 10px #000;
    }
    .inner {
        vertical-align: middle;
        display: table-cell;
    }
</style>