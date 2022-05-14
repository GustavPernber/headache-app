<script>
	export let toggleCurrentLog;
	export let toUnmount;

	import moment from "moment";
	import CurrentLogBottomNav from "./CurrentLogBottomNav.svelte";
	import CurrentLogTopNav from "./CurrentLogTopNav.svelte";
	import TimeInput from "../components/TimeInput.svelte";
	import RangeSlider from "svelte-range-slider-pips";

	import { currentLogStore } from "../../stores";

	import { onDestroy, onMount } from "svelte";

	import { addCurrentLog } from "../../firebase";


	let swipeUp = true;
	let showTimeInput = false;

	onMount(() => {
		setTimeout(() => {
			swipeUp = false;
		}, 500);
	});

	// let timeButtons = [
	// 	{ name: "Custom", value: "custom", selected: false, time: null },
	// 	{ name: "Now", value: "now", selected: true },
	// 	{ name: "30m ago", value: "30_min_ago", selected: false },
	// 	{ name: "1h ago", value: "1_hour_ago", selected: false },
	// ];

	function handleTimeButton(value) {
		for (let i = 0; i < $currentLogStore.timeButtons.length; i++) {
			let currentButton = $currentLogStore.timeButtons[i];

			if (
				currentButton.selected === true &&
				currentButton.value != value
			) {
				currentButton.selected = false;
			} else if (currentButton.value === value) {
				currentButton.selected = true;

			}
		}

		$currentLogStore.timeButtons= $currentLogStore.timeButtons;
	}

	function customTimeChange(e) {
		const time = e.target.value;
		let customTime = $currentLogStore.timeButtons.find((obj) => obj.value === "custom");

		customTime.time = time;
		$currentLogStore.timeButtons = $currentLogStore.timeButtons;
	}

	function testFunc() {
		console.log($currentLogStore);
	}

	function handleSubmit() {
		console.log("submitting...");
		//get unix time
		//get pain level
		//call f() in fb to set in db

		let unixTime;

        let selected=$currentLogStore.timeButtons.find((obj) => obj.selected)
        console.log(selected);

        if (selected.value==="custom") {
            console.log(selected.time);
            unixTime = moment(selected.time, "hh.mm").unix()
        }else{
            console.log("not custom");
			

			switch (selected.value) {
				case "1_hour_ago":
					unixTime = moment().subtract(1, "hours").unix();
					console.log(unixTime);
					break;

				case "30_min_ago":
					unixTime = moment().subtract(30, "minutes").unix();
					console.log(unixTime);
					break;

				case "now":
					unixTime = moment().unix();
					console.log(unixTime);
					break;

			}
		}	

		let currentLogObj={
			painLevel:$currentLogStore.painLevel[0],
			unixTime:unixTime
		}

		addCurrentLog(currentLogObj)


    }	
		}	

		


	}

</script>

<div
	class:swipeUp
	class:toUnmount
	class=" text-white flex gap-20 flex-col wrapper h-[calc(100vh-1.75rem)] w-full bg-appDark-300 absolute bottom-0 top-6 rounded-t-2xl z-20 p-5"
>
	<CurrentLogTopNav {toggleCurrentLog} />
	<div class="flex flex-col">
		<button on:click={testFunc}> click </button>
		<h1 class="self-center text-2xl py-3">How's the pain?</h1>

		<div class="grid grid-cols-[1rem_1fr_1rem]">
			<p class="self-center">1</p>
			<RangeSlider
				float="true"
				bind:values={$currentLogStore.painLevel}
				step={1}
				min={1}
				max={10}
				id="slider"
			/>
			<p class="self-center">10</p>
		</div>
	</div>

	<div>
		<h1 class="text-2xl py-3">Time</h1>

		<form class="grid grid-rows-2 grid-cols-3 gap-5">
			<p class="col-span-2 self-center text-lightGrey text-base">
				When did it start?
			</p>

			{#each $currentLogStore.timeButtons as buttonData (buttonData.value)}
				{#if buttonData.value != "custom"}
					<button
						class="rounded-lg border-2 border-green-100 text-base h-9 w-[6.5rem]"
						on:click={(e) => {
							e.preventDefault(),
								handleTimeButton(buttonData.value);
						}}
						class:selected={buttonData.selected}
					>
						{buttonData.name}
					</button>
				{:else if buttonData.selected}
					<input
						type="time"
						on:change={customTimeChange}
						class="rounded-lg border-2 border-green-100 text-base h-9 w-[6.5rem]"
					/>
				{:else}
					<button
						class="rounded-lg border-2 border-green-100 text-base h-9 w-[6.5rem]"
						on:click={(e) => {
							e.preventDefault(),
								handleTimeButton(buttonData.value);
						}}
						class:selected={buttonData.selected}
					>
						{buttonData.name}
					</button>
				{/if}
			{/each}
		</form>
	</div>

	<CurrentLogBottomNav onClick={handleSubmit} />
	<!-- 
   {#if showTimeInput}
        <TimeInput toUnMount={()=>
            setTimeout(() => {
                showTimeInput=false
            }, 2000)
        }/>
    {/if}     -->
</div>

<style lang="scss">
	.time-input {
		background-color: rgba(0, 0, 0, 0);
	}

	.wrapper.swipeUp {
		animation: swipeUp 0.5s;
		// animation-timing-function: cubic-bezier(.34,.47,.24,.98);
		animation-timing-function: $swipeUpBezier;
	}
	.wrapper.toUnmount {
		// animation:swipeDown 0.5s;
		// animation-timing-function: cubic-bezier(.34,.47,.24,.98);
		transform: translateY(100vh);
		transition: 0.5s;
		// animation-timing-function: $swipeUpBezier;
	}

	button.selected {
		background: $green-100;
		color: $appDark-200;
		font-weight: 700;
		line-height: 1.5rem;
	}
</style>
