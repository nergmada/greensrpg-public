<script>
    import { slide } from 'svelte/transition';
    import { tweened } from 'svelte/motion';

    export let popNotification = () => {};

    const width = tweened(100, {
		duration: 6000
    });
    $width = 0;

    export let visible = $width > 2;
    
    $: visible = $width > 2;
    $: if (visible) popNotification();
</script>

{#if $width != 0}
    <div class="notification" transition:slide={{ duration: 700 }} style="opacity: {(50-Math.abs($width - 50))/30};">
        <div class="innerglow" style="box-shadow: 0 0 {50-Math.abs($width - 50)}px #ff6600;">
            <p>
                <slot></slot>
            </p>
        </div>
    </div>
{/if}
<style>
    .notification {
        margin-left: 50px;
        margin-right: 50px;
        padding-top: 20px;
        z-index: 2;
        border-radius: 5px;
    }
    p {
        font-size: 30px;
        text-align: center;
        background-color:#000000;
        padding-top: 1rem;
        padding-bottom: 1rem;
        padding-left: 50px;
        padding-right: 50px;
        margin: 0;
    }
</style>