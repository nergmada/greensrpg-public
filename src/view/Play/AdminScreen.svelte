<script>
    import Clock from 'components/Clock';
    import Log from 'components/Log';
    import Dice from 'components/Dice.svelte';
    import Leaderboard from 'components/Leaderboard';
    import Visuals from 'components/Visuals';
    import Settings from 'components/AdminSettings';
    import Location from 'components/Location';
    import AvailableLocationsList from 'components/Location/Available.svelte';
    import {connect} from 'lib/admin';
    import {
        players, 
        time, 
        instanceId, 
        log, 
        map, 
        acts,
        availableMaps,
        availableNpcs, 
        author,
        title,
        npcs,
        location,
        availableLocations,
        title_image,
        title_music
    } from 'lib/store';

    export let id = null;
    let notFound = false;
    connect().getInstance(id, inst => {
        if (!inst) { 
            notFound = true;
            return;
        }
        $players = inst.campaign.player_characters;
        $title = inst.campaign.name;
        $author = inst.campaign.author;
        $title_image = inst.campaign.title_image;
        $title_music = inst.campaign.intro;
        $time = inst.campaign.time;
        $map = inst.campaign.current_map;
        $availableMaps = inst.campaign.maps;
        $instanceId = inst.instance_id;
        $log = inst.log;
        $npcs = inst.npcs;
        $acts = inst.campaign.acts;
        $availableNpcs = inst.campaign.npcs;
        $location = inst.current_location;
        $availableLocations = inst.campaign.locations;
        connect().listenFor('log_update', data => {
            $log = data;
        });
        connect().listenFor('map_update', data => {
            $map = data;
        });
    })
</script>
{#if !notFound}
    <AvailableLocationsList />
    <Location />
    <Clock />
    <Leaderboard />
    <Dice />
    <Log />
    <Visuals />
    <Settings />
{:else}
    <div class="inner">
        <h2>Error</h2>
        <p>The given ID could not be found, campaigns are typically only stored for 24 hours. Please <a href="/">click here</a> to create a new campaign</p>
    </div>
{/if}

<style>
    .inner {
        max-width: 900px;
        margin: auto;
        padding-top: 10px;
    }
</style>