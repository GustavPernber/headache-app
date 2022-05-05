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
    

</script>

<div class:swipeUp class:toUnmount class=' flex  flex-col wrapper h-[calc(100vh-1.75rem)] w-full bg-appDark-300 absolute bottom-0 top-6 rounded-t-2xl z-20 p-4'>

    <CurrentLogTopNav {toggleCurrentLog} />
    <div class="grid grid-cols-[1rem_1fr_1rem] m-2">
        <p class="text-white self-center">1</p>
        <RangeSlider values={[10]} id="slider"/>
        <p class="text-white self-center">10</p>
    </div>
    <form>
        
        <input type="radio" name="headacheTimeStart" id="">
        <input type="radio" name="headacheTimeStart" id="">
        <input type="radio" name="headacheTimeStart" id="">
        <input type="radio" name="headacheTimeStart" id="">
         
        <!-- <input type="radio" bind:group={options} name="headacheTimeStart" id=""> -->
    </form>

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

    



</style>