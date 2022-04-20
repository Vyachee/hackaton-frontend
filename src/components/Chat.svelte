<div class="chat">
    <div class="header">
        <h3>asdhfjgasdf</h3>
        <p>asdasdasd</p>
    </div>
    <div class="time">3 мин.</div>
    <div class="message">
        Бла-бла-бла Бла-бла-бла Бла-бла-бла Бла-бла-бла Бла-бла-бла
    </div>
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
        margin-bottom: 10px;
      }

      .message {
        font-size: 16px;
        color: #000;
      }

    }
  }
</style>
