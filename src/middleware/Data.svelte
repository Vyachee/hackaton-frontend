<script>

  // import { user } from '../utils/api'
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { ApiHelper } from '../utils/api'

  const user = writable(null)
  const userToken = writable(null);
  const alerts = writable([])

  let number = 1
  const addTestAlert = (text) => {
    $alerts = [...$alerts, {
      id: number++,
      text
    }]
    setTimeout(() => {
      $alerts.shift()
      $alerts = $alerts
    }, 3000)
  }
  $userToken = localStorage.getItem("token")


  const api = new ApiHelper()

  const fetchUserData = async () => {
    const userData = await api.getUserInfo($userToken)
    $user = userData?.data?.data
  }

  $: if($userToken) {
    fetchUserData()
  }


  const addAlert = writable((text) => {
    addTestAlert(text)
  })

  setContext('user', user)
  setContext('userToken', userToken)
  setContext('alerts', alerts)
  setContext('addAlerts', addAlert)
</script>

<slot/>
