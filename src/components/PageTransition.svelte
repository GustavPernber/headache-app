<script>
    import {fly} from 'svelte/transition'
    export let url=""
    const transitionDuration=500
</script>

{#key url}
    <div in:fly={{x:-5, duration: transitionDuration, delay:transitionDuration}}
    out:fly={{x:5, duration:transitionDuration}}
    >
        <slot></slot>
    </div>
{/key}