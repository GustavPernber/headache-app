<script>
    import {fly} from 'svelte/transition'
</script>

<div 
    
    class="wrapper h-[calc(100vh-1.75rem)] w-full bg-appDark-300 absolute bottom-0   top-6 rounded-t-2xl z-20">

    <h1>Test components</h1>
</div>

<style lang="scss">
    .wrapper{
        animation:swipeUp 0.5s;
        // animation-timing-function: cubic-bezier(.34,.47,.24,.98);
        animation-timing-function: $swipeUpBezier;
    }

    

</style>