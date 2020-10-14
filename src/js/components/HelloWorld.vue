<template>
	<h1>Hello {{title}}! <small>{{date}}</small> sdl</h1>
</template>


<script>
	module.exports = {
		data() {
			return {
				date: (new Date()).toString()
			}
		},
		props:["title"]
	};
</script>

<style lang="scss" scoped>

</style>
