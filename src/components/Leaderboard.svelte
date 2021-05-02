<script>
    import Player from './Player';
    import NPC from './NPC';
    import {players, npcs, availableNpcs, adminStatus} from 'lib/store';
    let visible = false;
</script>

<div class="wrapper">
    <div class="scrollable">
        {#if visible === 'players'}
            {#if $players}
                {#each $players as profile}
                    <Player bind:profile={profile} />
                {/each}
            {/if}
        {:else if visible === 'npcs'}
            {#if $npcs}
                {#each $npcs as profile, i}
                    <NPC bind:profile={profile} deleteCallback={$adminStatus ? () => {
                        console.log($npcs);
                        $npcs = $npcs.filter((v, c) => c !== i);
                        console.log($npcs);
                    } : null} />
                {/each}
            {/if}
        {:else if visible === 'availableNpcs' && $adminStatus}
            {#if $availableNpcs}
                {#each $availableNpcs as profile}
                    <NPC bind:profile={profile} addCallback={() => {
                        $npcs = [...$npcs, profile];
                    }} />
                {/each}
            {/if}
        {/if}
    </div>
    <div on:click={() => {
        visible = visible === 'players' ? visible = false : visible = 'players';
    }} class="tab">
        <h2>Players</h2>
    </div>
    <div on:click={() => {
        visible = visible === 'npcs' ? visible = false : visible = 'npcs';
    }} class="tab">
        <h2>NPCs</h2>
    </div>
    {#if $adminStatus}
        <div on:click={() => {
            visible = visible === 'availableNpcs' ? visible = false : visible = 'availableNpcs';
        }} class="tab">
            <h2>Add NPCs</h2>
        </div>
    {/if}
</div>

<style>
    .wrapper {
        position: absolute;
        top: 0;
        left: 0;
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
    .tab {
        border: 1px solid white;
        height: 150px;
        cursor: pointer;
        display: inline-block;
        vertical-align: top;
        background-color: #000;
    }
    .tab > h2 {
        transform: rotate(90deg);
        margin: 0;
        margin-top: 40px;
        text-align: center;
    }
</style>