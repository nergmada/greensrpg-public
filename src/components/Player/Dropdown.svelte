<script>
    import {adminStatus} from 'lib/store';
    import Descriptor from './Descriptor';
    import Inventory from './tips/Inventory.svelte';
    import Abilities from './tips/Abilities.svelte';
    import NewItem from './NewItem.svelte';
    export let inventory = [];
    export let abilities = [];
    export let adding = null;
</script>

<div class="dropdown">
    <div>
        <h4>Inventory <Inventory /></h4>
        <ul>
            {#each inventory as item}
                <li><Descriptor name={item.name} descriptor={item.description} /></li>
            {/each}
            {#if $adminStatus}
                <li>
                    <button on:click={() => {adding="inventory"}}>Add item</button>
                </li>
            {/if}
        </ul>
    </div>
    <div>
        <h4>Abilities <Abilities /></h4>
        <ul>
            <ul>
                {#each abilities as item}
                    <li><Descriptor name={item.name} descriptor={item.description} /></li>
                {/each}
                {#if $adminStatus}
                    <li>
                        <button on:click={() => {adding="abilities"}}>Add item</button>
                    </li>
                {/if}
            </ul>
        </ul>
    </div>
</div>

{#if adding}
    <NewItem added={(name, description) => {
        if (adding == 'inventory') {
            inventory = [
                ...inventory,
                {
                    name,
                    description
                }
            ]
        } else {
            abilities = [
                ...abilities,
                {
                    name,
                    description
                }
            ]
        }
        adding = null;
    }} close={() => { adding = null; }} />
{/if}

<style>
    .dropdown {
        display: flex;
        padding: 20px;
        box-sizing: border-box;
    }
</style>