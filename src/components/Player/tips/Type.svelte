<script>
    import Tooltip from 'components/Tooltip';
    export let type = "";
</script>

<Tooltip>
    {#if type.toLowerCase() == 'speaker'}
        <p>The speaker is a role less oriented to combat and more suited to negotiation and bartering</p>
        <p>As a speaker, your role is to glean information, gain insight, and avoid physical confrontation in favour of skillful manipulation</p>
        <p>Character References: Professor Xavier, Han Solo, Nick Fury, Dumbledore</p>
    {:else if type.toLowerCase() == 'adept'}
        <p>The adept is a magical role, in which you have certain telekinetic, telepathic or other metaphysical abilities</p>
        <p>This role is one of mixed combat or non-combat, depending on how your abilities have been configured you may be better suited to manipulating people and tricking them in order to avoid combat</p>
        <p>Or using your abilities to attack enemies, or indeed aid and defend your companions whilst they are in combat</p>
        <p>Character References: Neo, Literally any Jedi, Pretty much anyone in movie Push</p>
    {:else if type.toLowerCase() == 'explorer'}
        <p>The explorer is a mixed intellectual/combat role, you are naturally geared towards combat but not necessarily through brute force</p>
        <p>Explorers are tactful, as well as intellectual. They are problem solvers and have both academic and practical skills</p>
        <p>Character References: Lara Croft, Indiana Jones, maybe Wolverine?</p>
    {:else if type.toLowerCase() == 'warrior'}   
        <p>The warrior is a skilled fighter and well suited to any kind of combat challenge. If you enter direct combat, warriors are best used as tanks</p>
        <p>Able to absorb more damage than the other classes as well as carrying weapons capable of dealing far more damage, a warrior is a combat role, but do have their uses outside combat</p>
        <p>Character References: The short one, but not the skinny one, the fat bearded one from Lord of the Rings</p>
    {/if}
</Tooltip>