<script>
    import { getContext } from 'svelte'
    import { format } from 'date-fns'

    export let outgoing = false
    export let message = {
      user_id: 2,
      message: 'asdasd',
      created_at: '2022-04-21T05:20:24.000000Z'
    }
    const user = getContext('user')
</script>

<div class="message" class:outgoing={$user.id === message?.user_id}>
    <div class="text">
        {message?.message}
    </div>
    <div class="date">{format(new Date(message?.created_at), 'dd.MM.yyyy HH:mm')}</div>
</div>


<style lang="scss">
    .message {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      max-width: 90%;
      .text {
        border-radius: 10px 10px 10px 0;
        background-color: #80BEDD;
        padding: 15px;
        display: inline-flex;
        width: 100%;
        word-break: break-word;
      }

      .date {
        color: #3D3D3D;
        font-size: 12px;
        margin-top: 5px;
      }
      &.outgoing {
        justify-content: right;
        align-items: end;
        .text {
          border-radius: 10px 10px 0 10px;
          background-color: #E2E2E2;
        }
        .date {
          margin-left: auto;
          text-align: right;
        }
      }
    }
</style>
