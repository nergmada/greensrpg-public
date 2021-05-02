<script>
    import {audioManager, title, author, title_image} from 'lib/store';
    import {background} from 'lib/assets/images';
    $audioManager.play('intro');
    export let endCallback = () => {};

    document.addEventListener('click', endCallback);
    console.log($title);
    console.log($author);
</script>
<div class="outer" style="background-image: url({$title_image ? $title_image : background});">
    <div class="inner">
        <h2>{$author ? `${$author}'s` : "Adam Green's"}</h2>
        <h1>{$title ? $title : "The Devil's Punchbowl"}</h1>
    </div>
</div>

<style>
    .outer {
        width: 100vw;
        height: 100vh;
        text-align: center;
        display: table;
        background-size: cover;
    }
    h2 {
        font-size: 40px;
        text-shadow: 5px 5px 5px #000;
    }
    h1 {
        font-size: 80px;
        text-shadow: 10px 10px 10px #000;
    }
    .inner {
        vertical-align: middle;
        display: table-cell;
    }
</style>