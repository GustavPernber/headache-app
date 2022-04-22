<script>

    // @ts-ignore
    import CurrentLog from '../lib/CurrentLog/CurrentLog.svelte';
    import BottomNav from '../lib/components/BottomNav.svelte';
    import HomeCard from '../lib/HomeCard/index.svelte';
    import TopNav from '../lib/components/TopNav.svelte';

    const handleCurrentlog= ()=>{
        showCurrentlog=!showCurrentlog
    }

    let showCurrentlog =false
</script>

<div class=" min-h-screen w-full bg-appDark-300 z-10">
    <TopNav>
        <h1 class=" text-white text-xl font-semibold">September</h1>
    </TopNav>

    <HomeCard {handleCurrentlog}></HomeCard>

    <div>
        <h2 class=" text-white">main content</h2>
    </div>


    <BottomNav></BottomNav>

    {#if showCurrentlog}
        <CurrentLog ToggleCurrentLog={handleCurrentlog}></CurrentLog>
    {/if}

</div>

<BottomNav></BottomNav>


