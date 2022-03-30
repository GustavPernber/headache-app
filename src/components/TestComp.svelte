<script>
    import {fly} from 'svelte/transition'
</script>

<div 
    in:fly="{{y:800,duration:600}}"
    
    class=" h-[calc(100vh-1.75rem)] w-full bg-appDark-300 absolute bottom-0 rounded-t-2xl">

    <h1>Test components</h1>
</div>