<script>
    import Error from './Error.svelte';
    import Notification from './Notification.svelte';

    export let errors = [];
    export let notifications = [];

    const dropError = () => {
        errors = errors.splice(1);
    }

    const dropNotification = () => {
        notifications = notifications.splice(1);
    }
</script>

<div>
    {#each errors as error}
        <Error popError={dropError}>
            {error}
        </Error>
    {/each}

    {#each notifications as notification}
        <Notification popNotification={dropNotification}>
            {notification}
        </Notification>
    {/each}
</div>

<style>
    div {
        position: fixed;
        width: 100vw;
        top: 0;
        left: 0;
        z-index: 1;
    }
</style>