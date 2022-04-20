<script>

  import Request from '../Request.svelte'
  import Input from '../Input.svelte'
  import Checkbox from '../Checkbox.svelte'
  import Button from '../Button.svelte'
  import Switcher from '../Switcher.svelte'
  import Dropdown from '../Dropdown.svelte'
  import { ApiHelper } from '../../utils/api'
  import { getContext } from 'svelte'
  import InputText from '../InputText.svelte'
  import { format } from 'date-fns'
  import Document from '../Document.svelte'
  import OfferItem from '../OfferItem.svelte'

  const addAlerts = getContext('addAlerts')

  const api = new ApiHelper()
  let requests = []

  let selectedRequest = false

  let sendOfferData = {
    supply_at: null,
    production_type_id: null,
    currency_id: null,
    price: null,
    payment_method_id: null,
    address: null
  }
  const dropdownsData = {
    payments: [],
    production: [],
    currencies: [],
  }

  const fetchData = async () => {
    dropdownsData.payments = (await api.getPaymentMethods()).data
    dropdownsData.currencies = (await api.getCurrencies()).data.data
    dropdownsData.production = (await api.getProductionTypes()).data
  }
  fetchData()

  const getUsersRequests = async () => {
    const data = await api.requestsList()
    requests = data?.data?.data
  }

  const fetchOne = async () => {
    const response = await api.getOneRequest(selectedRequest?.id)
    selectedRequest = response?.data?.data
    sendOfferData.supply_at = format(new Date(selectedRequest?.expiring_at), 'yyyy-MM-dd HH:mm')
  }
  const sendRequest = async () => {

    if(!sendOfferData.supply_at)
      sendOfferData.supply_at = format(new Date(selectedRequest?.expiring_at), 'yyyy-MM-dd HH:mm')

    Object.keys(sendOfferData).map(value => {
      if(!sendOfferData[value]) delete sendOfferData[value]
    })

    const result = await api.sendOffer({
      ...sendOfferData,
      buy_request_id: selectedRequest?.id
    })

    sendOfferData = {
      supply_at: null,
      production_type_id: null,
      currency_id: null,
      price: null,
      payment_method_id: null,
      address: null
    }

    await fetchOne();
  }

  getUsersRequests()


  const onSelect = async (request) => {
    selectedRequest = request
    await fetchOne()
  }

</script>

<div class="wrap">
    {#if !selectedRequest}
        <div class="requests">
            <h1>Запросы на закупку</h1>
            <div class="items">
                {#if requests}
                    {#each requests as request}
                        <Request {request} on:click={() => onSelect(request)}/>
                    {/each}
                {/if}
            </div>
        </div>
    {:else}
        <div class="request-info">
            <div class="header-row">
                <img src="/assets/img/caret.svg" alt="" on:click={() => {
                  selectedRequest = null
                }}>
                <h1>Информация о запросе</h1>
            </div>
            <div class="row">
                <div class="info">
                    <div class="grid">
                        <InputText title="Срок окончания запроса"
                                   value={selectedRequest.expired_at || '-'}
                        />
                        <InputText title="Валюта"
                                   value={selectedRequest?.currency?.name || '-'}
                        />
                        <InputText title="Тип продукции"
                                   value={selectedRequest?.production_type?.name || '-'}
                        />
                        <InputText title="Адрес доставки"
                                   value={selectedRequest?.address || '-'}
                        />
                        <InputText title="Комментарий"
                                   value={selectedRequest?.comment || '-'}
                        />
                        <InputText title="Начальная цена"
                                   value={selectedRequest?.price || '-'}
                        />
                        <InputText title="Объем"
                                   value={selectedRequest?.count || '-'}
                        />
                    </div>

                    <div class="docs">
                        <span>Документы</span>
                        <div class="items">
                            {#each selectedRequest?.documents as doc}
                                <Document {doc}/>
                            {/each}
                        </div>
                    </div>

                </div>

                <div class="offers">
                    {#if selectedRequest?.is_auction}
                        <div class="current-price">
                            <h1>{selectedRequest?.lowest_price || selectedRequest?.price_with_character || '-'}</h1>
                            <h3>самая низкая цена</h3>
                        </div>
                    {/if}
                    <div class="send-offer">
                        <Input title="Срок исполнения"
                               placeholder="00.00.0000 00:00"
                               bind:value={sendOfferData.supply_at}
                        />
                        <Dropdown title="Тип продукции"
                                  bind:items={dropdownsData.production}
                                  placeholder="Выберите тип"
                                  bind:selectedId={sendOfferData.production_type_id}
                        />

                        {#if selectedRequest?.is_auction}
                            <Dropdown title="Валюта"
                                      bind:items={dropdownsData.currencies}
                                      placeholder="Выберите валюту"
                                      bind:selectedId={sendOfferData.currency_id}
                            />
                            <Input title="Цена"
                                   placeholder="Введите цену"
                                   bind:value={sendOfferData.price}
                            />
                        {/if}
                        <Dropdown title="Способ оплаты"
                                  bind:items={dropdownsData.payments}
                                  placeholder="Способ оплаты"
                                  bind:value={sendOfferData.payment_method_id}
                        />
                        <Input title="Адрес доставки"
                               placeholder="Введите адрес"
                               bind:value={sendOfferData.address}
                        />
                        <Button title="Отправить предложение" on:click={sendRequest}/>
                    </div>
                    <div class="offers-list">
                        {#if selectedRequest?.responses}
                            {#each selectedRequest?.responses as offer}
                                <OfferItem {offer}/>
                            {/each}
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>


<style lang="scss">
  .wrap {
    display: flex;
    height: 100%;
  }

  .docs {
    margin-top: 20px;

    .items {
      margin-top: 10px;
      gap: 10px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .offers {
    width: 100%;
    padding: 0 50px 0 20px;
    height: 93%;
    overflow-y: scroll;

    .current-price {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 30px;

      h1 {
        font-size: 64px;
      }

      h3 {
        font-size: 20px;
        color: #454545;
      }
    }

    .send-offer {
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0px 7px 10px rgba(0, 0, 0, 0.05);
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      padding: 20px;
      gap: 10px;

      :global(:last-child) {
        grid-column-start: 1;
        grid-column-end: 4;
      }
    }

    .offers-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 20px;
    }
  }

  .request-info {
    padding: 50px 0 0 50px;
    width: 100%;

    .header-row {
      display: flex;
      gap: 10px;
      img {
        transform: rotate(-90deg);
        cursor: pointer;
        opacity: 0.85;
        transition: 0.2s;
        &:hover {
          opacity: 1;
        }
      }
    }

    .row {
      display: flex;
      margin-top: 30px;
      width: 100%;
      height: 100%;

      .info {
        border-radius: 10px;
        background-color: #fff;
        padding: 25px;
        box-shadow: 0 7px 9px rgba(0, 0, 0, 0.05);
        min-width: 650px;
        height: max-content;

        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
        }

      }
    }
  }

  .requests {
    padding: 50px 0 0px 50px;
    width: 100%;
    max-height: 100vh;

    .items {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 100px;
      width: 100%;
      //height: 100%;
      gap: 20px;
      margin-top: 40px;
      overflow-y: scroll;
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

      .buttons {
        display: flex;
        gap: 10px;
        margin-top: 20px;
        align-items: start;

        :global(.btn) {
          width: 100%;
        }

        .checkboxes {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 50%;
        }

        .buttons-items {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 50%;
        }
      }

      .grid {
        display: grid;

        &-first {
          &:first-child {
            margin-bottom: 20px;
          }

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
