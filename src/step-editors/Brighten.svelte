<script>
    export let properties;

    if (!properties.factor) {
        properties.factor = 0;
    }
</script>

<label for="quantity">Choose brighten factor</label>
<input type="number" step=".01" min="0.0" max="2.0" id="brighten" name="brighten" bind:value={properties.factor}>