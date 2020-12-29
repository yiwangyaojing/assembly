//UI组件
import Components from './components';
let modules = Object.assign({}, Components);

const install = function(Vue) {
  if (install.installed) return;
  Object.keys(modules).forEach(key => {
    let item = modules[key];
    if (item.install) {
      Vue.use(item);
    }
  });
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default Object.assign(modules, { install });
