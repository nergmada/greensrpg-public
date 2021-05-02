<script>
    import {time, adminStatus} from 'lib/store';
    import { getTime } from 'lib/time';
    $: currentTime = new Date($time * 1000);
</script>
<div class="main">
    <div>
        <h2>{currentTime.toLocaleDateString('en-GB', { 
            timeZone: "Europe/London",
            dateStyle: "long"
        })}</h2>
        <h3>{getTime(currentTime)}</h3>
    </div>
    {#if $adminStatus}
        <div>
            <button on:click={() => {
                $time += 900
            }}>+15</button>
            <button on:click={() => {
                $time += 1800
            }}>+30</button>
            <button on:click={() => {
                $time += 3600
            }}>+60</button>
        </div>
    {/if}
</div>

<style>
    .main {
        position: absolute;
        top: 0;
        right: 0;
        border: 1px solid #fff;
        padding: 10px;
        text-align: center;
        background: #000;
    }
    h3, h4 {
        margin-top: 5px;
        margin-bottom: 5px;
    }
</style>