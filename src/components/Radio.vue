<template>
  <div 
    class="cmpt-radio"
  >
    <input 
      class="cmpt-radio__input"
      :name="name" 
      type="radio" 
      :id="id"
      :value="value"
      @change="changeValue"
      :checked="checked==value"
    >
    <label class="cmpt-radio_label" :for="id">
      <div class="cmpt-radio_fill"></div>
    </label>
    <span @click="changeValue" class="cmpt-radio_desc" v-if="desc">{{desc}}</span>
  </div>
</template>

<script>

export default {
  name: 'cmpt-radio',
  model: {
    prop: 'checked',
    event: 'modelChange'
  },
  props: {
    id: {
      type: [String, Number]
    },
    name: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number]
    },
    checked: {
      type: [String, Number]
    },
    desc: {
      type: String
    },
  },
  methods: {
    changeValue(e) {
      //this.$emit('modelChange', e.target.value);
      this.$emit('modelChange', this.value);
    }
  }
}
</script>

<style lang="stylus">
$w = 14px;
$blue = #2681FF;

.cmpt-radio {
}

.cmpt-radio_label {
  width: $w;
  height: $w;
  border-radius: 50%;
  background: white;
  border: 1px solid #839BAC;
  box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  cursor: pointer;
  user-select: none;

  &:hover {
    filter: brightness(1.1);
  }

  &:active {
    filter: brightness(0.9);
  }
}

.cmpt-radio__input {
  display: none;
}

.cmpt-radio_fill {
  width: $w;
  height: $w;
  border-radius: 50%;
  border: $blue solid 4px;
  transform: scale(0);
  box-sizing: border-box;
  background: inherit;
  position: absolute;
  top: -1px;
  left: -1px;
}

.cmpt-radio__input:checked+ {
  .cmpt-radio_label {
    border-color: transparent;

    .cmpt-radio_fill {
      transform: scale(1);
    }

    &+.cmpt-radio_desc {
      font-weight: bold;
    }
  }
}

.cmpt-radio_desc {
  font-size: 14px;
  color: #223344;
  margin-left: 6px;
  display: inline-block;
  vertical-align: 2px;
  cursor: pointer;
}
</style>
