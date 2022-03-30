<script>
    import { goto } from '$app/navigation';

    import Week from './Week.svelte'

    let day="Today"
    export let handleCurrentlog
</script>


<article class="bg-appDark-200 flex flex-col rounded-b-2xl  overflow-hidden ">


    <Week></Week>

    <div class="w-full   min-h-[55vh] py-1 gap-9 flex flex-col justify-center items-center">

        <h1 class=" font-bold text-4xl text-white">
            {day}
        </h1>


        <button on:click={handleCurrentlog} class="text-lg shadow-lg w-56 h-14 text-white rounded-full bg-gradient-to-r from-green-100 to-green-200">
            Current headache
        </button>

        <button class=" shadow-lg w-36 h-12 rounded-lg text-white bg-gradient-to-r from-pink-100 to-pink-200">
            This day
        </button>

    </div>



</article>