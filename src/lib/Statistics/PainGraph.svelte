<script>
	import highcharts from "./highcharts";
	import { getAllCurrentLogs } from "../../firebase";
	import moment from "moment";

	//TAr in array med alla logs. returnar: {todaysData:[...], }


	function getTodaysData(allLogs){

		let currentSimpleDate = moment().format("YYYY-MM-DD");
		let todaysData=[]

		for (let i = 0; i < allLogs.length; i++) {
			const log = allLogs[i];

			let day = moment.unix(log.time).format("YYYY-MM-DD");

			// if (day === currentSimpleDate) {
			if(true){
				const timeObj=moment.unix(log.time).toObject()
				todaysData.push([Date.UTC(timeObj.years,timeObj.months, timeObj.date , timeObj.hours, timeObj.minutes , timeObj.seconds), log.painLevel])
			}
		}

		todaysData.sort((a, b)=> a[0] > b[0] ? 1 :((b[0] > a[0]) ? -1 : 0))
		// console.log(todaysData);
		return todaysData

	}

	function getTimeFrame(){

		const startObj = moment().startOf('day').toObject()
		const startTime=Date.UTC(startObj.years, startObj.months, startObj.date, 0, 0,0 )
		
		const endObj=moment().endOf('day').toObject()
		const endTime=Date.UTC(endObj.years, endObj.months, endObj.date, 23, 59,59 )

		return ({end:endTime, start:startTime})
	}

	async function loadGraph() {
		let data = [];

		//Hämtar datan från firebase
		const allData = await getAllCurrentLogs()
		
		const todaysDatapoints=getTodaysData(allData)
	

		const timeFrame=getTimeFrame()


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
				// min: timeFrame.start,
				// max: timeFrame.end,
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
					data: todaysDatapoints
					
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
