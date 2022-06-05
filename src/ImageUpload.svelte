<script>
	import { onMount } from "svelte";
	import { Modals, closeModal, openModal, modals } from "svelte-modals";
	import Modal from "./Modal.svelte";

	// import { addLayer, getLayers } from "./layers";
	import LayerStepEditor from "./LayerStepsEditor.svelte";
	import NftViewer from "./NFTViewer.svelte";

	import {
		URL_LAYER_UPLOAD,
		URL_FETCH_LAYER_LIST,
		URL_FETCH_LAYER,
		URL_MINT_NFT
	} from "./api";

	let fileinput;

	let targetFile;
	let layers = [
		// {id: 1, src: ""}
	];

	// forma, kad sudelioti json objekta.
	// ir kai bus surinkta forma, i layerius detis.
	function addLayer(id, src) {
		let newLayer = {
			id,
			src,
			isSelected: false,
			selectionOrder: 0,
			steps: [
				// { type: "color-fill", properties: { color: "#000000" } },
				// { type: "blur", properties: { radius: 4 } },
			], // { type: "color-fill", properties: { color: "#ececec"} }
		};

		layers.push(newLayer);
		console.log(newLayer);
		return newLayer;
	}

	let currentSelectionOrderIndex = 0;

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
			fd.append("layerImage", targetFile);
			targetFile = undefined;

			fetch(URL_LAYER_UPLOAD, {
				method: "POST",
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
				body: fd,
			})
				.then((res) => res.json())
				.then((json) => {
					newLayer.id = json.id;
					layers = layers;
				})
				.catch((err) => console.error(err));

			layers = layers;
		};
		reader.readAsDataURL(targetFile);
	};

	let dataFetched = false;

	onMount(() => {
		if (dataFetched) return;
		dataFetched = true;

		fetch(URL_FETCH_LAYER_LIST, {
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
						let response = await fetch(URL_FETCH_LAYER + entry.id, {
							method: "GET",
							headers: {
								"Access-Control-Allow-Origin": "*",
							},
						});

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

	//----------------------------------------form submit part--------------------------------------------------------

	let width = 400;
	let height = 400;

	function handleBtnSubmit() {
		let payload = { width, height, resources: [], layers: [] };

		for (let layer of layers) {
			if (!layer.isSelected) continue;

			payload.layers.push({
				imageId: layer.id,
				steps: layer.steps,
			});
		}

		payload.layers = payload.layers.sort((a, b) => a.selectionOrder - b.selectionOrder);

		console.log(payload)

		fetch(URL_MINT_NFT, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify(payload),
		})
			.then(async (res) => {
				if (res.status === 200) {
					let jsonResponse = await res.json();
					let nftImageId = jsonResponse.id;

					openModal(NftViewer, {
						title: "Yes",
						nftImageId,
						openItself: (props) => {
							openModal(NftViewer, props)
						}
					});
				}

				return res;
			})
			.catch(console.log);
	}

	
	// MODALS

	function handleCustomizeLayer(e, layer) {
		e.preventDefault();
		openModal(LayerStepEditor, {
			layer,
			title: `Alert #${$modals.length + 1}`,
			message: "This is an alert",
			onOpenAnother: () => {
				handleCustomizeLayer(e, layer);
			},
		});
	}
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
		<form class="contact-form">
			<div class="flex-label">
			</div>

			<div class="flex-container">
				{#each layers as layer}
					{#if layer.id !== -1 && layer.src !== null}
						<div>
							<img
								id={layer.id}
								class={layer.isSelected
									? "avatar-selected"
									: "avatar"}
								src={layer.src}
								name="topics"
								alt="d"
								on:click={() => {
									layer.isSelected = !layer.isSelected;
									
									if (layer.isSelected) {
										layer.selectionOrder = ++currentSelectionOrderIndex;
									}
								}}
							/>

							<div class="img-btn">
								<button
									on:click={(event) =>
										handleCustomizeLayer(event, layer)}
								>
									Customize
								</button>
							</div>
							<Modals>
								<div
									slot="backdrop"
									class="backdrop"
									on:click={closeModal}
								/>
							</Modals>
						</div>
					{/if}
				{/each}
			</div>

			<div class="flex-label">
				<button on:click|preventDefault={handleBtnSubmit} type="submit"
					>Submit</button
				>
			</div>
		</form>
	</div>
</div>
<!-- result maybe? pleasE? no? FAK -->


<style>
	#app {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-flow: column;
	}

	.img-btn {
		align-items: center;
		justify-content: center;
		display: flex;
		margin: 5px;
	}

	label {
		align-items: center;

		margin: 10px;
	}

	.upload {
		display: flex;
		height: 50px;
		width: 50px;
		cursor: pointer;
	}

	img.avatar {
		width: 300px;
		height: 300px;
		margin: 5px;
		border: 2px solid black;
	}

	img.avatar-selected {
		width: 300px;
		height: 300px;
		margin: 5px;
		border: 2px solid blueviolet;
	}

	.flex-label {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin: 30px 5px 15px 20px;
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
