<script>
    import {name} from 'lib/store';
    import Admin from './Admin.svelte';
    import Player from './Player.svelte';
    const params = (new URLSearchParams(window.location.search));
    let admin = params.get('admin');
    let player = params.get('player');
    if (admin) $name = admin;
    else if (player) $name = player;

    let campaign_id = params.get('campaign');
    let id = params.get('id');
</script>

{#if admin}
    <Admin name={admin} campaign_id={campaign_id} id={id} />
{:else if id}
    <Player name={player} id={id} />
{:else}
    <div class="inner">
        <h2>Error</h2>
        <p>No name was supplied for the Game Master (GM) or ID for game. Please <a href="/">click here</a> to try again</p>
    </div>
{/if}

<style>
    .inner {
        max-width: 900px;
        margin: auto;
        padding-top: 10px;
    }
</style>