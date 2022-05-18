import { initializeApp } from "firebase/app";

import { firebaseConfig } from "./config";

import {
	getAuth,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	getAdditionalUserInfo,
} from "firebase/auth";
import {
	getFirestore,
	collection,
	addDoc,
	query,
	orderBy,
	limit,
	onSnapshot,
	setDoc,
	updateDoc,
	doc,
	serverTimestamp,
	getDoc,
	getDocs,
	where,
} from "firebase/firestore";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getPerformance } from "firebase/performance";
import moment from "moment";

let db;

export function initFirebase() {
	initializeApp(firebaseConfig);
	db = getFirestore();
}

export async function getAllCurrentLogs() {
	const data = {
		data: [
			{ date: "2020-3-4, 8:13:12", painLevel: 2 },
			{ date: "2020-3-4, 16:30:12", painLevel: 9 },
			{ date: "2020-3-4, 20:13:12", painLevel: 3 },
			{ date: "2020-3-4, 12:20:12", painLevel: 5 },
			{ date: "2020-3-4, 16:40:12", painLevel: 10 },

			{ date: "2022-5-18, 6:13:12", painLevel: 4 },
			{ date: "2022-5-18, 19:20:12", painLevel: 9 },
			{ date: "2022-5-18, 12:30:12", painLevel: 2 },


			{ date: "2022-5-7, 23:40:12", painLevel: 6 },
			{ date: "2022-5-7, 19:13:12", painLevel: 1 },
		],
	};

	let todaysData = [];
	let currentSimpleDate=moment().format("YYYY-MM-DD");
	

	for (let i = 0; i < data.data.length; i++) {
		const log = data.data[i];

		let unixTime = moment(log.date).utc().unix();

		let day = moment.unix(unixTime).format("YYYY-MM-DD");
		if (day===currentSimpleDate) {
			let tmpObj = {
				simpleDate: day,
				unixTime: unixTime,
				painLevel: log.painLevel,
			};
			
			todaysData.push(tmpObj);
		}



		//{today:[{simple, unix, painlevel}]}

		//{date: "2022-06-12, 13:14:12", painLevel: 2}
		//days:[ {date:2022-05-21, dataPoints:[{time:1231441, pain:1}],  } ]
	}
	console.log(todaysData);
	
	//loop store recorded dates in array, if not there, created new array, otherwise put it in
	//[time: 1213314, painLevel:1]

	// const querySnapshot = await getDocs(collection(db, "current-logs"));

	// let allLogs = [];
	// querySnapshot.forEach((doc) => {
	// 	allLogs.push(doc.data());
	// });

	return todaysData;

	// return newData
}

export async function addCurrentLog({ painLevel, unixTime }) {
	try {
		const docRef = await addDoc(collection(db, "current-logs"), {
			painLevel: painLevel,
			time: unixTime,
		});

		console.log("Created document with id:", docRef.id);
	} catch (error) {
		console.log(error);
	}
}

// export async function addToDB(text){
// 	let uid
// 	authStore.subscribe(user=>{
// 		uid=user.user.uid || null
// 	})

// 	try {
// 		const docRef=await addDoc(collection(db, 'message'), {
// 			text:text,
// 			uid:uid

// 		})
// 		console.log('Created document with id:', docRef.id)
// 	} catch (error) {
// 		console.log(error)
// 	}
// }

// export async function getData(){
// 	let uid
// 	authStore.subscribe(user=>{
// 		uid=user.user.uid || null
// 	})
// 	const docRef=collection(db, 'message')
// 	const q= query(docRef, where('uid','==',uid))
// 	const response = await getDocs(q)
// 	console.log(response)
// 	let respArr=[]
// 	response.forEach((doc)=>{
// 		respArr.push(doc.data())
// 	})
// 	console.log(respArr)
// 	return respArr
// }
