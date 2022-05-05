<script>

    export let toggleCurrentLog
    export let toUnmount

    import CurrentLogBottomNav from './CurrentLogBottomNav.svelte';
    import CurrentLogTopNav from './CurrentLogTopNav.svelte';
    import RangeSlider from "svelte-range-slider-pips";
    
    import {onDestroy, onMount} from 'svelte'

    let swipeUp=true

    onMount(()=>{
        setTimeout(() => {
            swipeUp=false
        }, 500);
    })
    
    let options=[
        "one",
        "two",
        "three"
    ]
    


    let timeButtons=[
        {name:"Custom", value:"custom", selected:false },
        {name:"Now", value:"now", selected:true},
        {name:"30m ago", value:"30_min_ago", selected:false },
        {name:"1h ago", value:"1_hour_ago", selected:false }

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


<div class:swipeUp class:toUnmount class=" text-white flex gap-20 flex-col wrapper h-[calc(100vh-1.75rem)] w-full bg-appDark-300 absolute bottom-0 top-6 rounded-t-2xl z-20 p-5">

    <CurrentLogTopNav {toggleCurrentLog} />
    <div class="flex flex-col">

        <h1 class="self-center text-2xl py-3">How's the pain?</h1>

        <div class="grid grid-cols-[1rem_1fr_1rem]">

            <p class="self-center">1</p>
            <RangeSlider float=true values={[2]} step={1} min={1} max={10} id="slider"/>
            <p class="self-center">10</p>

        </div>

    </div>


    <div>
        <h1 class="text-2xl py-3">Time</h1>

        <form class="grid grid-rows-2 grid-cols-3 gap-5">
            <p class="col-span-2 self-center text-lightGrey text-base" >When did it start?</p>

            {#each timeButtons as buttonData (buttonData.value) }
            
                <button class="rounded-lg border-2 border-green-100 text-base h-9 w-[6.5rem]" on:click={(e)=> {e.preventDefault(), handleTimeButton(buttonData.value)}} class:selected={buttonData.selected }> 
                    {buttonData.name}
                </button>
                
            {/each}
            
        </form>

    </div>


    <CurrentLogBottomNav />

</div>


<style lang="scss">

    .wrapper.swipeUp{
        animation:swipeUp 0.5s;
        // animation-timing-function: cubic-bezier(.34,.47,.24,.98);
        animation-timing-function: $swipeUpBezier;
    }
    .wrapper.toUnmount{
        // animation:swipeDown 0.5s;
        // animation-timing-function: cubic-bezier(.34,.47,.24,.98);
        transform: translateY(100vh);
        transition: 0.5s;
        // animation-timing-function: $swipeUpBezier;
    }

    button.selected{

        background: $green-100;
        color: $appDark-200;
        font-weight: 700;
        line-height: 1.5rem;

    }

    



</style>