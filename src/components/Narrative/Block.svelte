<script>
    import {onMount} from 'svelte';
    import {tweened} from 'svelte/motion';
    export let line = "";

    const currentLetter = tweened(0, {
        duration: line.length * 50,
    })
    $currentLetter = line.length;
</script>

<p>{line.slice(0, $currentLetter-4 > 0 ? $currentLetter-4 : 0)}<span class:shadow={$currentLetter != line.length}>{line.slice($currentLetter-4, $currentLetter+1)}</span></p>

{#if $currentLetter == line.length}
    <p class="center">(Click to continue)</p>
{/if}

<style>
    p {
        font-family: 'Calligraffitti', cursive;
        font-size: 30px;
        text-align: justify;
    }
    .shadow {
        text-shadow: #d35400 0 0 5px, #d35400 0 0 10px, #d35400 0 0 20px;
    }
    .center {
        text-align: center;
    }
</style>