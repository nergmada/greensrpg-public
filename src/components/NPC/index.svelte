<script>
    import Pools from './Pools';
    import Bio from './Bio.svelte';
    import Dropdown from './Dropdown';
    export let addCallback = null;
    export let deleteCallback = null;
    export let profile = {};
    let dropdown = false;
</script>
<div class="border">

    <div class="card">
        <div class="icon half" style="background-color: #{profile.color};"></div>
    <div class="half">
        <h3>{profile.name}</h3>
        <p>Armor: {profile.armor}</p>
        <p>level: {profile.level}</p>
    </div>
    <div class="half">
        <Pools bind:stats={profile.stats} />
    </div>
    <div>
        <Bio bio={profile.bio} adminDescriptor={profile.private_bio} />
        <button on:click={() => {
            dropdown = !dropdown;
        }}>
            <span class="material-icons">
                {dropdown ? "arrow_drop_up" : "arrow_drop_down"}
            </span>
        </button>
        {#if deleteCallback}
            <button on:click={deleteCallback}>
                <span class="material-icons">
                    delete
                </span>
            </button>
        {/if}
        {#if addCallback}
            <button on:click={addCallback}>
                <span class="material-icons">
                    add
                </span>
            </button>
        {/if}
    </div>
</div>
    {#if dropdown}
        <Dropdown bind:inventory={profile.inventory} bind:abilities={profile.abilities} />
    {/if}
</div>

<style>
    .icon {
        width: 30px;
        height: 30px;
        border-radius: 15px;
    }
    .half {
        display: inline-block;
        margin-right: 20px;
    }
    h3, p {
        margin: 0;
    }
    .card {
        display: flex;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;
        vertical-align: middle;
        flex: 1 1 auto;
        clear: right;
    }
    .border {
        border: 1px solid #fff;
        background-color: #000;
    }
    button {
        background: none;
        color: #fff;
        border: none;
        outline: none;
        cursor: pointer;
    }
</style>