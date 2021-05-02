<script>
    import Tooltip from 'components/Tooltip';
    export let name = "";
    export let descriptor = "";
    let splitDescriptor = descriptor.split("\n");
</script>

<p>{name}</p>
<Tooltip>
    {#each splitDescriptor as desc}
        <p>{desc}</p>
    {/each}
</Tooltip>
<style>
    p {
        display: inline-block;
        margin: 0;
    }
</style>