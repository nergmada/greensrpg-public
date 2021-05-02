<script>
    export let images = null;
    let current = 0;
</script>

{#if images}
    <div class="outer">
        <div class="inner">
            <img src={images[current]} alt="illustration" on:click={() => images = null} />
            <p>Click image to close</p>
            <div>
                {#if current > 0}
                    <button on:click={() => {
                        current = current - 1;
                    }}>
                        <span class="material-icons">
                            chevron_left
                        </span>
                    </button>
                {/if}
                {#if current < images.length - 1}
                    <button on:click={() => {
                        current = current + 1;
                    }}>
                        <span class="material-icons">
                            chevron_right
                        </span>
                    </button>
                {/if}
            </div>
        </div>
    </div>
{/if}

<style>
    .outer {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: #000000;
        display: table;
        z-index: 1;
    }
    .inner {
        vertical-align: middle;
        display: table-cell;
        text-align: center;
    }
    img {
        max-width: 50vw;
        max-height: 90vh;
    }
</style>