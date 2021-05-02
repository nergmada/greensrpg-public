<script>
    import {adminStatus} from 'lib/store';
    export let max = 0;
    export let current = 0;
    export let color = "b90000";
</script>

<div class="max" style="width: {10*max}px; background-color: #{color}4d;">
    <div style="width : {10*current}px; background-color: #{color}; position: relative; height: 20px;">
        <div style="width: {10*max}px; position: absolute; top: 0; text-align: center;">
            {#if $adminStatus}
                <p class="sub" on:click={() => {
                    if (current > 0) current = current - 1;
                }}>-</p>
            {/if}
            <p>{current}/{max}</p>
            {#if $adminStatus}
                <p class="add" on:click={() => {
                    if (current < max) current = current + 1;
                }}>+</p>
            {/if}
        </div>
    </div>
</div>

<style>
    .sub {
        float: left;
        cursor: pointer;
    }
    .add {
        float: right;
        cursor: pointer;
    }
    div {
        display: inline-block;
    }
    .max {
        border: 1px solid #000;
    }
    p {
        margin: 0;
        text-align: center;
        font-size: 16px;
        display: inline-block;
    }
</style>