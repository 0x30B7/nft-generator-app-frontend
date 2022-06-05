<script>
	import { onMount } from "svelte";

	let fileinput;

	let targetFile;
	let layers = [
		// {id: 1, src: ""}
	];

	// forma, kad sudelioti json objekta.
	// ir kai bus surinkta forma, i layerius detis.
	function addLayer(id, src) {
		let newLayer = { id, src, isSelected: false };
		layers.push(newLayer);
		return newLayer;
	}

	const onFileSelected = (e) => {
		targetFile = e.target.files[0];
	};

	const onTargetFileConfirmed = () => {
		if (!targetFile) {
			return;
		}

		let reader = new FileReader();

		reader.onload = (e) => {
			let newLayer = addLayer(-1, e.target.result);

			const fd = new FormData();
			fd.append("avatar", targetFile);
			targetFile = undefined;

			fetch("http://localhost:8081/api/v1/test/file-upload", {
				method: "POST",
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
				body: fd,
			})
				.then((res) => res.json())
				.then((json) => (newLayer.id = json.id))
				.catch((err) => console.error(err));

			layers = layers;
		};
		reader.readAsDataURL(targetFile);
	};

	onMount(() => {
		fetch("http://localhost:8081/api/v1/test/file-fetch/all", {
			method: "GET",
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		})
			.then((res) => res.json())
			.then(async (json) => {
				for (let entry of json) {
					let newLayer = addLayer(entry.id, null);

					try {
						let response = await fetch(
							`http://localhost:8081/api/v1/test/file-fetch/${entry.id}`,
							{
								method: "GET",
								headers: {
									"Access-Control-Allow-Origin": "*",
								},
							}
						);

						console.log("loading " + entry.id);

						let reader = new FileReader();
						reader.onloadend = () => {
							newLayer.src = reader.result;
						};

						reader.readAsDataURL(await response.blob());
					} catch (err) {
						console.error(err);
					}
				}

				layers = layers;
			})
			.catch((err) => console.error(err));
	});
</script>

<div id="app">
	<h1>Upload Image</h1>
	<img
		class="upload"
		src="https://static.thenounproject.com/png/625182-200.png"
		alt=""
		on:click={() => {
			fileinput.click();
		}}
	/>
	<div
		class="chan"
		on:click={() => {
			fileinput.click();
		}}
	>
		{targetFile ? targetFile.name : "Choose Image"}
	</div>
	<input
		style="display:none"
		type="file"
		accept=".jpg, .jpeg, .png"
		on:change={onFileSelected}
		bind:this={fileinput}
	/>

	

	<button on:click={onTargetFileConfirmed}>Upload</button>
	<!--         {#if avatar}
        <img class="avatar" src="{avatar}" alt="d" />
        {:else}
        <img class="avatar" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" alt="" /> 
        {/if} -->
		<div>
			<h2>Select images to render</h2>
		</div>

		<div>
			<form>
				<label for="email">Email</label>
				<input type="email" name="email" id="email" />
			  
				<button type="submit">Submit</button>
			  </form>
		</div>

	</div>

<div class="flex-container">
	{#each layers as layer}
		{#if layer.id !== -1 && layer.src !== null}
			<div>
				<img
					class={layer.isSelected ? "avatar-selected" : "avatar"}
					src={layer.src}
					alt="d"
					on:click={() => {
						layer.isSelected = !layer.isSelected;
					}}
				/>
			</div>
		{/if}
	{/each}
</div>

<style>
	#app {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-flow: column;
	}

	.upload {
		display: flex;
		height: 50px;
		width: 50px;
		cursor: pointer;
	}
	.avatar {
		
	}

	/* Clearfix (clear floats) */

	
	img.avatar {
		width: 300px;
		height: 300px;
		margin: 5px;
	}

	img.avatar-selected {
		width: 300px;
		height: 300px;
		margin: 5px;
		border: 2px solid blueviolet;
	}

	.flex-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: 30px 5px 15px 20px;
	}

	.flex-container > div {
	width: 350;
	height: 350;
	margin: 5;
	
	}
</style>
