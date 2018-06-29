<template>
  <textarea 
    class="cmpt-textarea"
    :value="value"
    :placeholder="placeholder"
    :maxlength="maxlength"
    @input="changeValue"
    :class="{
        'is-resize': resize
    }"
  />
</template>

<script>

export default {
  name: 'cmpt-textarea',
  model: {
    prop: 'value',
    event: 'modelChange'
  },
  props: {
    value: {
      type: String
    },
    placeholder: {
      type: String
    },
    maxlength: {
      type: [String, Number],
      default: 500
    },
    resize: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    changeValue(e) {
      this.$emit('modelChange', e.target.value);
    }
  }
}
</script>

<style lang="stylus">
$grey = #B4C4D6;
$black = #223344;
$blue = #2681FF;

.cmpt-textarea {
  padding: 10px 12px;
  color: $black;
  border: 1px solid $grey;
  font-size: 14px;
  box-sizing: border-box;
  width: 620px;
  min-height: 38px;
  overflow: auto;
  resize: none;

  &:focus {
    border-color: $blue;
    outline: none;
  }

  &::placeholder {
    color: $grey;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(196, 196, 196, 0.6);
    cursor: pointer;

    &:hover {
      background: rgb(196, 196, 196);
    }
  }

  &.is-resize {
    resize: vertical;
  }
}
</style>
