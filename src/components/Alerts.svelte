<script>
    import { flip,  } from 'svelte/animate';
    import { fly} from 'svelte/transition';
    import { getContext } from 'svelte'
    let alerts = getContext("alerts")
</script>

<div class="alerts-container">
    <div class="list">
        {#each $alerts as alert, i (alert.id)}
            <div class="alert" animate:flip in:fly={{x: 100}} out:fly={{x:100}} >{alert.text}</div>
        {/each}
    </div>
</div>
<slot/>

<style lang="scss">
  .alerts-container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 30;
    width: 100%;
    height: 100%;
    pointer-events: none;

    .list {
      position: absolute;
      top: 0;
      right: 0;
      padding: 20px;
      max-width: 500px;
      display: flex;
      flex-direction: column;
      gap: 10px;

      .alert {
        background-color: #dedede;
        box-shadow: 0 5px 5px rgba(0, 0, 0, .1);
        border-radius: 10px;
        padding: 5px 20px;
        display: inline-flex;
        font-size: 18px;
      }
    }
  }
</style>
