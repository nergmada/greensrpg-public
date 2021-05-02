<script>
    //import TitleCard from './components/TitleCard.svelte';
    //import Narrative from './components/Narrative';
    import PlayerScreen from './view/PlayerScreen.svelte';
    import AdminScreen from './view/Play/AdminScreen.svelte';
    import {name, adminStatus } from 'lib/store';
    
    const params = (new URLSearchParams(window.location.search));
    const admin = params.get('admin');
    const player = params.get('player');
    const id = params.get('id');
    if (admin) $name = admin;
    else $name = player;

    
    if (admin) $adminStatus = true;
</script>

<div>
    {#if admin}
        <AdminScreen />
    {:else if player && id}
        <PlayerScreen />
    {:else}
        <div class="tbl">
            <div class="center">
                <div class="gutter">
                    <h2>Error</h2>
                    <p>No player name or game ID provided. This link is incorrect and so we cannot connect you to the game. Please request the link again</p>
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    div {
        display: contents;
    }
    .tbl {
        display: table;
        width: 100%;
        height: 100vh;
    }
    .center {
        display: table-cell;
        vertical-align: middle;
        width: 100%;
    }
    .gutter {
        display: block;
        max-width: 900px;
        margin: auto;
    }
    h2 {
        font-size: 60px;
    }
    p {
        font-size: 30px;
    }
</style>