<script>

    export let toggleCurrentLog
    import CurrentLogBottomNav from './CurrentLogBottomNav.svelte';
    import CurrentLogTopNav from './CurrentLogTopNav.svelte';
    import RangeSlider from "svelte-range-slider-pips";


    let timeButtons=[
        {name:"Custom", value:"custom", selected:false },
        {name:"Now", value:"now", selected:true},
        {name:"30 min ago", value:"30_min_ago", selected:false },
        {name:"1 hour ago", value:"1_hour_ago", selected:false }

    ]

    function handleTimeButton(value){
 
        for (let i = 0; i < timeButtons.length; i++){

            let currentButton = timeButtons[i]
            console.log(currentButton);

            if(currentButton.selected === true && currentButton.value != value){

                currentButton.selected = false
                
            }else if(currentButton.value === value){

                currentButton.selected = true
                
            }

        }

        timeButtons = timeButtons
        
    }


</script>

<div class=" flex flex-col wrapper h-[calc(100vh-1.75rem)] w-full bg-appDark-300 absolute bottom-0 top-6 rounded-t-2xl z-20 p-4">

    <CurrentLogTopNav {toggleCurrentLog} />
    <div class="flex flex-col">
        <h1 class="self-center text-2xl">How's the pain?</h1>
        <div class="grid grid-cols-[1rem_1fr_1rem] m-2">
            <p class="self-center">1</p>
            <RangeSlider float=true values={[2]} step={1} min={1} max={10} id="slider"/>
            <p class="self-center">10</p>
        </div>
    </div>
    <div>
        <h1 class="text-2xl">Time</h1>

        <form class="grid grid-rows-2 grid-cols-3 m-2 gap-5">
            <p class="col-span-2" >When did it start?</p>

            {#each timeButtons as buttonData (buttonData.value) }
            
                <button on:click={(e)=> 
                    {e.preventDefault() 
                    handleTimeButton(buttonData.value)}} class:selected={buttonData.selected}  class="time"> {buttonData.name}</button>
                
            {/each}
            
        </form>
        
        <!-- <form class="grid grid-rows-2 grid-cols-3 m-2 gap-5">
            <p class="col-span-2" >When did it start?</p>
            <input type="radio" name="headacheTimeStart" id="">
            <input type="radio" name="headacheTimeStart" id="">
            <input type="radio" name="headacheTimeStart" id="">
            <input type="radio" name="headacheTimeStart" id="">
        </form> -->



    </div>
    <CurrentLogBottomNav />

</div>


<style lang="scss">

    .wrapper{
        animation:swipeUp 0.5s;
        // animation-timing-function: cubic-bezier(.34,.47,.24,.98);
        animation-timing-function: $swipeUpBezier;
    }

    button.time{
        border: 1px solid black;

        &.selected{
            background:red;
        }
    }

    



</style>