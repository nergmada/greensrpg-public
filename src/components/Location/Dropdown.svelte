<script>
    import {adminStatus} from 'lib/store';
    import Descriptor from './Descriptor';
    import NewItem from './NewItem.svelte';
    export let items = [];
    export let adding = null;
</script>

<div class="dropdown">
    <div>
        <h4>Elements</h4>
        <ul>
            {#each items as item}
                <li><Descriptor name={item.name} descriptor={item.description} /></li>
            {/each}
            {#if $adminStatus}
                <li>
                    <button on:click={() => {adding=true}}>Add item</button>
                </li>
            {/if}
        </ul>
    </div>
</div>

{#if adding}
    <NewItem added={(name, description) => {
        items = [
            ...items,
            {
                name,
                description
            }
        ]
        adding = false;
    }} close={() => { adding = false; }} />
{/if}

<style>
    .dropdown {
        display: flex;
        padding: 20px;
        box-sizing: border-box;
    }
</style>