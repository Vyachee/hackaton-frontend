<script>
  import { format } from 'date-fns'
  import { slide } from 'svelte/transition'
  import { getContext } from 'svelte'
  const user = getContext('user');

  export let offer
  export let expanded = false
</script>

<div class="item">
    <div class="row">
        <div class="title">
            <b>{offer?.user?.fullName || $user.fullName}</b>
        </div>
        <div class="date">
            в срок до <b>{format(new Date(offer?.supply_at || null), 'dd.MM.yyyy HH:mm')}</b>
        </div>
        <div class="price">
            <b>{offer?.price_with_character} </b>
        </div>
        <div class="actions">
            <div class="toggle" on:click={() => expanded = !expanded}>
                <img src="/assets/img/caret.svg" alt="">
            </div>
        </div>
    </div>
    {#if expanded}
        <div class="col more-info" transition:slide>
            <div class="row">
                <div class="title">Валюта</div>
                <div class="value">{offer?.currency?.name}</div>
            </div>
            <div class="row">
                <div class="title">Адрес</div>
                <div class="value">{offer?.address}</div>
            </div>
            <div class="row">
                <div class="title">Способ оплаты</div>
                <div class="value">{offer?.payment_method?.name}</div>
            </div>
        </div>
    {/if}
</div>

<style lang="scss">
  .item {
    width: 100%;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 7px 10px rgba(0, 0, 0, 0.05);
    padding: 15px 20px;

    .more-info {
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;

      .row {
        .title {
          width: 200px;
        }
      }
    }

    .row {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .toggle {
      cursor: pointer;
      opacity: 0.8;
      transition: 0.2s;
      transform: rotate(180deg);

      &.expanded {
        transform: unset;
      }

      &:hover {
        opacity: 1;
      }
    }
  }
</style>
