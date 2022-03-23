<script context="module">
	export const load = async ({url})=>{
		return {props:{url}}
	}

</script>
<script>
	import PageTransition from "../components/PageTransition.svelte";
	import "../app.css";
	export let url
</script>


<PageTransition {url}>

	<slot class=" overflow-hidden"/>
</PageTransition>
