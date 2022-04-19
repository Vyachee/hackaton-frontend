<script lang="ts">
    import {fade, fly} from 'svelte/transition';
    import SmallButton from '../components/SmallButton.svelte'
    import Input from '../components/Input.svelte'
    import Switcher from '../components/Switcher.svelte'
    import Button from '../components/Button.svelte'
    import { ApiHelper } from "../utils/api";
    import { getContext } from "svelte";
    const userToken = getContext("userToken")
    const user = getContext("user")
    const addAlerts = getContext("addAlerts")
</script>
Поставщик
<style lang="scss">

</style>
