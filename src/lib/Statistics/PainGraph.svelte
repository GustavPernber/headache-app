<script>
	import highcharts from "./highcharts";
	import { getAllCurrentLogs } from "../../firebase";
	import moment from "moment";
	// import PolyReg from "js-polynomial-regression";
	import PolyReg from 'ml-regression-polynomial';

	//REturnerar points för regressionfunktion
	function getRegressionPoints(allLogs){
		let regPoints=[]

		let logPoints={x:[], y:[]}
		let tmpArray=[]
		//Spridningsdiagram, se till att dom e tillräckligt utspridda för att visas

		for (let i = 0; i < allLogs.length; i++) {

			const log = allLogs[i];

			const timeObj=moment.unix(log.time).toObject() 
			const hourTime=timeObj.hours+(timeObj.minutes/60)+(timeObj.seconds/60/60)

			logPoints.x.push(hourTime)
			logPoints.y.push(log.painLevel)
		}

		const regression= new PolyReg(logPoints.x, logPoints.y, 4)

		for (let i=0;  i<24; i = i+ 1) {
			const yVal=regression.predict(i)
			regPoints.push([i, yVal])
			
		}
		return regPoints

	}

	function getTodaysData(allLogs){

		let currentSimpleDate = moment().format("YYYY-MM-DD");
		let todaysData=[]

		for (let i = 0; i < allLogs.length; i++) {
			const log = allLogs[i];

			let day = moment.unix(log.time).format("YYYY-MM-DD");

			if (day === currentSimpleDate) {
				const timeObj=moment.unix(log.time).toObject()
				todaysData.push([timeObj.hours+(timeObj.minutes/60)+(timeObj.seconds/60/60), log.painLevel])
			}
		}

		todaysData.sort((a, b)=> a[0] > b[0] ? 1 :((b[0] > a[0]) ? -1 : 0))
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
		const regressionDataPoints=getRegressionPoints(allData)
		
		
		
		let config = {
			series: [
				{
					name: "",
					data: todaysDatapoints
					
				},
				{
					name: "",
					data: regressionDataPoints
					
				},
			],

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
				min:0,
				max:24,
				// min: timeFrame.start,
				// max: timeFrame.end,
				// type: "datetime",
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
