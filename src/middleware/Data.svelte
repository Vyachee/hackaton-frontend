<script>

  // import { user } from '../utils/api'
  import { getContext, setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { ApiHelper } from '../utils/api'
  import Pusher from 'pusher-js'
  // import * as PusherPushNotifications from "@pusher/push-notifications-web";

  const user = writable(null)
  const userToken = writable(null)
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
  $userToken = localStorage.getItem('token')

  const api = new ApiHelper()

  const addAlert = writable((text) => {
    addTestAlert(text)
  })

  const fetchUserData = async () => {
    const userData = await api.getUserInfo($userToken)
    $user = userData?.data?.data

    const pusher = new Pusher('e03ea6c808a65eccf709', {
      cluster: 'eu'
    })
    const channel = pusher.subscribe(`${$user?.id}`)
    channel.bind('approved', function (data) {
      addTestAlert(data?.message || data)
    })
    channel.bind('chat', function (data) {
      addTestAlert(data?.message?.message || data)
    })
  }

  $: if ($userToken) {
    fetchUserData()
  }

  setContext('user', user)
  setContext('userToken', userToken)
  setContext('alerts', alerts)
  setContext('addAlerts', addAlert)
</script>

<slot/>
