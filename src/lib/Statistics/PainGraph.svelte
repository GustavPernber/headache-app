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
		//applicera tidigare puinkter på idag
		//beräkna regression utifrån alla punkter som är placerade på idag

		//Gå  igenom alla logs
		//Ta ut timma, minut, sekund. Skapa DAte.utc() av det men med samma dag som idag
		//Flera punkter skapas därmed, varav alla ligger på idag. Skapa regression utifrån denna
		//Starttime och endtime för regression blir därmed idag


		let currentDate = moment().toObject()
		console.log(currentDate);
		for (let i = 0; i < allLogs.length; i++) {
			const log = allLogs[i];
			const timeObj=moment.unix(log.time).toObject() 
			const date= Date.UTC(currentDate.years, currentDate.months, currentDate.date, timeObj.hours, timeObj.minutes,timeObj.seconds )
			tmpArray.push([date, log.painLevel])

			logPoints.x.push(date)
			logPoints.y.push(log.painLevel)
		}
		console.log(logPoints);
		const regression= new PolyReg(logPoints.x, logPoints.y, 5)
		const startTime=Date.UTC(currentDate.years, currentDate.months, currentDate.date, 0, 0,0)
		// const endTime=Date.UTC(currentDate.years, currentDate.months, currentDate.date, 23, 59,59)
		const endTime=1652997599000
		console.log(startTime);
		console.log(endTime);
		console.log(endTime-startTime);
		
		console.log(regPoints.length);
		

		for (let i=startTime;  i<endTime; i = i+ 5000000) {
			const yVal=regression.predict(i)
			regPoints.push([i, yVal])
			
		}
		console.log(regPoints.length);
		console.log(logPoints);
		return {logPoints:tmpArray, regPoints}






		// let xLog=[]
		// let yLog=[]

		// for (let i = 0; i < allLogs.length; i++) {
			// 	const log = allLogs[i];
			// 	xLog.push(log.time)	
			// 	yLog.push(log.painLevel)	
			// }
			// const regression= new PolyReg(xLog, yLog, 5)
			// const startTime=moment().startOf('day').unix()

		// const endTime=moment().endOf('day').unix()

		// const testTime=moment.unix(endTime).toObject()
		// console.log(testTime);

		// for (let i = startTime; i < endTime; i= i+ 5000) {
		// 	const yVal=regression.predict(i)

		// 	const timeObj=moment.unix(i).toObject() 
		// 	const date= Date.UTC(timeObj.years, timeObj.months, timeObj.date, timeObj.hours, timeObj.minutes,timeObj.seconds )

		// 	points.push([date, yVal])
		// 	//y=x+3
			
		// }
		// return points
	}

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
		
		const timeFrame=getTimeFrame()
		
		const todaysDatapoints=getTodaysData(allData)
		const regressionDataPoints=getRegressionPoints(allData)
		
		
		
		let config = {
			series: [
				// {
				// 	name: "",
				// 	// data: regressionDataPoints
				// 	data: todaysDatapoints
					
				// },
				{
					name: "",
					data: regressionDataPoints.regPoints
					// data: todaysDatapoints
					
				},
				{
					name: "",
					data: regressionDataPoints.logPoints
					// data: todaysDatapoints
					
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
