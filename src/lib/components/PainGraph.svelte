<script>
	import { getAllCurrentLogs } from "../../firebase";

	import Chart from "svelte-frappe-charts";
	import moment from "moment";


	async function loadGraph() {
		let timeLabels = [];
		let painValues = [];
		const allCurrentLogs = await getAllCurrentLogs();

		for (let i = 0; i < allCurrentLogs.length; i++) {
			const log = allCurrentLogs[i];
			const formatTime = moment.unix(log.time).format();
			timeLabels.push(formatTime);
			painValues.push(log.painLevel);
		}

		let graphData = {
			labels: timeLabels,
			datasets: [
				{
					name: "Pain level",
					values: painValues,
				},
			],
		};

		return graphData;
	}
    

</script>


{#await loadGraph() then graphData}
<div class=" painGraph pb-[10rem]">  
	<Chart 
		data={graphData}
		height={300}
		type={"line"}
		title={""}
		axisOptions={{ xAxisMode: "tick" }}
		lineOptions={{ spline: 0 }}
	/>
</div>	
{/await}
