<script>
	//export let name;

	let name = 'Stress';

	// select file input
	const input = document.getElementById('avatar');

	// add event listener
		//sita idejus neveikia
		
	//

	const uploadFile = (file) => {

	// add file to FormData object
	const fd = new FormData();
	fd.append('avatar', file);

	// send `POST` request
	fetch('/upload-avatar', {
		method: 'POST',
		body: fd
	})
	.then(res => res.json())
	.then(json => console.log(json))
	.catch(err => console.error(err));
	}

	// Validate File Type & Size

</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Choose img to upload</p>

	
	<input type="file" id="avatar">

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