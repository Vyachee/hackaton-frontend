<script>
  export let title = 'title'
  export let placeholder = 'title'
  export let value = ''
</script>

<div class="input">
    <span>{title}</span>
    <input type="text" placeholder={placeholder} bind:value>
</div>

<style lang="scss">
    .input {

    }
</style>
