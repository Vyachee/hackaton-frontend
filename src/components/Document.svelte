<script>
  import { format } from 'date-fns'

  export let doc
</script>

<div class="doc-item">
    <img src="/assets/img/doc.svg" alt="">
    <div class="doc-item-info">
        <div class="title">{doc?.id}.{doc?.extension}</div>
        <div class="date">{format(new Date(doc?.created_at), 'dd.MM.yyyy HH:mm')}</div>
    </div>
</div>

<style lang="scss">
  .doc-item {
    border-radius: 10px;
    background-color: #DFDFDF;
    padding: 10px 20px;
    display: flex;
    align-items: start;
    width: max-content;
    cursor: pointer;
    transition: 0.2s;
    opacity: 0.8;

    &:hover {
      opacity: 1;
    }

    img {
      margin-right: 10px;
    }

    .title {

    }

    .date {
      color: #747474;
    }
  }
</style>
