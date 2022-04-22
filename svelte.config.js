import adapter from '@sveltejs/adapter-auto';
// import preprocess from 'svelte/types/compiler/preprocess';
import preprocessor from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocessor({
		scss:{
			prependData:"@import '../../scss/main.scss';"
		}
	}),
	kit: {
		adapter: adapter()
	}
};

export default config;
