<script>
    import IoLogoGithub from 'svelte-icons/io/IoLogoGithub.svelte'
</script>

<footer>
    <p>Made by Will Surjenko for the <a href="https://topblockchainstartup.com/"><strong>Next Top Blockchain
                Startup</strong> Hackathon</a></p>
    <a class="gh" href="https://github.com/willsurj/XDBeam">
        <IoLogoGithub />
    </a>
</footer>

<style>
    footer {
        width: 100%;
        background-color: var(--middle-dark);
        color: white;
        margin-top: auto;
        filter: drop-shadow(0px -1px 6px rgb(14, 14, 14));
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 1.2em 2em;
        box-sizing: border-box;
    }

    a {
        color: white;
        text-decoration: none;
    }

    .gh {
        height: 2em;
        width: 2em;
    }
</style>