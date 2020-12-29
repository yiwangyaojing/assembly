<template>
  <div class="product-long-press" ref="productLongPress">
    <editModel class="edit-model" ref="editModelRef" @del="del" :index="data.index || null" @goTop="goTop" :class="sysModelClass" :style="{ left, top }" />
    <slot> </slot>
  </div>
</template>
<script>
import editModel from './editModel';
export default {
  components: {
    editModel
  },
  data() {
    return {
      left: 0,
      top: 0,
      sysModelClass: 'hide',
      fromTheTop: 0,
      data: {}
    };
  },
  beforeDestroy() {
    console.log('组件销毁');
    document.removeEventListener('touchstart', this.fn.bind(this), false);
  },
  mounted() {
    document.addEventListener('touchstart', this.fn.bind(this), false);
    this.$evtBus.$on('val', data => {
      this.data = data;
      this.showEditModel(data.x, data.y);
    });
    this.$evtBus.$on('checkExistence', fn => {
      if (this.sysModelClass == 'hide') {
        fn();
      } else {
        this.hideEditModel();
      }
    });
    this.$evtBus.$on('hideEditModel', fn => {
      this.hideEditModel();
    });
  },
  methods: {
    fn() {
      setTimeout(() => {
        this.hideEditModel();
      }, 600);
    },
    del() {
      this.$emit('del', this.data);
      this.hideEditModel();
    },
    goTop() {
      this.$emit('goTop', this.data);
      this.hideEditModel();
    },
    hideEditModel() {
      this.sysModelClass = 'hide';
      this.left = 0;
    },
    showEditModel(startX, startY) {
      this.sysModelClass = 'show';
      // this.hideEditModel();
      this.$nextTick(() => {
        if (!this.$refs || !this.$refs.productLongPress || !this.$refs.editModelRef) return;
        this.fromTheTop = this.$refs.productLongPress.getBoundingClientRect().top || 0;
        let equipmentWidth = document.body.clientWidth;
        let boxWidth = this.$refs.editModelRef.$el.offsetWidth;
        let boxHeight = this.$refs.editModelRef.$el.offsetHeight;
        //设置x轴的位置 如果屏幕的宽度减去手指到左侧的宽度 小于 弹窗的宽度,那么就要重置弹窗出现时left的距离
        if (equipmentWidth - Math.ceil(startX) <= boxWidth) {
          this.left = equipmentWidth - boxWidth - 5 + 'px';
        } else {
          this.left = Math.ceil(startX) + 'px';
        }
        this.top = Math.ceil(startY) - this.fromTheTop - 1 - boxHeight + 'px';
      });
    }
  }
};
</script>
<style lang="scss">
.product-long-press {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex: 1;
  .edit-model {
    z-index: 100;
    position: absolute;
    top: -32px;
  }
}
</style>
