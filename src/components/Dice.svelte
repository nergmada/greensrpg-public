<script>
    import {connect} from 'lib/player';
    import {instanceId, audioManager, me} from 'lib/store';
    let d6 = 6;
    connect().listenFor('six_roll', val => {
        d6 = val;
    })
    let d20 = 20;
    connect().listenFor('twenty_roll', val => {
        d20 = val;
        if (val > 16) {
            $audioManager.play('good_dice');
        }
        if (val == 1) {
            $audioManager.play('bad_dice');
        }
    })
    let d100 = 99;
    connect().listenFor('hundred_roll', val => {
        d100 = val;
    })
</script>

{#if $me}
    {#key $instanceId}
        <div class="bottom">
            <div class="dicebar">
                <div on:click={() => connect().rollSix($instanceId)} class="d6">
                    <p>{d6}</p>
                </div>
                <div on:click={() => connect().rollTwenty($instanceId)} class="d20">
                    <p>{d20}</p>
                </div>
                <div on:click={() => connect().rollHundred($instanceId)} class="d100">
                    <p>{d100}</p>
                </div>
            </div>
        </div>
    {/key}
{/if}
    
<style>
    .bottom {
        position: absolute;
        bottom: 0;
        width: 100vw;
    }
    .dicebar {
        width: 600px;
        margin: auto;
        padding: 40px;
        display: flex;
        justify-content: space-around;
        background-color: #2e2e2e;
    }
    .d6, .d20, .d100 {
        width: 50px;
        height: 50px;
        background: #009900;
        vertical-align: middle;
        padding: 10px;
        box-sizing: border-box;
        box-shadow: inset 2px 3px 5px rgba(0, 0, 0, 0.582);
        display: inline-block;
    }
    .d6:hover, .d20:hover, .d100:hover {
        box-shadow: #009900 0 0 5px, #009900 0 0 10px, #009900 0 0 20px;
    }
    p {
        text-align: center;
        font-size: 30px;
        margin: 0;
    }
</style>