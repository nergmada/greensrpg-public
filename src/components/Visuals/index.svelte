<script>
    import Map from './Map.svelte';
</script>

<div class="outer">
    <div class="inner">
        <Map />
    </div>
</div>

<style>
    .outer {
        width: 100vw;
        height: 100vh;
        display: table;
    }
    .inner {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    }
</style>