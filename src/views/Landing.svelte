<script lang="ts">
    import {fade, fly} from 'svelte/transition';
    import SmallButton from '../components/SmallButton.svelte'
    import Input from '../components/Input.svelte'
    import Switcher from '../components/Switcher.svelte'
    import Button from '../components/Button.svelte'
    import { ApiHelper } from "../utils/api";
    import { getContext } from "svelte";
    const userToken = getContext("userToken")

    let userRoleIndex = 0

    const api = new ApiHelper()

    const registerFormData = {
        login: 'asdasda',
        password: '123',
        firstname: 'asdfasdf',
        repeat_password: '123',
        lastname: 'asdfasdf',
        INN: '1234567890',
        middlename: 'asdfasdfasdf',
        OGRN: '12345678901234',
        address: 'asdfasdfasdf',
        email: 'adfasdf@mail.ru',
        telephone: '123123123',
        fullName: 'sdfaasdfasdf'
    }

    const loginFormData = {
        login: 'test123',
        password: 'test123'
    }

    const register = async () => {
        try {
            if(registerFormData.password !== registerFormData.repeat_password) {
                throw new Error('Пароли не совпадают')
            }
            await api.register({
                ...registerFormData,
                user_role_id: userRoleIndex + 1
            })
            $userToken = localStorage.getItem("token")
        }	catch ( e: Error ) {
            // todo show error
        }
    }

    const validateField = async (field, value) => {
        const result = await new ApiHelper().validateField(field, value)
    }

    const login = async () => {
        await api.login(loginFormData)
        const newToken = localStorage.getItem("token")
        $userToken = localStorage.getItem("token")
    }

    let showAuth = false
</script>
{#if showAuth}
    <div class="popup" transition:fade={{duration: 500}}>
        <div class="popup-bg" on:click={() => showAuth = false}></div>
        <div class="popup-window" transition:fly={{y: -50}}>
            <h2 transition:fly={{y: -20}}>Вход</h2>
            <div class="close" on:click={() => showAuth = false}>
                <img src="/assets/img/close.svg" alt="">
            </div>

            <div transition:fly={{y: -20}}>
                <Input title="Логин" placeholder="Username" bind:value={loginFormData.login}/>
            </div>
            <div transition:fly={{y: -20}}>
                <Input title="Пароль" placeholder="*********" bind:value={loginFormData.password}/>
            </div>
            <div transition:fly={{y: -20}}>
                <Button title="Войти" on:click={login}/>
            </div>
        </div>
</div>
{/if}
<section>
    <div class="image">
        <div class="title">
            <h1>Хакатон</h1>
            <p>Покупай, продавай и производи!</p>
        </div>
        <img src="/assets/img/illustration.png" alt="">
    </div>
    <div class="content-container">
        <div class="inner-container-section">

            <div class="head">
                <h1>Как это работает?</h1>
                <div class="buttons">
                    <SmallButton title="Личный кабинет" on:click={() => showAuth = true}/>
                    <SmallButton title="Регистрация"/>
                </div>
            </div>
            <div class="content">
                <div class="col">
                    <div class="people">
                        <div class="people-image">
                            <img src="/assets/img/flour.png" alt="">
                        </div>
                        <h3>Поставщик муки</h3>
                        <p>Имеется своё производство муки и он не знает, куда её деть</p>
                        <img src="/assets/img/arrow.svg" alt="">
                    </div>
                </div>
                <div class="col">
                    <div class="people">
                        <div class="people-image">
                            <img src="/assets/img/bread.png" alt="">
                        </div>
                        <h3>Производитель хлеба</h3>
                        <p>Требуется мука</p>
                        <img src="/assets/img/arrow.svg" alt="">
                    </div>
                </div>
            </div>

            <div class="col-center">
                <h2>Производитель хлеба покупает у поставщика муку</h2>

                <img src="/assets/img/arrow.svg" class="arrow" alt="">
                <h2>Все реализовывают свой продукт</h2>
                <img src="/assets/img/check.svg" class="check" alt="">
                <h2>Profit!</h2>
            </div>
        </div>
        <div class="inner-container section">
            <div class="head mb0">
                <h1>Зарегистрируйтесь</h1>
            </div>
            <div class="head mt20">
                <p>Чтобы начать</p>
            </div>
            <div class="form">
                <Input on:blur={validateField('login', registerFormData.login)} title="Логин" placeholder="userFromChe" bind:value={registerFormData.login}/>
                <Input title="Пароль" placeholder="*********" bind:value={registerFormData.password}/>
                <Input title="Имя" placeholder="Василий" bind:value={registerFormData.firstname}/>
                <Input title="Повтор пароля" placeholder="*********" bind:value={registerFormData.repeat_password}/>
                <Input title="Фамилия" placeholder="Петров" bind:value={registerFormData.lastname}/>
                <Input title="ИНН" placeholder="10 или 12 символов" bind:value={registerFormData.INN}/>
                <Input title="Отчество" placeholder="Иванович" bind:value={registerFormData.middlename}/>
                <Input title="ОГРН" placeholder="14 символов" bind:value={registerFormData.OGRN}/>
                <Input title="Юридический адрес" placeholder="г. Челябинск, ул. Энтузиастов, 17" bind:value={registerFormData.address}/>
                <Input title="Телефон" placeholder="+7 (999) 555-22-33" bind:value={registerFormData.telephone}/>
                <Input title="Электронная почта" placeholder="example@test.com" bind:value={registerFormData.email}/>
                <Input title="Полное наименование" placeholder="ООО 'красивое' " bind:value={registerFormData.fullName}/>
            </div>
            <div class="buttons">
                <Switcher bind:selectedIndex={userRoleIndex}/>
                <Button title="Зарегистрироваться" on:click={register}/>
            </div>
        </div>
    </div>
</section>

<style lang="scss">
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    .popup-bg {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
      position: absolute;
      top: 0;
      left: 0;
    }
    .popup-window {
      background-color: #fff;
      z-index: 30;
      border-radius: 10px;
      box-shadow: 0px 5px 18px rgba(0, 0, 0, 0.15);
      padding: 36px;
      position: relative;
      min-width: 460px;
      display: flex;
      flex-direction: column;
      h2 {
        margin-bottom: 30px;
        font-size: 30px;
      }

      .close {
        position: absolute;
        top: 36px;
        right: 36px;
        cursor: pointer;
        opacity: 0.75;
        transition: 0.2s;
        &:hover {
          opacity: 1;
        }
      }
      :global(.btn) {
        width: 100%;
        margin-top: 10px;
      }
      :global(.input) {
        margin-bottom: 10px;
      }
    }
  }
  section {
    background-color: #F3F7F8;
    height: 100vh;
    display: flex;
    .image {
      width: 50%;
      height: 100vh;
      display: flex;
      align-items: end;
      position: relative;
      .title {
        position: absolute;
        top: 25px;
        left: 25px;
        h1 {
          font-size: 40px;
        }
        p {
          font-size: 30px;
        }
      }

      img {
        width: 100%;
      }
    }
    .content-container {
      background: #FFFFFF;
      box-shadow: -10px 0px 87px rgba(0, 0, 0, 0.05);
      width: 50%;
      z-index: 2;
      overflow-y: scroll;
      height: 100vh;
      .inner-container {
        height: 100vh;
      }
      .head {
        display: flex;
        justify-content: space-between;
        margin: 50px;
        &.mb0 {
          margin-bottom: 0 !important;
        }
        &.mt0 {
          margin-top: 0;
        }
        &.mt20 {
          margin-top: 10px !important;
        }
        h1 {
          font-size: 40px;
        }
        p {
          font-size: 30px;
        }
      }
      .buttons {
        display: flex;
        gap: 10px;
        align-items: center;
      }
      .content {
        display: flex;
        align-items: start;
        .col {
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: start;
          .people {
            width: 360px;
            display: flex;
            flex-direction: column;
            align-items: center;
            align-self: start;

            &-image {
              height: 180px;
            }
            img {

            }
            h3 {
              font-size: 30px;
              text-align: left;
              width: 100%;
            }
            p {
              width: 360px;
              font-size: 20px;
              margin-top: 10px;
              margin-bottom: 20px;
              height: 80px;
            }
          }
        }
      }
      .col-center {
        text-align: center;
        display: flex;
        flex-direction: column;
        margin-top: 40px;
        h2 {
          font-size: 24px;
        }
        img.arrow {
          height: 120px;
          margin: 25px 0;
        }
        img.check {
          height: 55px;
          margin: 10px 0;
        }

      }
      .form {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        margin: 50px 50px 20px 50px;
        gap: 20px;

        //:global(.input:last-child) {
        //	grid-column-start: 1;
        //	grid-column-end: 3;
        //}
      }
      .buttons {
        display: flex;
        margin: 0 50px;
        justify-content: space-between;

        :global(.btn-primary) {
          width: 395px;
        }
      }
    }
  }
</style>
