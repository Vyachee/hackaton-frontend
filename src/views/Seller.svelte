<script lang="ts">
    import {fade, fly} from 'svelte/transition';
    import SmallButton from '../components/SmallButton.svelte'
    import Input from '../components/Input.svelte'
    import Switcher from '../components/Switcher.svelte'
    import Button from '../components/Button.svelte'
    import { ApiHelper } from "../utils/api";
    import { getContext } from "svelte";
    import Requests from "../components/tabs_seller/Requests.svelte";
    import Cabinet from "../components/tabs_seller/Cabinet.svelte";
    import Logout from "../components/Logout.svelte";
    const userToken = getContext("userToken")
    const user = getContext("user")
    const addAlerts = getContext("addAlerts")

    let selectedTab

    const tabs = [
        {
            title: 'Запросы',
            component: Requests
        },
        {
            title: 'Личный кабинет',
            component: Cabinet
        },
        {
            title: 'Выйти',
            component: Logout
        },
    ]

    selectedTab = tabs[0]
</script>

<div class="wrap">
    <div class="menu">
        <h1>4pt trade</h1>
        <div class="menu-items">
            {#each tabs as tab}
                <div class="menu-items-item"
                     class:active={selectedTab.title === tab.title}
                     on:click={() => selectedTab = tab}
                >
                    {tab.title}
                </div>
            {/each}

        </div>
    </div>
    <div class="content">
        <svelte:component this={selectedTab.component} />
    </div>
</div>

<style lang="scss">
  .wrap {
    width: 100vw;
    height: 100vh;
    display: flex;

    .menu {
      background-color: #353030;
      min-width: 350px;
      height: 100vh;
      box-shadow: 0 5px 5px rgba(0, 0, 0, .5);

      h1 {
        padding: 30px 40px;
        color: #fff;
        font-size: 40px;
      }

      &-items {
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        &-item {
          font-size: 24px;
          display: inline-flex;
          width: max-content;
          font-weight: 500;
          color: #cdcdcd;
          cursor: pointer;
          padding: 3px 20px;
          border-radius: 10px;
          transition: 0.2s;

          &.active, &:hover {
            background-color: #1A1A1A;
            color: #fff;
          }
        }
      }
    }

    .content {
      width: 100%;
      overflow: hidden;
    }
  }
</style>
