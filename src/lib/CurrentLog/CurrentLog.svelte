<script>
    import CurrentLogTopNav from './CurrentLogTopNav.svelte';
</script>

<div class="wrapper h-[calc(100vh-1.75rem)] w-full bg-appDark-300 absolute bottom-0   top-6 rounded-t-2xl z-20">

    <CurrentLogTopNav />

</div>


<style lang="scss">
    .wrapper{
        animation:swipeUp 0.5s;
        // animation-timing-function: cubic-bezier(.34,.47,.24,.98);
        animation-timing-function: $swipeUpBezier;
    }

</style>