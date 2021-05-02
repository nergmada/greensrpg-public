<script>
    export let campaign = {};
</script>

<div on:click>
    <h2>{campaign.name}</h2>
    {#each campaign.description.split('\n') as line}
        <p>{line}</p>
    {/each}
</div>

<style>
    div {
        border: 1px solid #fff;
        margin-top: 50px;
        cursor: pointer;
        padding: 10px;
        box-sizing: border-box;
    }
    div:hover {
        background-color: #222;
    }
</style>