<script>
    import TestComp from '../components/TestComp.svelte';
    import BottomNav from '../components/BottomNav.svelte';
    import HomeCard from '../components/HomeCard/index.svelte'
    import TopNav from '../components/TopNav.svelte';

    const handleCurrentlog= ()=>{
        showCurrentlog=!showCurrentlog
    }

    let showCurrentlog =false
</script>

<div class=" min-h-screen w-full bg-appDark-300"
>
    <TopNav>
        <h1 class=" text-white text-xl font-semibold">September</h1>
    </TopNav>

    <HomeCard {handleCurrentlog}></HomeCard>

    <div>
        <h2 class=" text-white">main content</h2>
    </div>


    <BottomNav></BottomNav>

    {#if showCurrentlog}
        <TestComp></TestComp>
    {/if}

</div>

<BottomNav></BottomNav>
