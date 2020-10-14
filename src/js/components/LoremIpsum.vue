<template>
	<p><span v-for="i in times">
		 Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo.
	</span></p>
</template>

<script>
	export default {
		props : ["repeat"],
		computed: {
			times: function(){
				return parseInt(this.repeat,10) || 1
			}
		}
	}
</script>
