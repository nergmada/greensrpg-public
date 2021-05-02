<script>
    import Clock from 'components/Clock';
    import Log from 'components/Log';
    import Dice from 'components/Dice.svelte';
    import Leaderboard from 'components/Leaderboard';
    import Visuals from 'components/Visuals';
    import Player from 'components/Player';
    import Tutorial from 'components/Tutorial';
    import Location from 'components/Location';
    import Narrative from 'components/Narrative';
    import TitleCard from 'components/TitleCard.svelte';
    import Volume from 'components/Volume';
    import Act from 'components/Act.svelte';
    import {
        players, 
        time, 
        instanceId, 
        log, 
        map, 
        acts,
        availableMaps,
        npcs, 
        availableNpcs,
        me,
        location,
        act,
        title,
        author,
        title_image,
        title_music,
    } from 'lib/store';
    import {connect} from 'lib/player';
    
    
    const id = (new URLSearchParams(window.location.search)).get('id');
    const skip = (new URLSearchParams(window.location.search)).get('skip');
    if (id) {
        connect().getInstance(id, inst => {
            $players = inst.campaign.player_characters;
            $time = inst.campaign.time;
            $map = inst.campaign.current_map;
            $title = inst.campaign.name;
            $title_image = inst.campaign.title_image;
            $title_music = inst.campaign.intro;
            $author = inst.campaign.author;
            $availableMaps = inst.campaign.maps;
            $acts = inst.campaign.acts;
            $instanceId = inst.instance_id;
            $log = inst.log;
            $npcs = inst.npcs;
            $availableNpcs = inst.campaign.npcs;
            $location = inst.current_location;
            connect().listenFor('player_data_update', data => {
                $players = data;
            });
            connect().listenFor('time_update', data => {
                $time = data;
            });
            connect().listenFor('log_update', data => {
                $log = data;
            });
            connect().listenFor('map_update', data => {
                $map = data;
            });
            connect().listenFor('npcs_update', data => {
                $npcs = data;
            });
            connect().listenFor('location_update', data => {
                $location = data;
            });
        })
    }
    let stage = 'tutorial';
</script>
<Volume />
{#if !skip}
    {#if stage === 'tutorial'}
        <Tutorial hideCallback={() => {
            stage = 'narrative';
        }} />
    {:else if stage == 'narrative' && $me}
        <Narrative narrative={$me.bio} endCallback={() => {
            stage = 'title';
        }} />
    {:else if stage === 'title' || !$me}
        <TitleCard endCallback={() => {
            window.location = `${window.location}&skip=true`
        }} />
    {:else}
        <h1>Loading...</h1>
    {/if}
{:else}
    {#if $me}
        <div class="outer">
            <div class="inner">
                <Player profile={$me} />
            </div>
        </div>
    {/if}
    {#key $act}
        <Act act={$act} />
    {/key}
    <Location />
    <Clock />
    <Leaderboard />
    <Dice />
    <Log />
    <Visuals />
    <Tutorial />
{/if}

<style>
    .outer {
        text-align: center;
        width: 100%;
        position: absolute;
        top: 0;
    }
    .inner {
        width: 800px;
        display: inline-block;
        margin: auto;
        text-align: initial;
    }
</style>