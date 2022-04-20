<script>
  import {fade} from 'svelte/transition';
  export let checked = false
  export let title = 'Zhopa'
</script>

<div class="checkbox" on:click={() => checked = !checked}>
    <div class="square" class:checked>
        {#if checked}
            <img src="/assets/img/check.svg" alt="" transition:fade={{duration: 100}}>
        {/if}
    </div>
    <div class="title">
        {title}
    </div>
</div>

<style lang="scss">
  .checkbox {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    * {
      user-select: none;
    }

    .square {
      border-radius: 5px;
      min-width: 25px;
      min-height: 25px;
      max-height: 25px;
      max-width: 25px;
      background-color: #F1F1F1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 5px;
      transition: 0.1s;
      img {
        width: 100%;
        height: 100%;
      }

      &.checked {
        background-color: #A7EDFF;

      }
    }

    .title {
      font-size: 16px;
    }
  }
</style>
