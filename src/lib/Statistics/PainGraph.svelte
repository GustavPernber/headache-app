<script>
	import highcharts from "./highcharts";
	import { getAllCurrentLogs } from "../../firebase";
	import moment from "moment";

	//TAr in array med alla logs. returnar: {todaysData:[...], }
	function formatData(allLogs){

		let currentSimpleDate = moment().format("YYYY-MM-DD");
		let todaysData=[]

		for (let i = 0; i < allLogs.length; i++) {
			const log = allLogs[i];

			let day = moment.unix(log.time).format("YYYY-MM-DD");

			if (day === currentSimpleDate) {
				let tmpObj = {
					simpleDate: day,
					unixTime: log.time,
					painLevel: log.painLevel,
				};

				todaysData.push(tmpObj);
			}
		}

		return {todaysData}

	}


	async function loadGraph() {
		let data = [];

		//Hämtar datan från firebase
		const allData = formatData(await getAllCurrentLogs())

		const allCurrentLogs=allData.todaysData

		for (let i = 0; i < allCurrentLogs.length; i++) {
			const log = allCurrentLogs[i];
			const timeObj=moment.unix(log.unixTime).toObject()
			data.push([Date.UTC(timeObj.years,timeObj.months, timeObj.date , timeObj.hours, timeObj.minutes , timeObj.seconds), log.painLevel])
		}
		console.log(data);

		//Ser sjukt fult ut men sorterar iaf datan
		data.sort((a, b)=> a[0] > b[0] ? 1 :((b[0] > a[0]) ? -1 : 0))

		const startObj = moment().startOf('day').toObject()
		const startTime=Date.UTC(startObj.years, startObj.months, startObj.date, 0, 0,0 )
		
		const endObj=moment().endOf('day').toObject()
		const endTime=Date.UTC(endObj.years, endObj.months, endObj.date, 23, 59,59 )
		// console.log(startTime);

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
				height:200,
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
				// min: startTime,
				// max: endTime,
				type: "datetime",
				// dateTimeLabelFormats: {
				// 	// don't display the dummy year
				// 	month: "%e. %b",
				// 	year: "%b",
				// },

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

		return config;
	}


</script>

{#await loadGraph() then config}
	<div class="pain-chart" use:highcharts={config} />
{/await}
