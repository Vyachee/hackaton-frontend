<script>
  import { format } from 'date-fns'
  import { slide } from 'svelte/transition'
  import { createEventDispatcher, getContext } from 'svelte'
  const user = getContext('user');

  export let offer
  export let expanded = false
  export let showActions = false

  const dispatch = createEventDispatcher()

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
            <div class="toggle" class:expanded on:click={() => expanded = !expanded}>
                <img src="/assets/img/caret.svg" alt="">
            </div>
            {#if offer?.status?.id === 3}
                {#if showActions}
                    <div class="accept" class:expanded on:click={() => dispatch('accept')}>
                        <img src="/assets/img/accept.svg" alt="">
                    </div>
                    <div class="decline" on:click={() => dispatch('decline')}>
                        <img src="/assets/img/decline.svg" alt="">
                    </div>
                {/if}
            {/if}
        </div>
        {#if offer?.status?.id !== 3}
            <div class="status">{offer?.status?.name}</div>
        {/if}
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
    position: relative;
    overflow: hidden;
    &:hover {
      .row .actions {
        opacity: 1;
      }
      .row .status {
        opacity: 0;
      }
    }

    .status {
      position: absolute;
      top: 0;
      right: 20px;
      display: flex;
      align-items: center;
      height: 100%;
      transition: 0.2s;
    }


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

      .actions {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        height: 100%;
        max-height: 49px;
        opacity: 0;
        transition: 0.2s;
        align-items: center;
        .accept, .decline {
          padding: 15px;
          display: flex;
          align-items: center;
          height: 100%;
          opacity: 0.7;
          transition: all 0.2s;
          cursor: pointer;
          &:hover {
            opacity: 1;
          }
        }
        .accept {
          background-color: #80BEDD;
          border-radius: 10px 0 0 10px;
          &.expanded {
            border-radius: 0 0 0 10px;
          }
        }
        .decline {
          background-color: #DD8080;
          //border-radius: ;
        }
      }
    }

    .toggle {
      cursor: pointer;
      opacity: 0.8;
      transition: 0.2s;
      transform: rotate(180deg);
      margin-right: 20px;

      &.expanded {
        transform: unset;
      }

      &:hover {
        opacity: 1;
      }
    }
  }
</style>
