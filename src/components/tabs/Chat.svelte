<script>
  import Chat from '../Chat.svelte'
  import Message from '../Message.svelte'
</script>

<div class="chat-wrap">
    <div class="chats">
        <Chat/>
        <Chat/>
        <Chat/>
        <Chat/>
        <Chat/>
    </div>
    <div class="messenger">
        <div class="messages">
            <Message/>
            <Message outgoing={true}/>
        </div>
        <div class="send">
            <input type="text" placeholder="Введите сообщение">
            <img src="/assets/img/send.svg" alt="" class="btn">
        </div>
    </div>
</div>


<style lang="scss">
  .chat-wrap {
    width: 100vw;
    height: 100vh;
    padding: 30px;
    display: flex;
    gap: 20px;

    .chats {
      min-width: 350px;
      display: flex;
      flex: 0;
      flex-direction: column;
      gap: 20px;
      height: 100%;
      overflow-y: scroll;
    }

    .messenger {
      flex: 1;
      max-width: 62%;
      margin-right: 30px;
      display: flex;
      flex-direction: column;
      .messages {
        padding: 20px;
        flex: 1;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: 0 7px 10px rgba(0, 0, 0, 0.05);
      }
      .send {
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
        margin-top: 20px;
        box-shadow: 0 7px 10px rgba(0, 0, 0, 0.05);
        position: relative;
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
