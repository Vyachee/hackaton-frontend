<script>
    export let outgoing = false
</script>

<div class="message" class:outgoing>
    <div class="text">
adsasdasdas
    </div>
    <div class="date">18.04.2022 22:23</div>
</div>


<style lang="scss">
    .message {
      display: flex;
      flex-direction: column;
      .text {
        border-radius: 10px 10px 10px 0;
        background-color: #80BEDD;
        padding: 15px;
        display: inline-flex;
        width: max-content;
      }

      .date {
        color: #3D3D3D;
        font-size: 12px;
        margin-top: 5px;
      }
      &.outgoing {
        justify-content: right;
        align-items: end;
        .text {
          border-radius: 10px 10px 0 10px;
          background-color: #E2E2E2;
        }
        .date {
          margin-left: auto;
          text-align: right;
        }
      }
    }
</style>
