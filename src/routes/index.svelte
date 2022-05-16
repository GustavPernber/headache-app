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

    let yCord

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

<div class=" min-h-screen w-full bg-appDark-300 z-10">
    <TopNav {yCord}>
        <h1 class=" text-white text-xl font-semibold">September</h1>
    </TopNav>

    <HomeCard {handleCurrentlog} />

    <div class="mainContent text-white px-5">

        <div>
            <h1  class=" pl-5  text-xl ">Painlevel over time</h1>           
            <PainGraph/>

        </div>

    </div>


    {#if showCurrentlog}
        <CurrentLog toUnmount={currentLogUnmount} toggleCurrentLog={handleCurrentlog}></CurrentLog>
    {/if}

</div>

<BottomNav></BottomNav>

<svelte:window bind:scrollY={yCord}></svelte:window>