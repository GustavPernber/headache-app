<script context="module">
	import { initFirebase } from "../firebase/index";
	export async function load(){
		initFirebase()
		return true
	}

</script>


<script>
	import { onMount } from "svelte";
	import "../app.css";

	// onMount(()=>{
	// 	initFirebase()
	// })

</script>


<slot class=" overflow-hidden"/>


