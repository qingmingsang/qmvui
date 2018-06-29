<template>
  <transition name="cmpt-modal">
    <div 
      v-show="visible"
      class="cmpt-modal"
      @click.self="clickModalEvent"
    >
      <div class="util-center cmpt-modal__container">
        <div class="cmpt-modal__title">
          {{title}}
          <div @click="hide" class="cmpt-modal__close">
            <i class="el-icon-close"></i>
          </div>
        </div>
        <div class="cmpt-modal__content">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>    
</template>

<script>

export default {
  name: 'cmpt-modal',
  model: {
    prop: 'visible',
    event: 'modelChange'
  },
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    visible: {
      type: Boolean,
      default: false
    },
    clickModal: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (this.visible === true) {
      document.body.style.overflow = 'hidden';
    }
  },
  watch: {
    visible: function (val) {
      if (val === true) {
        document.body.style.overflow = 'hidden';
        //window.addEventListener('wheel', this.eventWheel, { passive: false });
      } else if (val === false) {
        document.body.style.overflow = '';
        //window.removeEventListener('wheel', this.eventWheel, { passive: false });
      }
    }
  },
  methods: {
    hide() {
      this.$emit('modelChange', false);
    },
    clickModalEvent(e) {
      //if (e.target.className == 'cmpt-modal') {
      if (this.clickModal) {
        this.hide();
      }
      //}
    },
    eventWheel(e) {
      let el = this.$el.querySelector('.cmpt-modal__content');
      let ch = el.clientHeight;
      let sh = el.scrollHeight;
      if (sh > ch) {
        //有内部滚动条
        let st = Math.ceil(el.scrollTop);
        if (e.wheelDelta < 0) {
          //下滚
          if (ch + st == sh) {
            e.preventDefault();
          }
        } else {
          //上滚
          if (st == 0) {
            e.preventDefault();
          }
        }
      } else {
        //无内部滚动条
        e.preventDefault();
      }
    }
  }
}
</script>

<style lang="stylus">
$black = #223344;
$title = 60px;
$maxH = 535px;
$zi = 10;

.cmpt-modal {
  position: fixed;
  z-index: $zi;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  overflow: auto;
}

.cmpt-modal__container {
  width: 780px;
  background: white;
  font-size: 16px;
  color: $black;
  border-radius: 4px;
  display: inline-block;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: #7F7F7F;
    cursor: pointer;
    border-radius: 4px;
  }
}

.cmpt-modal__title {
  height: $title;
  line-height: $title;
  text-align: center;
  font-size: 24px;
  position: relative;
  font-weight: bold;
}

.cmpt-modal__close {
  position: absolute;
  right: 0;
  top: 0;
  color: #C5C8CD;
  width: 50px;
  height: 100%;
  text-align: right;
  line-height: $title;
  box-sizing: border-box;
  padding-right: 20px;
  cursor: pointer;

  >i {
    font-size: 16px;
  }
}

.cmpt-modal__content {
  border-top: 1px solid #EAF0F3;
  padding: 30px 20px;
  box-sizing: border-box;
  max-height: 543px;
  overflow: auto;
}

.cmpt-modal-enter-active {
  animation: cmpt-modal-fade-in 0.3s;
}

.cmpt-modal-leave-active {
  animation: cmpt-modal-fade-out 0.3s;
}

@keyframes cmpt-modal-fade-in {
  0% {
    // transform: translate3d(0, -20px, 0);
    opacity: 0;
  }

  100% {
    // transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes cmpt-modal-fade-out {
  0% {
    // transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  100% {
    // transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}
</style>
