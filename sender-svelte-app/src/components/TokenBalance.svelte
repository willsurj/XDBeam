<script>
    export let asset_type;
    export let balance;
    export let asset_code;

    const asset = (asset_type === "native" ? "XDB" : asset_code);
    const balFloat = parseFloat(balance)
    const balanceRounded = (balFloat < 1 ? balFloat.toFixed(4) : balFloat < 10 ? balFloat.toFixed(4) : balFloat < 1000 ?
        balFloat.toFixed(2) : balFloat.toFixed(0))
</script>

<div class="container">
    <div>{asset}</div>
    <div>{balanceRounded}</div>
</div>

<style>
    div {
        display: inline;
    }


    .container {
        width: 80%;
        background-color: var(--blue);
        color: white;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.6em 1em;
        border-radius: 6px;
    }
</style>