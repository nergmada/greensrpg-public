<script>
    import PlayerScreen from './PlayerScreen.svelte';
    import CharacterSelector from './CharacterSelector.svelte';
    export let name = "";
    export let id = "";
</script>

{#if name}
    <PlayerScreen />
{:else if id}
    <CharacterSelector id={id} />
{:else}
    <div class="inner">
        <h2>Error</h2>
        <p>No ID for game. Please <a href="/">click here</a> to try again</p>
    </div>
{/if}

<style>
    .inner {
        max-width: 900px;
        margin: auto;
        padding-top: 10px;
    }
</style>