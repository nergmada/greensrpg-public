<script>
    import Bar from './Bar.svelte';
    import might from './tips/Might.svelte';
    import speed from './tips/Speed.svelte';
    import intellect from './tips/Intellect.svelte';
    import luck from './tips/Luck.svelte';
    import exp from './tips/Exp.svelte';
    export let stats = {};
    const colours = {
        might: "b90000",
        speed: "e8c400",
        intellect: "30a6ff",
        luck: "00aa00",
        exp: "4d0099"
    }
    const tips = {
        might,
        speed,
        intellect,
        luck,
        exp
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