<script>
	import highcharts from "./highcharts";
	import { onMount } from "svelte";
	import { getAllCurrentLogs } from "../../firebase";
	import moment from "moment";

	onMount(() => {
		console.log(Date.UTC(2022, 5, 16));
	});

	async function loadGraph() {
		let data = [];

		//Hämtar datan från firebase
		const allCurrentLogs = await getAllCurrentLogs();

		for (let i = 0; i < allCurrentLogs.length; i++) {
			const log = allCurrentLogs[i];
			const momentTime = moment.unix(log.time)
			const formatTime={year:momentTime.year(), month: momentTime.month(), day: momentTime.day(), hour: momentTime.hour(), minutes: momentTime.minutes() ,seconds: momentTime.seconds(), }

			data.push([log.time, log.painLevel])
		}

		//Ser sjukt fult ut men sorterar iaf datan
		data.sort((a, b)=> a[0] > b[0] ? 1 :((b[0] > a[0]) ? -1 : 0))

		let config = {
			legend:{
				enabled:false,
			},

			credits:{
				enabled:false
			},
			chart: {
				backgroundColor: "rgba(0, 0,0, 0)",
				type: "spline",
			},

			title: {
				text: "",
			},

			yAxis: {
				title: {
					text: "Pain level",
					style:{
						color:"#D2D2D2"
					}
				},

				min: 0,
				max:10
			},

			xAxis: {
				type: "datetime",
				dateTimeLabelFormats: {
					// don't display the dummy year
					month: "%e. %b",
					year: "%b",
				},
				title: {
					text: "Date",
					style:{
						color:"#D2D2D2"
					}
				},
			},

			plotOptions: {
				series: {
					marker: {
						enabled: true,
					},
				},
			},

			series: [
				{
					name: "",
					data: data
					
				},
			],

			responsive: {
				rules: [
					{
						condition: {
							maxWidth: 500,
						},
						chartOptions: {
							plotOptions: {
								series: {
									marker: {
										radius: 4,
										symbol:'circle'
									},
								},
							},
						},
					},
				],
			},
		};

		console.log(config);
		return config;
	}


</script>

{#await loadGraph() then config}
	<div class="pain-chart" use:highcharts={config} />
{/await}
