<template>
  <input 
    class="cmpt-input" 
    type="text"
    :value="value"
    :placeholder="placeholder"
    @input="changeValue"
    :maxlength="maxlength"
    :class="{
      'is-noborder': noborder
    }"
  >
</template>

<script>

export default {
  name: 'cmpt-input',
  model: {
    prop: 'value',
    event: 'modelChange'
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    noborder: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number]
    },
    placeholder: {
      type: String
    },
    maxlength: {
      type: [String, Number],
      default: 50
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
$blue = #2681FF;
$black = #223344;
$w = 30px;

.cmpt-input {
  border: 1px solid $grey;
  padding: 6px 1px;
  box-sizing: border-box;
  width: 355px;
  font-size: 14px;
  font-weight: bold;
  color: $black;
  height: $w;

  &:focus {
    border-color: $blue;
    outline: none;
  }

  &::placeholder {
    color: $grey;
    font-weight: normal;
  }

  &.is-noborder {
    border-width: 0 0 1px 0;
    background: transparent;
  }
}
</style>
