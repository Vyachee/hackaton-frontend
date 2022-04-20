<script>
  import { createEventDispatcher } from 'svelte'

  export let title = 'title'
  export let placeholder = 'title'
  export let value = ''

  const dispatch = createEventDispatcher()
</script>

<div class="input">
    <span>{title}</span>
    <div class="value">{value}</div>
</div>

<style lang="scss">
  .input {
    display: flex;
    flex-direction: column;

    span {
      font-size: 14px;
      margin-bottom: 5px;
      font-weight: bold;
    }
    .value {
      font-size: 16px;
    }
    input {
      border-radius: 10px;
      background-color: #f1f1f1;
      padding: 13px 20px;
      color: #000;
      border: none;
      outline: none;
      transition: 0.2s;

      &:focus {
        box-shadow: 0 2px 5px rgba(0, 0, 0, .1);
      }

      &::placeholder {
        color: #515151;
      }
    }
  }
</style>
