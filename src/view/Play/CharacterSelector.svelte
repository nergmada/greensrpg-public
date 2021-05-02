<script>
    import {connect} from 'lib/player';
    export let id = "";
    $: all_characters = [];
    connect().getCharacters(id, characters => {
        all_characters = characters
    });
</script>
<div class="inner">
    <h2>Select Character</h2>
    <p>Please select a character. The GM may have assigned you a character.</p>
    <div class="scrollable">
        {#each all_characters as character}
            <div on:click={() => {
                window.location.href=`/play?id=${id}&player=${character.player_name}`
            }}>
                <div class="card">
                    <div class="icon half" style="background-color: #{character.color};"></div>
                    <div class="half">
                        <h2>{character.name}</h2>
                        <p>{character.short_description}</p>
                    </div>
                </div>
            </div>
        {/each}
        <div on:click={() => {
            window.location.href=`/play?id=${id}&player=none&skip=true`
        }}>
            <div class="card">
                <div class="icon half" style="background-color: #fff;"></div>
                <div class="half">
                    <h2>Spectator Mode</h2>
                    <p>This allows you to watch the game play (e.g. see maps/logs/NPCs and hear the soundtrack, without being able to interact with the game.</p>
                </div>
            </div>
        </div>
    </div>
</div>


<style>
    .inner {
        max-width: 900px;
        margin: auto;
        padding-top: 10px;
    }
    .icon {
        width: 30px;
        height: 30px;
        border-radius: 15px;
    }
    .half {
        display: inline-block;
        margin-right: 20px;
    }
    .card {
        display: flex;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;
        vertical-align: middle;
        flex: 1 1 auto;
        clear: right;
        border: 1px solid #fff;
        cursor: pointer;
    }
    .scrollable {
        overflow-y: auto;
        max-height: 80vh;
        display: inline-block;
    }
    .scrollable::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }
    .scrollable::-webkit-scrollbar-track {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
    }
    .scrollable::-webkit-scrollbar-thumb {
        background-color: #11171a;
        border-radius: 10px;
    }
</style>