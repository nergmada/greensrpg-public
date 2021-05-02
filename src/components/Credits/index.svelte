<script>
    import { fade } from 'svelte/transition';
    import Author from './Author.svelte';
    import System from './System.svelte';
    import Audio from './Audio.svelte';
    import Audio2 from './Audio2.svelte';
    import Audio3 from './Audio3.svelte';
    import Audio4 from './Audio4.svelte';


    export let hideCallback = () => {};
    const slides = [
        Author,
        System,
        Audio,
        Audio2,
        Audio3,
        Audio4
    ];
    let current = 0;
    let visible = true;
    setInterval(() => {
        if (current < slides.length - 1) current = current + 1;
        else {
            current = 0;
            visible = false;
            hideCallback();
        }
    }, 10000);
    let debounce = false;
</script>
{#if visible}
    <div class="outer">
        {#key current}
            <div class="fullsize">
                <div class="inner" out:fade="{{duration: 1000}}" in:fade="{{delay: 1000, duration: 1000}}">
                    <div class="slide">
                        <svelte:component this={slides[current]}  />
                    </div>
                </div>
            </div>
        {/key}
    </div>
{/if}


<style>
    .outer {
        width: 100vw;
        height: 100vh;
        text-align: center;
        display: table;
        position: absolute;
        top: 0;
        left: 0;
        background: #000;
        z-index: 1;
    }
    .fullsize {
        width: 100vw;
        height: 100vh;
        text-align: center;
        display: table;
        position: absolute;
        top: 0;
        left: 0;
    }
    .inner {
        vertical-align: middle;
        display: table-cell;
    }
    .slide {
        text-align: justify;
        width: 800px;
        display: inline-block;
        font-size: 30px;
        -webkit-user-select: none;
        -moz-user-select: none;
    }
    .button {
        position: absolute;
        display: inline-block;
        bottom: 0;
        left: 0;
        cursor: pointer;
        padding: 20px;
        box-sizing: border-box;
        border: 1px solid white;
        background-color: #000;
    }
    h2 {
        margin: 0;
    }
</style>