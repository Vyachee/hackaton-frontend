<script>
  export let title = 'title'
</script>

<button class="btn btn-small">{title}</button>

<style lang="scss">
  .btn {
    border-radius: 10px;
    background-color: rgba(61, 61, 61, 0.9);
    color: #fff;
    padding: 7px 13px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    outline: none;
    transition: 0.2s;

    &:hover {
      background-color: #3D3D3D;
      color: #fff;
    }
  }
</style>
