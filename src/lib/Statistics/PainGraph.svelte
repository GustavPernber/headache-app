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

		const allCurrentLogs = await getAllCurrentLogs();

		for (let i = 0; i < allCurrentLogs.length; i++) {
			const log = allCurrentLogs[i];
			const momentTime = moment.unix(log.time)
			const formatTime={year:momentTime.year(), month: momentTime.month(), day: momentTime.day(), hour: momentTime.hour(), minutes: momentTime.minutes() ,seconds: momentTime.seconds(), }

			// data.push([Date.UTC(1970, formatTime.month, formatTime.day, formatTime.hour,formatTime.minutes, formatTime.seconds ), log.painLevel]);
			// data.push([Date.UTC(1970, formatTime.month, formatTime.day, formatTime.hour,formatTime.minutes, formatTime.seconds ), log.painLevel]);
			data.push([log.time, log.painLevel])
			console.log(formatTime);

			// data.push([Date.UTC(1970, 1, i), log.painLevel]);
			// data.push([Date.UTC(1970, i+1, i+3), log.painLevel]);
		}

		data.sort((a, b)=> a[0] > b[0] ? 1 :((b[0] > a[0]) ? -1 : 0))
		let data2=
		[
						[Date.UTC(1970, 10, 9), 0],
						[Date.UTC(1970, 10, 10), 0.23],
						[Date.UTC(1970, 10, 11), 0.25],
						[Date.UTC(1970, 10, 12), 0.23],
						[Date.UTC(1970, 10, 13), 0.39],


		]

		console.log(data);
		console.log(data2);
		let config = {
			chart: {
				type: "spline",
			},

			title: {
				text: "Pain level over time",
			},

			subtitle: {
				text: "Source: thesolarfoundation.com",
			},

			yAxis: {
				title: {
					text: "Number of Employees",
				},

				min: 0,
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
					name: "Installation",
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
										radius: 2.5,
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

	// function generateNewData() {
	// 	const newData = config.series[0].data.map((data) =>
	// 		Math.round(Math.random() * 100000)
	// 	);
	// 	config.series[0].data = newData;
	// }
</script>

{#await loadGraph() then config}
	<div class="chart" use:highcharts={config} />
{/await}
