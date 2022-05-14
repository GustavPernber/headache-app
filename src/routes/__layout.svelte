<script>
	import { onMount } from "svelte";
	import { initFirebase } from "../firebase/index";
	import "../app.css";

	onMount(()=>{
		initFirebase()
	})

</script>


<slot class=" overflow-hidden"/>


