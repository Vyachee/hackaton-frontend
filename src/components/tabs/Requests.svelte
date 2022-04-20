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
import Document from '../Document.svelte'
import OfferItem from '../OfferItem.svelte'
import { format } from 'date-fns'
const addAlerts = getContext("addAlerts")

const checkboxes = [
  {
    title: 'Закрыть после срока окончания',
    value: false
  },
  {
    title: 'Аукцион',
    value: false
  },
]

let fileInput
$: if(fileInput?.files) {
}


const createRequest = async () => {

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("count", data.count);
  formData.append("price", data.price);
  formData.append("currency_id", data.currency_id);
  formData.append("production_type_id", data.production_type_id);
  formData.append("is_auction", +checkboxes[1].value);
  formData.append("is_service", isService);
  formData.append("payment_method_id", data.payment_method_id);

  if(checkboxes?.[0].value)
    formData.append("expire_at", data.expire_at);


  for(const file of fileInput.files) {
    formData.append("document[]", file);
  }

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow'
  };

  fetch("http://192.168.144.13/api/request", requestOptions)
    .then(response => response.json())
    .then(async result => {
      const errors = result?.errors
      if(errors) {
        const firstError = Object.entries(errors).shift().pop()
        $addAlerts(firstError)
      } else {
        $addAlerts('Заявка успешно создана!')
      }
      await getUsersRequests()
    })
    .catch(error => {
      console.log(error)

    });
}

let title = false

const onFileLoad = () => {
  title = Object.entries(fileInput.files).map(file => file[1].name).join(', ')
}

let isService

const data = {
  name: null,
  count: null,
  price: null,
  comment: null,
  currency_id: null,
  production_type_id: null,
  is_auction: null,
  is_service: null,
  payment_method_id: null,
  expire_at: null
}

let selectedRequest

const api = new ApiHelper()
let requests = []

const getUsersRequests = async () => {
  const data = await api.usersRequestsList()
  requests = data.data.data
}



getUsersRequests()

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


const fetchOne = async () => {
  const response = await api.getOneRequest(selectedRequest?.id)
  selectedRequest = response?.data?.data
}

const onSelect = async (request) => {
  selectedRequest = request
  await fetchOne()
}

const closeRequest = async () => {
  selectedRequest.is_open = false
  await api.close(selectedRequest.id)
  await fetchOne()
  await getUsersRequests()
}

const openRequest = async () => {
  selectedRequest.is_open = false
  await api.open(selectedRequest.id)
  await fetchOne()
  await getUsersRequests()
}

const accept = async (offer) => {
  await api.changeOfferStatus(offer?.id, 2)
  await fetchOne()
}

const decline = async (offer) => {
  await api.changeOfferStatus(offer?.id, 1)
  await fetchOne()
}

</script>

<div class="wrap">
    {#if !selectedRequest}
    <div class="requests">
        <h1>Ваши запросы на закупку</h1>
        <div class="items">
            {#if requests}
                {#each requests as request}
                    <Request {request} on:click={() => onSelect(request)}/>
                {/each}
            {/if}
        </div>
    </div>
    <div class="create">
        <h1>Создать запрос на закупку</h1>
        <div class="form">
            <div class="grid grid-first">
                {#if checkboxes?.[0].value}
                    <Input title="Срок окончания запроса" placeholder="00.00.0000 00:00" bind:value={data.expire_at}/>
                {/if}
                <Dropdown bind:items={dropdownsData.currencies}  title="Валюта" placeholder="Валюта" bind:selectedId={data.currency_id}/>
                <Dropdown bind:items={dropdownsData.production} title="Тип {isService ? 'услуги' : 'продукции'}" placeholder="Сырье" bind:selectedId={data.production_type_id}/>
                <Input title="Название заявки" placeholder="10 тонн фрутоняни" bind:value={data.name}/>
            </div>
            <div class="grid grid-first">
                <Input title="Адрес доставки" placeholder="г. Челябинск, ул. Энтузиастов, 17" bind:value={data.address}/>
                <Dropdown bind:items={dropdownsData.payments} title="Способ оплаты" placeholder="Способ оплаты" bind:selectedId={data.payment_method_id}/>
            </div>
            <div class="big-fields">
                <Input title="Комментарий" placeholder="Бла-бла-бла" bind:value={data.comment}/>
            </div>
            <span>Документы</span>
            <div class="docs">
                <div class="selector">
                    <input type="file" multiple bind:this={fileInput} on:change={onFileLoad}>
                    <div class="placeholder">
                        <img src="/assets/img/doc-add.svg" alt="">
                        <p>{title || 'Кликните или перенесите сюда документы'}</p>
                    </div>
                </div>
            </div>
            <div class="grid grid-first">
                <Input title="Начальная цена" placeholder="10000" bind:value={data.price}/>
                <Input title="Объем" placeholder="10 тонн" bind:value={data.count}/>
            </div>
            <div class="buttons">
                <div class="checkboxes">
                    {#each checkboxes as checkbox, i}
                        <Checkbox title={checkbox.title} bind:checked={checkbox.value}/>
                    {/each}
                </div>
                <div class="buttons-items">
                    <Button title="Создать" on:click={createRequest}/>
                    <Switcher values={['Товар', 'Услуга']} bind:selectedIndex={isService}/>
                </div>

            </div>
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

                {#if selectedRequest?.documents?.length > 0}
                    <div class="docs">
                        <span>Документы</span>
                        <div class="items">
                            {#each selectedRequest?.documents as doc}
                                <Document {doc}/>
                            {/each}
                        </div>
                    </div>
                {/if}
                <div class="buttons">
<!--                    <Button modifier="green" title="Сохранить" />-->
                    {#if selectedRequest?.is_open}
                        <Button title="Закрыть" modifier="danger" on:click={closeRequest} />
                    {:else}
                        <Button title="Открыть" on:click={openRequest} />
                    {/if}
                </div>

            </div>

            <div class="offers">
                {#if selectedRequest?.is_auction}
                    <div class="current-price">
                        <h1>{selectedRequest?.lowest_price || selectedRequest?.price_with_character || '-'}</h1>
                        <h3>самая низкая цена</h3>
                    </div>
                {/if}
                <div class="offers-list">
                    {#if selectedRequest?.responses}
                        {#each selectedRequest?.responses as offer}
                            <OfferItem {offer}
                                       showActions={true}
                                       on:accept={() => accept(offer)}
                                       on:decline={() => decline(offer)}
                            />
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
  }

  .buttons {
    margin-top: 20px;
    display: flex;
    gap: 20px;
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
