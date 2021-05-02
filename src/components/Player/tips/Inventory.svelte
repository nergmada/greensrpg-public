<script>
    import Tooltip from 'components/Tooltip';
</script>

<Tooltip>
    <p>Inventory represents items you have in your posession, that can make tasks easier.</p>
    <p>The following are codes for each item</p>
    <ul>
        <li><span>E</span>: An item of high value, its tradable value</li>
        <li><span>M</span>: An item of moderate value, its tradable value</li>
        <li><span>W</span>: A weapon, can be used in combat</li>
        <li><span>Hvy</span>: A heavy weapon. Does 6 damage if attack is successful</li>
        <li><span>Med</span>: A medium weapon. Does 4 damage if attack is successful</li>
        <li><span>Lgt</span>: A light weapon. Does 2 damage and makes any attack using this weapon one level easier</li>
    </ul>
</Tooltip>

<style>
    span {
        font-weight: 800;
    }
</style>