<script>
    import {volume, instanceId} from 'lib/store';
    import {pushNotification, pushError} from 'lib/notifications';
    import {connect} from 'lib/admin';
    import save_link from 'lib/admin/save';
    let current = Math.round(100 * $volume);
    $: {
        $volume = current / 100;
    }
</script>

<div class="inner">
    <h4>Options:</h4>
    <button on:click={() => {
        document.documentElement.requestFullscreen();
    }}>
        <span class="material-icons">
            fullscreen
        </span>
    </button>
    <button on:click={() => {
        connect().getInstance($instanceId, data => {
            const file = save_link(data);
        });
    }}>
        <span class="material-icons">
            save_alt
        </span>
    </button>
    <button on:click={() => {
        navigator.clipboard.writeText(`${window.location.host}/play?id=${$instanceId}`);
        pushNotification('Copied share link to clipboard');
    }}>
        <span class="material-icons">
            share
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