<script>
  import { createEventDispatcher } from 'svelte'
  import {fade} from 'svelte/transition'

  import Select from 'svelte-select';
  export let title = 'title'
  export let placeholder = 'title'
  export let value = null

  export let items = [{
    id: 1,
    name: 'Рубли',
    symbol: '₽'
  }]

  export let selectedId = null
  export let filteredText

  const handleSelect = (event) => {
    value = event.detail
    selectedId = value?.id
  }

  const onClear = (detail) => {
    selectedId = null
  }

  const dispatch = createEventDispatcher()

</script>

<div class="input">
    <span>{title}</span>
    <Select bind:items bind:value bind:filterText={filteredText} optionIdentifier="id" {placeholder} labelIdentifier="name"
            on:select={handleSelect}
            on:clear={onClear}
    />
    {#if !selectedId && !filteredText}
        <img src="/assets/img/caret.svg" alt="" class="caret" transition:fade={{duration: 100}}>
    {/if}
</div>

<style lang="scss">
  :global(.selectContainer, .selectContainer input) {
    border-radius: 10px !important;
    background-color: #f1f1f1 !important;
    padding: 13px 20px !important;
    color: #000 !important;
    border: none !important;
    outline: none !important;
    transition: 0.2s !important;
    cursor: pointer !important;
  }

  :global(.selectContainer .selectedItem) {
    position: absolute !important;
    font-size: 14px;
  }

  .input {
    display: flex;
    flex-direction: column;
    position: relative;
    .caret {
      position: absolute;
      bottom: 15px;
      right: 15px;
      height: 10px;
      transform: rotate(180deg);
    }
    span {
      font-size: 18px;
      margin-bottom: 13px;
    }

    input {
      border-radius: 10px;
      background-color: #f1f1f1;
      padding: 13px 20px;
      color: #000;
      border: none;
      outline: none;
      transition: 0.2s;

      &:focus {
        box-shadow: 0 2px 5px rgba(0, 0, 0, .1);
      }

      &::placeholder {
        color: #515151;
      }
    }
  }
</style>
