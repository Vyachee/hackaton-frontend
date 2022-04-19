<script lang="ts">
	import SmallButton from './components/SmallButton.svelte'
	import Input from './components/Input.svelte'
	import Switcher from './components/Switcher.svelte'


	const registerFormData = {
		login: '',
		password: '',
		name: '',
		repeat_password: '',
		lastname: '',
		inn: '',
		thirdname: '',
		ogrn: '',
		address: '',
		phone: '',
		title: ''
	}
</script>

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
					<SmallButton title="Личный кабинет"/>
					<SmallButton title="Регистрация/вход"/>
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
			<div class="head">
				<p>Чтобы начать</p>
			</div>
			<div class="form">
				<Input title="Логин" placeholder="userFromChe" bind:value={registerFormData.login}/>
				<Input title="Пароль" placeholder="*********" bind:value={registerFormData.password}/>
				<Input title="Имя" placeholder="Василий" bind:value={registerFormData.name}/>
				<Input title="Повтор пароля" placeholder="*********" bind:value={registerFormData.repeat_password}/>
				<Input title="Фамилия" placeholder="Петров" bind:value={registerFormData.lastname}/>
				<Input title="ИНН" placeholder="10 или 12 символов" bind:value={registerFormData.inn}/>
				<Input title="Отчество" placeholder="Иванович" bind:value={registerFormData.thirdname}/>
				<Input title="ОГРН" placeholder="14 символов" bind:value={registerFormData.ogrn}/>
				<Input title="Юридический адрес" placeholder="г. Челябинск, ул. Энтузиастов, 17" bind:value={registerFormData.address}/>
				<Input title="Телефон" placeholder="+7 (999) 555-22-33" bind:value={registerFormData.phone}/>
				<Input title="Полное наименование" placeholder="ООО 'красивое' " bind:value={registerFormData.title}/>
				<Switcher/>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
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
			margin-right: 20px;
			width: 50%;
			z-index: 2;
			overflow-y: scroll;
			height: 100vh;
			.head {
				display: flex;
				justify-content: space-between;
				margin: 50px;
				h1 {
					font-size: 40px;
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
				margin: 50px;
				gap: 20px;
			}
		}
	}
</style>
