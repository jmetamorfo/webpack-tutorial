import Vue from 'vue';
import ready from './utils/ready';
import * as DefComponents from './components/LoremIpsum.vue';

class VueLib {
  constructor() {
    if( window.IntersectionObserver) {
      this.io = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
          var entry = entries[i];
          if (entry.isIntersecting) {
            entry.target.mount();
            this.unobserve(entry.target);
          }
        }
      }, {
        rootMargin: "20px",
        threshold: 0
      });
    }

    if( window.MutationObserver ) {
      this.mo = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (!mutation.addedNodes) return;

          mutation.addedNodes.forEach((node) => {
            if (node.dataset && node.dataset.vue && !node.dataset.widgetized) {
              this.widgetize(node);
              this.io.observe(node);
            }
          });
        });
      });
    }


    this.components = Object.assign({}, DefComponents);

    this.vue = new Vue();

    this.selector = "[data-vue]";
  }

  getInstance() {
    return this.vue;
  }

  setStore(store){
    this.store = store;
  }

  setUse(use){
    this.vue.$options._base.use(use);
  }

  widgetize(node) {
    if (node.dataset.widgetized) return;

    node.dataset.widgetized = true;

    node.mount = () => {
      let wgtComponents = {};

      node.dataset.vue.split(",").forEach(i => {
        if (i === "*") {
          wgtComponents = this.components;
        } else if (this.components[i]) {
          wgtComponents[i] = this.components[i];
        }
      });

      new Vue({ el: node, components: wgtComponents, store: this.store });
    }
  }

  component(name, comp) {
    this.vue.component(name, comp)
  }

  setComponents (obj) {
    this.components = Object.assign(this.components, obj);
  }

  process() {
    var nodes = document.querySelectorAll(this.selector);

    nodes.forEach((node) => {
      this.widgetize(node);
      if( window.IntersectionObserver ) {
        this.io.observe(node);
      } else {
        node.mount();
      }
    });

    if (window.MutationObserver) {
      this.mo.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
    }
  }
}

let vueLib = new VueLib()
ready("ready", vueLib);
vueLib.ready(vueLib.process.bind(vueLib));

export default vueLib;


