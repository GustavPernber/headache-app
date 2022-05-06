import {writable} from 'svelte/store'


export const currentLogStore=writable({
    
    painLevel:[2],
    time:'now'

})