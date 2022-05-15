<script>
	import { getAllCurrentLogs } from "../../firebase";

	import Chart from "svelte-frappe-charts";
	import moment from "moment";
	import { onMount } from "svelte";

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
					// chartType: "line",
					values: painValues,
				},
			],
		};

		return graphData;
	}
    

</script>


{#await loadGraph() then graphData}
	<Chart
		data={graphData}
		height={300}
		type={"line"}
		title={""}
		axisOptions={{ xAxisMode: "tick" }}
		lineOptions={{ spline: 1 }}
	/>
{/await}
