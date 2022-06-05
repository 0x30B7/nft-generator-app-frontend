<script>
    export let properties;

    if (!properties.color) {
        properties.color = "#000000"
    }
</script>

<label for="favcolor">Choose a color:</label>
<input type="color" id="favcolor" name="favcolor" bind:value={properties.color}>