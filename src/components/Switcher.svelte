<script>
  export let title = 'title'
  export let placeholder = 'title'
  export let value = ''
  export let values = ['Я заказчик', 'Я закупщик']
  export let currentValue = values?.[0]
  export let selectedIndex = 0

  const changeValue = (index) => {
    currentValue = values[index]
    selectedIndex = index
  }
</script>


<div class="switcher">
    {#each values as v, i}
        <div class="value value-{i}" class:active={selectedIndex === i} on:click={() => changeValue(i)}>{values[i]}</div>
    {/each}
    <div class="active-bg" class:selectedSecond={selectedIndex === 1}></div>
</div>

<style lang="scss">
  .switcher {
    background-color: #F1F1F1;
    border-radius: 10px;
    height: 55px;
    display: inline-flex;
    align-items: center;
    justify-content: space-around;
    position: relative;
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.15));

    .active-bg {
      background-color: #fff;
      border-radius: 10px;
      width: 50%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      transition: left 0.2s;
      &.selectedSecond {
        left: 50%;
      }
    }

    .value {
      color: #818181;
      z-index: 5;
      font-size: 20px;
      font-weight: 600;
      padding: 20px;
      cursor: pointer;
      transition: 0.2s;


      &.active {
        color: #000000;
      }
    }
  }
</style>
