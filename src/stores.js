import {writable} from 'svelte/store'


export const currentLogStore=writable({
    
    painLevel:[2],
    timeButtons:[
		{ name: "Custom", value: "custom", selected: false, time: null },
		{ name: "Now", value: "now", selected: true },
		{ name: "30m ago", value: "30_min_ago", selected: false },
		{ name: "1h ago", value: "1_hour_ago", selected: false },
	]

})