<script>
    import { getContext } from 'svelte'
    import Landing from './Landing.svelte'

    const user = getContext("user")
    const userToken = getContext("userToken")
</script>

{#if !$user}
    <Landing/>
{/if}

{#if $user?.role === 'Закупщик'}
    закупщик ты
{/if}

{#if $user?.role === 'Поставщик'}
    поставщик ты
{/if}

<!--<slot/>-->
