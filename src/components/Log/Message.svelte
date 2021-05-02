<script>
    import {players} from 'lib/store';
    import {getTime, getDate} from 'lib/time';
    export let player = "";
    export let message = "";
    export let time = 0;
    const playerData = $players.find(v => player.includes(v.player_name));
</script>

<div>
    <p>
        <span style="color: #{playerData ? playerData.color : 'fff'};">{player} [{getDate(new Date(time * 1000))}, {getTime(new Date(time * 1000))}]</span>: {message}
    </p>
</div>

<style>
    span {
        font-weight: 800;
    }
    div {
        width: 100%;
    }
</style>