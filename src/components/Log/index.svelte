<script>
    import {afterUpdate} from 'svelte';
    import {log, me, adminStatus, instanceId} from 'lib/store';
    import {connect as adminConn } from 'lib/admin';
    import {connect as playerConn } from 'lib/player';

    import Message from './Message.svelte';
    let value = "";

    const handler = () => {
        if ($adminStatus) {
            adminConn().message($instanceId, value);
        } else {
            playerConn().message($instanceId, value);
        }
        value = "";
    }
    let foot = null;
    afterUpdate(() => {
        foot.scrollIntoView();
    })
</script>

<div class="main">
    <div class="padded">
        {#if $log}
            {#each $log as m}
                <Message player={m.name} message={m.message} time={m.time} />
            {/each}
        {/if}
        <span id="bottom" bind:this={foot}></span>
    </div>
    {#if $me || $adminStatus}
        <div class="padded">
            <textarea bind:value placeholder="Message..."></textarea>
            <button disabled={value.length === 0} on:click={handler}>Send</button>
        </div>
    {/if}
</div>

<style>
    .main {
        position: absolute;
        bottom: 0;
        right: 0;
        max-height: 80vh;
        width: 20vw;
        background: #000;
    }
    .padded {
        padding: 10px;
        box-sizing: border-box;
        border: 1px solid #fff;
        max-height: 60vh;
        overflow-y: auto;
    }
    .padded::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }
    .padded::-webkit-scrollbar-track {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
    }
    .padded::-webkit-scrollbar-thumb {
        background-color: #11171a;
        border-radius: 10px;
    }
    textarea {
        overflow-y: auto;
        width: 100%;
        height: 40px;
        background: none;
        outline: none;
        color: #fff;
    }
</style>
