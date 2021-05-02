<script>
    import Sound from './Sound.svelte';
    import Intro from './Intro.svelte';
    import Actions from './Actions.svelte';
    import ActionDifficulty from './ActionDifficulty.svelte';
    import HardTasks from './HardTasks.svelte';
    import Easing from './Easing.svelte';
    import Skills from './Skills.svelte';
    import Equipment from './Equipment.svelte';
    import Assets from './Assets.svelte';
    import Effort from './Effort.svelte';
    import Inabilities from './Inabilities.svelte';
    import Combat from './Combat.svelte';
    import Initiative from './Initiative.svelte';
    import Weapons from './Weapons.svelte';
    import Dying from './Dying.svelte';
    import Healing from './Healing.svelte';
    import Experience from './Experience.svelte';
    import Cypher from './Cypher.svelte';
    import Tips from './Tips.svelte';
    import SpecialActions from './SpecialActions.svelte';
    import Enablers from './Enablers.svelte';

    export let hideCallback = () => {};
    const slides = [
        Sound,
        Intro, 
        Actions, 
        ActionDifficulty, 
        HardTasks, 
        Easing, 
        Skills, 
        Equipment,
        Assets,
        Effort,
        SpecialActions,
        Enablers,
        Inabilities,
        Combat,
        Initiative,
        Weapons,
        Dying,
        Healing,
        Experience,
        Cypher,
        Tips
    ];
    let current = 0;
    const skip = (new URLSearchParams(window.location.search)).get('skip');
    let visible = !skip;
    let debounce = false;
</script>

<div class="button" on:click={() => {
    visible = true;
}}>
    <h2>Tutorial</h2>
</div>
{#if visible}
    <div class="outer" on:click={() => {
        if (debounce) return;
        debounce = true;
        if (current < slides.length - 1) current = current + 1;
        else {
            current = 0;
            visible = false;
            hideCallback();
        }
        debounce = false;
    }}>
        <div class="inner">
            <div class="slide">
                <svelte:component this={slides[current]} />
            </div>
        </div>
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