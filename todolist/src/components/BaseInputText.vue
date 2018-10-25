<template>
	<input
		type="text"
		class="input"
		v-model="value"
		@keydown.enter="$emit('add', value)">
</template>

<script>
export default {
  data() {
    return {
      value: ""
    }
  }
}
</script>

<style lang="scss" scoped>
	@import '../variables.scss';

	.input {
		width: 100%;
		padding: 8px 10px;
		border: 1px solid $vue-blue;
	}
</style>
