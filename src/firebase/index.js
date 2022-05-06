import { initializeApp } from "firebase/app";

import { firebaseConfig } from "./config";

import {
	getAuth,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	getAdditionalUserInfo
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



let db

export function initFirebase(){
	initializeApp(firebaseConfig)
	db = getFirestore()

}


export async function addCurrentLog(){
    try {
        const docRef=await addDoc(collection(db, 'current-logs'), {
            // text:text,
            // painLevel:,
            // time:,
            // uid:uid
        })
		console.log('Created document with id:', docRef.id)
	} catch (error) {
		console.log(error)
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
