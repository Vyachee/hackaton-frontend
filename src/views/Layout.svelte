<script>
    import { getContext } from 'svelte'
    import Landing from './Landing.svelte'
    import Buyer from './Buyer.svelte'
    import Seller from './Seller.svelte'

    const user = getContext("user")
    const userToken = getContext("userToken")
</script>

{#if !$user}
    <Landing/>
{/if}

{#if $user?.role === 'Закупщик'}
    <Buyer/>
{/if}

{#if $user?.role === 'Поставщик'}
    <Seller/>
{/if}

<!--<slot/>-->

<style>
    :global(body) {
        background-color: #F3F7F8 !important;
    }
</style>
