<template>
  <div 
    class="cmpt-validator" 
    :class="{'is-error':fail}"
  >
    <div class="cmpt-validator__title" v-if="title">
      {{title}}<span v-if="required">*</span>
    </div>
    <slot></slot>
    <div 
      class="util-bfc cmpt-validator__tips" 
      v-if="errorMessage||tips"
    >
      <span v-if="fail&&errorMessage">{{errorMessage}}</span>
      <p v-else-if="tips">{{tips}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cmpt-validator',
  props: {
    tips: {
      type: String
    },
    errorMessage: {
      type: String
    },
    //required调用validate()时必校验,如果有title则会带*
    required: {
      type: Boolean,
      default: false
    },
    //如果有校验function则优先使用校验function,
    //注意return值应是boolean防止出问题
    reg: {
      type: Function
    },
    //需要校验的值
    value: [String, Number, Object, Array],
    //trigger带.sync则校验值变化就会触发校验
    //不带.sync则是由trigger完全控制
    trigger: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    //校验类型
    type: {
      type: String
    }
  },
  computed: {
    fail: function () {
      let state = this.verify(this.value);
      return this.trigger && !state;
    },
    verify: function () {
      if (this.reg) {
        return this.reg;
      }
      switch (this.type) {
        case 'textarea':
          return this.textareaValidator;
        case 'email':
          return this.emailValidator;
        case 'phone':
          return this.phoneValidator;
        case 'name':
          return this.nameValidator;
        default:
          return this.dafaultValidator;
      }
    },
  },
  watch: {
    value: function (val, oldVal) {
      //这里的val和oldVal可能做过特殊处理的,可以对比object
      if (val != oldVal) {
        this.changeTrigger();
      }
    }
  },
  methods: {
    //validate()获取校验结果
    //用validate()触发校验不可关闭,除非手动更改trigger
    validate() {
      let state;
      if (this.required) {
        this.changeTrigger();
        state = true;
      } else {
        state = this.trigger;
      }
      return state && this.verify(this.value);
    },
    changeTrigger() {
      if (!this.trigger) {
        this.$emit('update:trigger', true);
      }
    },
    dafaultValidator(v) {
      if (v || (typeof v == 'number')) {
        return true
      } else {
        return false
      }
    },
    nameValidator(v) {
      //不能输入特殊符号  /^[^!@#$%^&*()]+$/
      //只能输入英文
      return /^[A-Za-z]+$/.test(v);
    },
    textareaValidator(v) {
      if (v.trim().length > 5) {
        return true;
      }
      return false;
    },
    emailValidator(v) {
      //可输入字母、数字、句点'.'、连字符'-'和下划线'_'以及’@'
      //不能输入汉字以及特殊字符，如：!#$%^&* 等，禁止输入空格
      const y = '[\\w\\.-]+';
      const reg = new RegExp(`^${y}@${y}\\.${y}$`);
      return reg.test(v);
    },
    numberValidator(v) {
      return /^\d+$/.test(v);
    },
    phoneValidator(v) {
      // {
      //   ac:'',区号
      //   tel:''手机号
      // }
      if (v.ac == 86) {
        return /^\d{11}$/.test(v.tel);
      } else {
        return this.numberValidator(v.ac) && this.numberValidator(v.tel);
      }
    }
  }
}
</script>

<style lang="stylus">
$black = #234;
$red = #E30609;

.cmpt-validator {
  font-size: 12px;
  color: $black;
  position: relative;
}

.cmpt-validator__title {
  margin-bottom: 1px;

  >span {
    margin-left: 2px;
  }
}

.cmpt-validator__tips {
  >span {
    padding-top: 5px;
    color: $red;
    display: inline-block;
  }

  >p {
    padding-top: 5px;
  }
}

.cmpt-validator.is-error {
  .cmpt-textarea {
    border-color: $red;
  }

  .cmpt-input {
    border-color: $red;
  }

  .cmpt-radio_label {
    border-color: $red;
  }

  .cmpt-select {
    border-color: $red;
  }

  .t-area-code {
    border-color: $red;
  }
}
</style>
