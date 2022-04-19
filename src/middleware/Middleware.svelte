<script>
  import Data from './Data.svelte'
  import Alerts from '../components/Alerts.svelte'
</script>

<Data>
    <Alerts>
        <slot/>
    </Alerts>
</Data>
