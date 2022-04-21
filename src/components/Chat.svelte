<script>
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()
    export let chat = {
    }
</script>

<div class="chat" on:click={() => dispatch('click')}>
    <div class="header">
        <h3>{chat?.buy_response?.buy_request?.user?.fullName}</h3>
        <p>{chat?.buy_response?.buy_request?.name}</p>
    </div>
<!--    TODO: CALC TIME -->
    <div class="time"></div>

    {#if chat?.last_message}
        <div class="message">
                {chat?.last_message}
        </div>
    {/if}
</div>


<style lang="scss">
  .chat {
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 7px 10px rgba(0, 0, 0, 0.05);
    position: relative;
    padding: 20px;
    transition: 0.2s;
    cursor: pointer;
    margin-left: 30px;
    &:hover {
      box-shadow: 0 7px 10px rgba(0, 0, 0, 0.1);
    }

    .time {
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 12px;
    }

    .header {
      h3 {
        font-size: 16px;
        color: #1A1A1A;
      }

      p {
        color: #343434;
        font-size: 12px;
      }


    }
    .message {
      font-size: 16px;
      color: #000;
      margin-top: 10px;
    }
  }
</style>
