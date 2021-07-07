import longPress from "./longPress/longPress.vue";
import parent from "./longPress/parent.vue";
import butSpread from './butSpread/index.vue'; //点击涟漪
let components = {
  parent,
  longPress,
  butSpread
};

Object.keys(components).forEach(key => {
  let item = components[key];
  if (!item.install && item.name) {
    item.install = function (Vue) {
      Vue.component(item.name, item);
    };
  }
});
export default components;
