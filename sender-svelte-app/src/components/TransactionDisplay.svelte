<script>
    export let created_at;


    const day = created_at.substring(8, 10);
    let month = "Month";

    switch (parseInt(created_at.substring(5, 7))) {
        case 1:
            month = "Jan"
            break;
        case 2:
            month = "Feb"
            break;
        case 3:
            month = "Mar"
            break;
        case 4:
            month = "Apr"
            break;
        case 5:
            month = "May"
            break;
        case 6:
            month = "Jun"
            break;
        case 7:
            month = "Jul"
            break;
        case 8:
            month = "Aug"
            break;
        case 9:
            month = "Sep"
            break;
        case 10:
            month = "Oct"
            break;
        case 11:
            month = "Nov"
            break;
        case 12:
            month = "Dec"
            break;
    }
    const date = `${month} ${day}, ${created_at.substring(0,4)}`
</script>

<div class="container">
    <div>{date}</div>
    <div>Transaction</div>
</div>

<style>
    div {
        display: inline;
    }

    .container {
        width: 80%;
        background-color: var(--green);
        color: white;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.6em 1em;
        border-radius: 6px;
        margin-bottom: 1em;
    }
</style>