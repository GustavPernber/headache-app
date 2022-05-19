<script>
    import { goto } from '$app/navigation';

    import TopNav from '../components/TopNav.svelte';
    import Week from './Week.svelte'

    let day="Today"
    export let handleCurrentlog
    
    let currentDate = new Date();
	
    let daysList = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];


    //rendera upp en vecka, skapa en array med en vecka
    //  [
    //    { month:"september" weeks:[[week] [week]]}
    //    { month:"september" weeks:[[week] [week]]}
    //    { month:"september" weeks:[[{day:"sun", date:18}] [week]]}
    //  ]
    //
    function getWeekDay(c, ) {
        return daysList[c.getDay()];
    }

    function getMonth(c) {
        let monthsList = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        return monthsList[c.getMonth()];
    }

</script>


<article class="bg-appDark-200 flex flex-col rounded-b-2xl  overflow-hidden ">

    <TopNav>
        <h1 class=" text-white text-xl font-semibold">{getMonth(currentDate)}</h1>
    </TopNav>

    <Week {getWeekDay}/>

    <div class="w-full min-h-[55vh] py-1 gap-9 flex flex-col justify-center items-center">

        <h1 class=" font-bold text-4xl text-white">
            {day}
        </h1>


        <button on:click={handleCurrentlog} class="text-lg font-bold shadow-lg w-56 h-14 text-white rounded-full bg-gradient-to-r from-green-100 to-green-200">
            Current headache
        </button>

        <button class=" shadow-lg w-36 h-[2.75rem] rounded-lg text-white bg-gradient-to-r   border-2 border-green-200">
            This day
        </button>

    </div>



</article>