<script>
    import {view, notifications, errors} from 'lib/store';
    import Login from './view/Login.svelte';
    import Campaigns from './view/Campaigns.svelte';
    import Play from './view/Play';
    import Errors from './components/Errors';
</script>

<Errors bind:notifications={$notifications} bind:errors={$errors} />
{#if $view === '/'}
    <Login />
{:else if $view === '/campaigns'}
    <Campaigns />
{:else if $view === '/play'}
    <Play />
{/if}