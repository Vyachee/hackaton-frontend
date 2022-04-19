<script>
  import { createEventDispatcher } from 'svelte'

  export let title = 'title'
  export let modifier = 'primary' // danger || green
  const dispatch = createEventDispatcher()
</script>

<button class="btn btn-{modifier}" on:click={() => dispatch('click')}>{title}</button>

<style lang="scss">
  .btn {
    border-radius: 10px;
    color: #fff;
    font-weight: 600;
    font-size: 20px;
    padding: 15px 20px;
    cursor: pointer;
    border: none;
    outline: none;
    transition: 0.2s;
    opacity: 0.85;

    &-primary {
      background-color: #80BEDD;
    }
    
    &-green {
      background-color: #8DDD80;
    }

    &-danger {
      background-color: #DD8080;
    }

    &:hover {
      opacity: 1;
    }
  }
</style>
