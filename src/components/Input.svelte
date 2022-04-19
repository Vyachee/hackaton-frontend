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
    display: flex;
    flex-direction: column;

    span {
      font-size: 18px;
      margin-bottom: 13px;
    }

    input {
      border-radius: 10px;
      background-color: #f1f1f1;
      padding: 13px 20px;
      color: #000;
      border: none;
      outline: none;

      &::placeholder {
        color: #515151;
      }
    }
  }
</style>
