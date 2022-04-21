<script>
  import Chat from '../Chat.svelte'
  import Message from '../Message.svelte'
  import { ApiHelper } from '../../utils/api'
  import { onDestroy } from 'svelte'

  let chats = []
  const api = new ApiHelper()

  const getChats = async () => {
    const result = await api.getChats()
    chats = result?.data?.data
  }

  let interval = setInterval(async () => {
    await getChats()
  }, 1000)
  let interval2

  onDestroy(() => {
    clearInterval(interval)
    clearInterval(interval2)
  })




  let selectedChat = false
  let selectedChatId = false
  let text = null

  const getChat = async(id) => {
    const result = await api.getChat(id)
    selectedChat = result?.data
    selectedChatId = id
  }

  $: if(selectedChatId) {

    interval2 = setInterval(async () => {
      await getChat(selectedChatId)
    }, 1000)

  }

  const sendMessage = async () => {
    const result = await api.sendMessage(selectedChatId, text)
    text = null
    await getChat(selectedChatId)
    await getChats()
  }
</script>

<div class="chat-wrap">
    <div class="chats">
        {#if chats}
            {#each chats as chat}
                <Chat {chat} on:click={() => getChat(chat?.id)}/>
            {/each}
        {/if}
    </div>
    {#if selectedChat}
        <div class="messenger">
            <div class="messages">
                {#if selectedChat?.conversation}
                    {#each selectedChat?.conversation as message}
                        <Message {message}/>
                    {/each}
                {/if}
            </div>
            <div class="send">
                <input type="text"
                       bind:value={text}
                       placeholder="Введите сообщение">
                <img src="/assets/img/send.svg" alt="" class="btn"
                on:click={sendMessage}>
            </div>
        </div>
    {:else}
        <div class="no-data">
            <p>Выберите чат, чтобы начать</p>
        </div>
    {/if}
</div>


<style lang="scss">
  .chat-wrap {
    width: 100%;
    height: 100vh;
    display: flex;
    gap: 20px;

    .chats {
      width: 25%;
      display: flex;
      flex-direction: column;
      gap: 20px;
      height: 100%;
      padding-top: 30px;
      overflow-y: scroll;
      padding-right: 10px;
    }

    .no-data {
      //flex: 1;
      width: 75%;
      height: 100vh;
      padding: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .messenger {
      flex: 1;
      max-width: 62%;
      margin-right: 200px;
      display: flex;
      margin-top: 30px;
      margin-bottom: 30px;
      flex-direction: column;
      max-height: 1400px;
      .messages {
        padding: 20px;
        flex: 1;
        border-radius: 10px;
        background-color: #fff;
        max-height: 1400px;
        overflow-y: scroll;
        box-shadow: 0 7px 10px rgba(0, 0, 0, 0.05);
        display: flex;
        flex-direction: column;
        justify-content: start;

        :global(.message) {
          max-width: max-content;
        }
        :global(.message:first-child) {
          margin-top: auto;
        }
        :global(.message.outgoing) {
          max-width: max-content;
          margin-left: auto;
        }
      }
      .send {
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
        margin-top: 20px;
        box-shadow: 0 7px 10px rgba(0, 0, 0, 0.05);
        position: relative;
        min-height: 100px;
        .btn {
          position: absolute;
          top: 18px;
          right: 18px;
          cursor: pointer;
          opacity: 0.8;
          transition: 0.2s;
          &:hover {
            opacity: 1;
          }
        }
        input {
          width: 100%;
          border: none;
          outline: none;
          font-size: 18px;
          padding: 20px 50px 20px 20px;

          &::placeholder {
            color: #737373;
          }
        }
      }
    }
  }
</style>
