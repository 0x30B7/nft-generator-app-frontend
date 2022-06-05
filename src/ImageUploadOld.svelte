<script>
	import { onMount } from "svelte";

	//export let name;

	let name = "Stress";
	let input;
	// select file input
	//const input = document.getElementById('avatar');

	// add event listener
	//console.log(input)

	//

	// Validate File Type & Size

	onMount(() => {
		console.log(input);

		const uploadFile = (file) => {
			// add file to FormData object
			const fd = new FormData();
			fd.append("avatar", file);

			// send `POST` request
			fetch("http://localhost:8081/api/v1/test/file-upload", {
				method: "POST",
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
				body: fd,
			})
				.then(res => res.json())
				.then((json) => console.log(json))
				.catch((err) => console.error(err));
		};

		input.addEventListener("change", () => {
			uploadFile(input.files[0]);
		});
	});
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Choose img to upload</p>

	<input bind:this={input} type="file" id="avatar" />

	
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
