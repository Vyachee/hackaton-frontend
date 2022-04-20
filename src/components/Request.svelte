<script>
  import { format } from 'date-fns'

  export let request
</script>

<div class="request-card">
    <h2>{request?.name}</h2>
    <div class="items">

        <div class="item">
            <div class="title">Адрес</div>
            <div class="value">{request?.address}</div>
        </div>
        <div class="item">
            <div class="title">Объем</div>
            <div class="value">{request?.count}</div>
        </div>
        <div class="item">
            <div class="title">Валюта</div>
            <div class="value">{request?.currency?.name}</div>
        </div>
        <div class="item">
            <div class="title">Срок</div>
            <div class="value">
                {#if request?.expiring_at}
                    {format(new Date(request?.expiring_at), 'dd.mm.yyyy HH:mm')}
                {:else}
                    -
                {/if}
            </div>
        </div>
        <div class="item">
            <div class="title">Способ оплаты</div>
            <div class="value">{request?.payment_method?.name}</div>
        </div>
        <div class="item">
            <div class="title">Тип продукции</div>
            <div class="value">{request?.production_type?.name}</div>
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
