<script>
    import {adminStatus} from 'lib/store';
    export let adminDescriptor = null;
    export let bio = "";
    export let visible = false;
</script>

<button on:click={() => {
    visible = true;
}}>
    <span class="material-icons">
        info
    </span>
</button>

{#if visible}
<div class="view">
    <div class="outer">
        <div class="inner">
            <div class="page">
                <div class="bar">
                    <button class="close" on:click={() => {
                        visible = false;
                    }}>
                        <span class="material-icons">
                            close
                        </span>
                    </button>
                </div>
                {#each bio.split('\n') as line}
                    {#if line != ''}
                        <p>{line}</p>
                    {/if}
                {/each}
                {#if $adminStatus && adminDescriptor}
                    <h2>Private Info</h2>
                    {#each adminDescriptor.split("\n") as desc}
                        <p>{desc}</p>
                    {/each}
                {/if}
            </div>
        </div>
    </div>
</div>
{/if}

<style>
    button {
        background: none;
        color: #fff;
        border: none;
        outline: none;
        cursor: pointer;
    }
    .view {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.808);
        z-index: 1;
    }
    .outer {
        width: 100vw;
        height: 100vh;
        text-align: center;
        display: table;
    }
    .inner {
        vertical-align: middle;
        display: table-cell;
    }
    .page {
        box-sizing: border-box;
        background-color: rgb(255, 236, 154);
        color: #000;
        width: 700px;
        display: inline-block;
        padding: 30px;
        max-height: 80vh;
        overflow-y: auto;
    }
    .page::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }
    .page::-webkit-scrollbar-track {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
    }
    .page::-webkit-scrollbar-thumb {
        background-color: #11171a;
        border-radius: 10px;
    }
    p {
        text-align: justify;
    }
    .close {
        color: #000;
        text-align: right;
    }
    .bar {
        text-align: right;
    }
</style>