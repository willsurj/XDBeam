<script>
    import Logo from '../../public/assets/logoColour.svg'
    import LogIn from './LogIn.svelte';
</script>

<header>
    <Logo width="200px" style="fill:white" />
    <LogIn />
</header>

<style>
    header {
        width: 100%;
        position: sticky;
        top: 0;
        background: var(--middle);
        background: linear-gradient(-150deg, rgba(34, 181, 115, 1) 0%, rgba(39, 141, 193, 1) 100%);
        filter: drop-shadow(0px 0px 8px var(--middle));
        display: flex;
        padding: 1em;
        margin: 0 auto;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
    }
</style>