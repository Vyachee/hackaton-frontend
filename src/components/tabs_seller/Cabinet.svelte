<script>
  import Input from '../Input.svelte'
  import { ApiHelper } from '../../utils/api'
  import { getContext } from 'svelte'
  import InputText from '../InputText.svelte'
  import Request from '../Request.svelte'
  import OfferItem from '../OfferItem.svelte'

  const addAlerts = getContext('addAlerts')
  const user = getContext('user')
  const registerFormData = $user

  const api = new ApiHelper()
  const register = async () => {
    if (registerFormData.password !== registerFormData.repeat_password) {
      throw new Error('Пароли не совпадают')
    }
    const result = await api.register({
      ...registerFormData
    })

  }

  let requests = []

  const getUsersRequests = async () => {
    const data = await api.usersRequestsList()
    requests = data.data.data
  }
  getUsersRequests()

  const validateField = async (field, value) => {
    const result = await new ApiHelper().validateField(field, value)
    const errors = result?.data?.errors
    if (errors) {
      const firstError = Object.entries(errors).shift().pop()
      $addAlerts(firstError)
    }
  }

</script>

<div class="cabinet">
    <h1>Личный кабинет</h1>
    <div class="row">
        <div class="form">
            <InputText on:blur={validateField('login', registerFormData.login)} title="Логин" placeholder="userFromChe"
                   bind:value={registerFormData.login}/>
            <InputText title="Имя" placeholder="Василий" bind:value={registerFormData.firstname}/>
            <InputText title="Фамилия" placeholder="Петров" bind:value={registerFormData.lastname}/>
            <InputText title="ИНН" placeholder="10 или 12 символов" bind:value={registerFormData.INN}/>
            <InputText title="Отчество" placeholder="Иванович" bind:value={registerFormData.middlename}/>
            <InputText title="ОГРН" placeholder="14 символов" bind:value={registerFormData.OGRN}/>
            <InputText title="Юридический адрес" placeholder="г. Челябинск, ул. Энтузиастов, 17"
                   bind:value={registerFormData.address}/>
            <InputText title="Телефон" placeholder="+7 (999) 555-22-33" bind:value={registerFormData.telephone}/>
            <InputText title="Электронная почта" placeholder="example@test.com" bind:value={registerFormData.email}/>
            <InputText title="Полное наименование" placeholder="ООО 'красивое' " bind:value={registerFormData.fullName}/>
        </div>
        <div class="requests">
            {#if requests}
                {#each requests as request}
                    <OfferItem offer={request}/>
                {/each}
            {/if}
        </div>
    </div>
</div>

<style lang="scss">
  .cabinet {
    padding: 50px;
    overflow-y: scroll;
    height: 100vh;

    .row {
      margin-top: 30px;
      display: flex;
      align-items: start;
      gap: 50px;

      .form {
        padding: 15px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: -10px 0px 87px rgba(0, 0, 0, 0.05);
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px 10px;
        max-width: 500px;
      }

      .requests {
        display: flex;
        flex-direction: column;
        gap: 20px;
        flex: 1;
      }
    }
  }
</style>
