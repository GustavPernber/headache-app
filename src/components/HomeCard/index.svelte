<script>
    import Week from './Week.svelte'

    let day="Today"
</script>


<article class="bg-appDark-100 flex flex-col">


    <nav class="flex flex-row items-center justify-between">
        <h1>September</h1>
        <div class="h-10 w-10 bg-lightGrey"></div>
    </nav>

    <Week></Week>

    <div class="w-full py-40 gap-9 flex flex-col justify-center items-center">

        <h1 class=" text-3xl text-white">{day}</h1>

        <button class=" w-56 h-14 text-white rounded-full bg-gradient-to-r from-green-100 to-green-200">
            Current headache
        </button>

        <button class=" w-36 h-12 rounded-lg text-white bg-gradient-to-r from-pink-100 to-pink-200">
            This day
        </button>

    </div>



</article>