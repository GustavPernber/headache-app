<script>
    export let toUnMount

    let swipeUp=true
    let swipeDown=false

    function closeComponent(params) {
        swipeUp=false
        swipeDown=true

    }

</script>


<div on:click={closeComponent} class="w-screen h-screen fixed bottom-0 left-0 bg-black opacity-[0.5] z-10">

    
</div>

<div class:swipeUp class:swipeDown class=" fixed  rounded-t-2xl h-[25rem] bottom-0 left-0 w-full bg-appDark-100 z-20">
    <h1>Choose time</h1>

</div>




<style lang="scss">

    @keyframes swipeUpTime{
        from{
            transform: translateY(25rem);
        }

        to{
            transform: translateY(0);
        }
    }
    .swipeUp{
        animation:swipeUpTime 0.5s;
        // animation-timing-function: cubic-bezier(.34,.47,.24,.98);
        animation-timing-function: $swipeUpBezier;
    }


    .swipeDown{
        // animation:swipeDown 0.5s;
        // animation-timing-function: cubic-bezier(.34,.47,.24,.98);
        transform: translateY(100vh);
        transition: 0.5s;
        // animation-timing-function: $swipeUpBezier;
    }

</style>

