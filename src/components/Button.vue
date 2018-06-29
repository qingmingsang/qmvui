<template>
  <div 
    v-on="$listeners"
    class="cmpt-button"
    :class="[
      type ? 'cmpt-button--' + type : '',
      size ? 'cmpt-button--' + size : '',
      {
        'is-disabled': disabled,
        'is-plain': plain
      }
    ]"
  >
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'cmpt-button',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus">
$blue = #288EF2;
$orange = #FFA900;
$grey = #B4C4D6;
$dw = 44px;
$dh = 160px;

.cmpt-button {
  border-radius: 4px;
  width: 160px;
  height: 44px;
  background: $blue;
  color: white;
  font-size: 16px;
  text-align: center;
  line-height: 44px;
  transition: background 0.3s;
  cursor: pointer;
  box-sizing: border-box;
  user-select: none;

  &:hover {
    background: #1A5DBA;
  }
}

.cmpt-button.is-plain {
  background: white;
  color: $blue;
  border: 1px solid $blue;

  &:hover {
    background: $blue;
    color: white;
  }
}

.cmpt-button.is-disabled {
  background: white;
  cursor: not-allowed;
  color: $grey;
  border: 1px solid $grey;

  &:hover {
    background: white;
    color: $grey;
  }
}

.cmpt-button--important {
  background: $orange;
  font-weight: bold;

  &:hover {
    background: #FF7200;
  }

  &.is-plain {
    border: 1px solid $orange;
    color: $orange;
  }

  &.is-disabled {
    background: $orange;
  }
}

.cmpt-button--small {
  width: 150px;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
}
</style>
