

<div class="w-full bg-appDark-100 h-5">
    <!-- {#each as } -->
</div>

<!-- {#each timeButtons as buttonData (buttonData.value) }

                {#if buttonData.value != 'custom'}

                    <button class="rounded-lg border-2 border-green-100 text-base h-9 w-[6.5rem]" on:click={(e)=> {e.preventDefault(), handleTimeButton(buttonData.value)}} class:selected={buttonData.selected }> 
                        {buttonData.name}
                    </button>
                    
                {:else}
                    
                    {#if buttonData.selected}
                        <input type="time"  class="rounded-lg border-2 border-green-100 text-base h-9 w-[6.5rem]">    

                        {:else}
                        <button class="rounded-lg border-2 border-green-100 text-base h-9 w-[6.5rem]" on:click={(e)=> {e.preventDefault(), handleCustomTime(buttonData.value)}} class:selected={buttonData.selected }> 
                            {buttonData.name}
                        </button>
                    {/if}

                {/if}
                
            {/each} -->