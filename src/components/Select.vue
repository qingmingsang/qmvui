<template>
  <div 
    class="cmpt-select"
    @click="changeShow"
    :class="{
      'is-active': showOption,
      'is-noborder': noborder
    }"
  >
    <span v-if="defaultValue">{{defaultValue}}</span>
    <span class="cmpt-select__placeholder" v-else>{{placeholder}}</span>
    <i class="el-icon-arrow-down util-vc cmpt-select__icon"></i>
    <transition name="cmpt-select">
      <ul v-show="showOption" class="cmpt-select__option">
        <li 
          class="cmpt-select__item"
          :class="{
            'is-selected': v.value==value,
          }"
          :key="k"
          v-for="(v,k) in option"
          @click="(e)=>changeValue(e,v)"
        >
          {{v.name}}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'cmpt-select',
  model: {
    prop: 'value',
    event: 'modelChange'
  },
  props: {
    option: {
      type: Array,
      default: [{}]
    },
    value: {
      type: [String, Number]
    },
    placeholder: {
      type: String
    },
    prefix: {
      type: String,
      default: ''
    },
    noborder: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      showOption: false
    }
  },
  computed: {
    defaultValue: function () {
      if (this.value || (typeof this.value == 'number')) {
        let dv = this.option.find((v) => {
          return v.value == this.value;
        }) || {};
        return dv.name || (this.prefix + this.value);
      }
    }
  },
  watch: {
    showOption: function (val) {
      if (val) {
        document.body.addEventListener('click', this.clickOutside);
      } else {
        document.body.removeEventListener('click', this.clickOutside);
      }
    }
  },
  methods: {
    changeValue(e, v) {
      this.$emit('modelChange', v.value);
    },
    changeShow(e) {
      this.showOption = !this.showOption;
      e.stopPropagation();
    },
    clickOutside(event) {
      if (event.currentTarget == document.body) {
        this.showOption = !this.showOption;
        document.body.removeEventListener('click', this.clickOutside);
      }
    }
  }
}
</script>

<style lang="stylus">
$grey = #B4C4D6;
$blue = #2681FF;
$lblue = #EBF7FF;
$black = #223344;
$h = 30px;

.cmpt-select {
  width: 355px;
  border: 1px solid $grey;
  box-sizing: border-box;
  padding: 6px 25px 6px 1px;
  color: $black;
  font-size: 14px;
  font-weight: bold;
  position: relative;
  height: $h;
  cursor: pointer;
  background: white;

  &:focus {
    border-color: red;
  }
}

.cmpt-select__icon {
  right: 5px;
  color: $grey;
  font-size: 17px;
  font-weight: bold;
  transition: transform 0.3s;
}

.cmpt-select.is-active {
  .cmpt-select__icon {
    transform: rotate(-180deg) translateY(50%);
  }
}

.cmpt-select.is-noborder {
  border-width: 0 0 1px 0;
  background: transparent;
}

.cmpt-select__option {
  position: absolute;
  top: $h - 2;
  left: 0;
  z-index: 1;
  width: 100%;
  box-sizing: border-box;
  font-weight: normal;
  cursor: pointer;
  max-height: 216px;
  overflow: auto;
  padding-bottom: 10px;
  border-top: 1px solid $blue;
}

.cmpt-select__item {
  height: 36px;
  box-sizing: border-box;
  padding: 10px;
  font-size: 14px;
  color: $black;
  width: 100%;
  border-left: 1px solid $blue;
  border-right: 1px solid $blue;
  background: white;

  &:hover {
    background: $lblue;
  }

  &.is-selected {
    background: $blue;
    color: white;
  }

  &:last-child {
    border-bottom: 1px solid $blue;
  }
}

.cmpt-select__placeholder {
  font-weight: normal;
  color: $grey;
}

.cmpt-select-enter-active {
  transform-origin: top;
  animation: cmpt-select-fade-in 0.3s;
}

.cmpt-select-leave-active {
  transform-origin: top;
  animation: cmpt-select-fade-out 0.3s;
}

@keyframes cmpt-select-fade-in {
  0% {
    transform: scaleY(0.5);
    opacity: 0;
  }

  100% {
    transform: scaleY(1);
    opacity: 1;
  }
}

@keyframes cmpt-select-fade-out {
  0% {
    transform: scaleY(1);
    opacity: 1;
  }

  100% {
    transform: scaleY(0.5);
    opacity: 0;
  }
}
</style>
