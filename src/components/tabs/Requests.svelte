<script>

import Request from '../Request.svelte'
import Input from '../Input.svelte'
</script>

<div class="wrap">
    <div class="requests">
        <h1>Ваши запросы на закупку</h1>
        <div class="items">
            <Request/>
            <Request/>
            <Request/>
            <Request/>
            <Request/>
        </div>
    </div>
    <div class="create">
        <h1>Создать запрос на закупку</h1>
        <div class="form">
            <div class="grid grid-first">
                <Input title="Срок окончания запроса" placeholder="00.00.0000 00:00"/>
                <Input title="Валюта" placeholder="Доллар США, $"/>
                <Input title="Тип продукции" placeholder="Сырье"/>
                <Input title="Название заявки" placeholder="10 тонн фрутоняни"/>
            </div>
            <div class="big-fields">
                <Input title="Адрес доставки" placeholder="г. Челябинск, ул. Энтузиастов, 17"/>
                <Input title="Комментарий" placeholder="Бла-бла-бла"/>
            </div>
            <span>Документы</span>
            <div class="docs">
                <div class="selector">
                    <input type="file">
                    <div class="placeholder">
                        <img src="/assets/img/doc-add.svg" alt="">
                        <p>Кликните или перенесите сюда документы</p>
                    </div>
                </div>
            </div>
            <div class="grid grid-first">
                <Input title="Начальная цена" placeholder="$10000"/>
                <Input title="Объем" placeholder="10 тонн"/>
            </div>
        </div>
    </div>
</div>


<style lang="scss">
  .wrap {
    display: flex;
  }
    .requests {
        padding: 50px;

      .items {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        width: 50%;
        gap: 20px;
        margin-top: 40px;
      }
    }

    .create {
      margin-top: 50px;
      width: 100%;
      margin-right: 50px;
      .form {
        margin-top: 40px;
        background-color: #fff;
        border-radius: 10px;
        width: 100%;
        padding: 25px;

        .grid {
          display: grid;
          &-first {
            gap: 20px;
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .big-fields {
          display: flex;
          flex-direction: column;
          margin: 20px 0;
          gap: 20px;
        }
        span {
          padding-bottom: 20px;
        }
        .docs {
          width: 100%;
          border: 1px dashed #B0B0B0;
          border-radius: 10px;
          position: relative;
          margin-top: 10px;
          transition: 0.2s;
          margin-bottom: 20px;
          &:hover {
            border: 1px solid #B0B0B0;
            box-shadow: 0 5px 5px rgba(0, 0, 0, .1);
          }
          .selector {
            position: relative;
            border-radius: 10px;
            padding: 20px;
            transition: 0.2s;

            input {
              opacity: 0;
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              cursor: pointer;
            }
          }
          .placeholder {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 10px;
            color: #727272;
            img {
              width: 50px;
            }
          }
        }
      }
    }
</style>
