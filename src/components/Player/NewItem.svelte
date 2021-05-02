<script>
    export let added = (name, description) => {};
    export let close = () => {};
    let name = "";
    let description = "";
</script>

<div class="view">
    <div class="outer">
        <div class="inner">
            <div class="page">
                <div class="bar">
                    <button class="close" on:click={close}>
                        <span class="material-icons">
                            close
                        </span>
                    </button>
                </div>
                <input bind:value={name} placeholder="Name" />
                <textarea bind:value={description} placeholder="Description" />
                <button on:click={() => added(name, description)}>Add</button>
            </div>
        </div>
    </div>
</div>

<style>
    input, textarea {
        width: 100%;

    }
    button {
        background: none;
        color: #000;
        border: none;
        outline: none;
        cursor: pointer;
    }
    .view {
        width: 100vw;
        height: 100vh;
        position: absolute;
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
    }
    .close {
        color: #000;
        text-align: right;
    }
    .bar {
        text-align: right;
    }
</style>