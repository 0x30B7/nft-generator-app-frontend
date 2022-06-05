<script>
    export let properties;

    if (!properties.times) {
        properties.times = 0;
    }
</script>

<label for="quantity">Choose brighten factor</label>
<input type="number" step="any" id="rotate" name="rotate" bind:value={properties.times}>