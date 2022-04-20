<script>
  import { getContext } from 'svelte'

  const user = getContext('user');
  const userToken = getContext('userToken');
    $user = null
    $userToken = null
    localStorage.removeItem('token')
</script>
