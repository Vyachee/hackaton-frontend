<script lang="ts">
	import SmallButton from './components/SmallButton.svelte'

	export let name: string;
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
		}
	}
</style>
