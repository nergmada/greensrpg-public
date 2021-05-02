<script>
    import Bar from './Bar.svelte';
    import health from './tips/Health.svelte';
    export let stats = {};
    const colours = {
        health: "b90000"
    }
    const tips = {
        health,
    }
</script>
<div class="anchor">
    <table>
        {#each Object.keys(stats) as stat}
            <tr>
                <td class="right">{stat}</td>
                <td>
                    <svelte:component this={tips[stat]} />
                </td>
                <td>
                    <Bar max={stats[stat].max} bind:current={stats[stat].current} color={colours[stat]} type={stat} />
                </td>
            </tr>
        {/each}
    </table>
</div>

<style>
    .anchor {
        display: absolute;
        top: 0;
        left: 0;
    }
    .right {
        font-size: 16px;
        text-align: right;
    }
</style>