<template>
	<div id="app">
		<router-view/>
		<back-top />

	</div>
</template>

<script>
	import backTop from './views/components/backTop.vue'
	export default {
		name: 'App',
		components:{
			[backTop.name]: backTop
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
	}
</style>