<script>

    // @ts-ignore
    import CurrentLog from '../lib/CurrentLog/CurrentLog.svelte';
    import BottomNav from '../lib/components/BottomNav.svelte';
    import HomeCard from '../lib/HomeCard/index.svelte';
    import TopNav from '../lib/components/TopNav.svelte';


    import { bind } from 'svelte/internal';
    import PainGraph from '../lib/Statistics/PainGraph.svelte';

    
    let showCurrentlog = false
    let currentLogUnmount = false

    const handleCurrentlog = ()=>{
        
        if (showCurrentlog){
            currentLogUnmount=true
            setTimeout(() => {
                showCurrentlog=false
            }, 500);

        }else{
            currentLogUnmount=false
            showCurrentlog=true
        }
    }

</script>


<div class=" min-h-screen w-full  mb-20 bg-appDark-300 z-10">

    <HomeCard {handleCurrentlog} />

    <div class="mainContent text-white px-5 flex-col flex gap-5 pt-16 pb-5 ">
        <h1 class="text-2xl font-bold pb-3 self-center">Your statistics</h1>

        <div class=" p-5 bg-appDark-200 rounded-2xl flex-col flex gap-6" >
            <h2  class=" text-lg pb-3 border-b border-appDark-100 ">Painlevel over time</h2>           
            <PainGraph/>

        </div>

    </div>


    {#if showCurrentlog}
        <CurrentLog toUnmount={currentLogUnmount} toggleCurrentLog={handleCurrentlog} />
    {/if}

</div>

<BottomNav />