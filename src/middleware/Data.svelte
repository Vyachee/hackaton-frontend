<script>

  // import { user } from '../utils/api'
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { ApiHelper } from '../utils/api'

  const user = writable(null)
  const userToken = writable(null);
  $userToken = localStorage.getItem("token")


  const api = new ApiHelper()

  const fetchUserData = async () => {
    const userData = await api.getUserInfo($userToken)
    $user = userData.data.data
  }

  $: if($userToken) {
    fetchUserData()
  }
  setContext('user', user)
  setContext('userToken', userToken)
</script>

<slot/>
