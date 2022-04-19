<script>

</script>

<div class="request-card">
    <h2>вфылоапррфывроапврфыпарфыва</h2>
    <div class="items">

        <div class="item">
            <div class="title">dfasjhakjsdf</div>
            <div class="value">asdfklhasdfjhasdkjf</div>
        </div>
        <div class="item">
            <div class="title">dfasjhakjsdf</div>
            <div class="value">asdfklhasdfjhasdkjf</div>
        </div>
        <div class="item">
            <div class="title">dfasjhakjsdf</div>
            <div class="value">asdfklhasdfjhasdkjf</div>
        </div>
        <div class="item">
            <div class="title">Адрес доставки</div>
            <div class="value">asdfklhasdsadfkjhasdgfhjgasdhfasdhfkasdhfgasdkjhffjhasdkjf</div>
        </div>
        <div class="item">
            <div class="title">dfasjhakjsdf</div>
            <div class="value">asdfklhasdfjhasdkjf</div>
        </div>
    </div>
    <div class="actions">
        <div class="status">
            Открыта
        </div>
        <div class="more">
            Подробнее
        </div>
    </div>
</div>

<style lang="scss">
  .request-card {
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 7px 9px rgba(0, 0, 0, 0.05);
    padding: 15px;
    display: flex;
    flex-direction: column;
    width: 390px;
    transition: 0.2s;
    cursor: pointer;
    &:hover {
      box-shadow: 0 15px 9px rgba(0, 0, 0, 0.05);
    }

    h2 {
      font-size: 16px;
      margin-bottom: 10px;
    }

    .items {
      gap: 5px;
      display: flex;
      flex-direction: column;
      .item {
        display: flex;
        .title {
          min-width: 150px;
        }
        .value {
          margin-left: 20px;
          text-align: left;
          word-break: break-all;
        }
      }
    }

    .actions {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }

  }
</style>
