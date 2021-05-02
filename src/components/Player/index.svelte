<script>
    import Pools from './Pools';
    import Bio from './Bio.svelte';
    import Dropdown from './Dropdown';
    import Images from './Images.svelte';
    import Edge from './tips/Edge.svelte';
    import Type from './tips/Type.svelte';
    import Effort from './tips/Effort.svelte';
    import Armor from './tips/Armor.svelte';
    export let profile = {};
    let dropdown = false;
    let images = null;
</script>

<Images bind:images />
<div class="border">

    <div class="card">
        <div class="icon half" style="background-color: #{profile.color};"></div>
    <div class="half">
        <h3>{profile.name}</h3>
        <p>Type<Type type={profile.type} />: {profile.type}</p>
        <p>Tier: {profile.tier}</p>
        <p>Effort <Effort />: {profile.effort}</p>
        <p>Armour <Armor />: {profile.armor}</p>
        <p>Edge<Edge/>: {profile.edge.might}M, {profile.edge.speed}S, {profile.edge.intellect}I</p>
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
        {#if profile.images}
            <button on:click={() => {
                images = profile.images;
            }}>
                <span class="material-icons">
                    collections
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