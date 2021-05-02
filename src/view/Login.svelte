<script>
    import {logo} from 'lib/assets/images';
    import upload from 'lib/upload';
    let type = 'player';
    let name = '';
    let code = '';
    let file = null;
    $: console.log(file);
</script>

<div class="inner">
    <div class="banner">
        <img src={logo} alt="green's rpg logo" />
        <h1>Green's RPG</h1>
    </div>
    <h2>Login</h2>
    <p>Welcome to Green's RPG. The home of RP games by Adam Green. To start a game or join one, please select from the options below</p>
    <p>To create your own campaign, please see our editing tool. <a href="https://github.com/nergmada/greensrpg-editor">Green's RPG Editor</a></p>
    <div class="login">
        <input type="radio" id="player" bind:group={type} name="login" value="player">
        <label for="player">Player</label>
        {#if type === 'player'}
            <div class="fields">
                <input type="text" placeholder="code" bind:value={code} />
            </div>
            <button disabled={code.length !== 64} on:click={() => {
                window.location.href=`/play?id=${code}`
            }}>Start</button>
        {/if}
    </div>
    <div class="login">
        <input type="radio" id="gm" bind:group={type} name="login" value="gm">
        <label for="gm">Game Master (GM)</label>
        {#if type === 'gm'}
            <div class="fields">
                <input type="text" placeholder="name" bind:value={name} />
            </div>
            <button disabled={name.length === 0} on:click={() => {
                window.location.href = `/campaigns?admin=${name}`;
            }}>Start</button>
        {/if}
    </div>
    <div class="login">
        <input type="radio" id="upload" bind:group={type} name="login" value="upload">
        <label for="upload">Upload Custom Campaign</label>
        {#if type === 'upload'}
            <div class="fields">
                <input type="text" placeholder="name" bind:value={name} />
                <input style="display: block;" type="file" bind:this={file} />
            </div>
            <button disabled={name.length === 0 || !file || !file.files || file.files.length === 0} on:click={() => {
                upload(file.files[0]).then(() => {
                    window.location.href = `/campaigns?admin=${name}`;
                });
            }}>Upload</button>
        {/if}
    </div>
    <div class="login">
        <input type="radio" id="support" bind:group={type} name="login" value="support">
        <label for="support">Support Us!</label>
        {#if type === 'support'}
            <div style="padding: 20px;">
                <a href="https://www.buymeacoffee.com/greensrpg">Please Buy me a Pizza</a>
            </div>
        {/if}
    </div>
</div>

<style>
    .inner {
        max-width: 900px;
        margin: auto;
        padding-top: 10px;
    }
    .login {
        border: 1px solid #fff;
        padding: 10px;
    }
    .banner {
        display: flex;
        align-items: center;
        justify-content: center
    }
    .banner > h1 {
        display: inline-block;
    }
    .banner > img {
        width: 20%;
    }
    input {
        display: inline-block;
    }
    label {
        font-size: 30px;
    }
    h1 {
        font-size: 60px;
    }
    h2 {
        font-size: 50px;
    }
    h3 {
        font-size: 40px;
    }
    a {
        color: rgb(41, 212, 255);
        text-decoration: none;
    }
</style>