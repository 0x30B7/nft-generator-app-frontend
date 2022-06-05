<script>
    export let properties;

    if (!properties.radius) {
        properties.radius = 0;
    }
</script>

<label for="quantity">Choose blur radius</label>
<input type="number" id="blur" name="blur" bind:value={properties.radius}>