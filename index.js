// https://jasonformat.com/wtf-is-jsx/

let App = (
  <div id="foo">
    <span>Hello</span>!<span>Hello</span>
    <span>Hello</span>
  </div>
);

// transpiled JSX => virtual DOM
// function name must match transpiled JSX (check .babelrc)
// h == React.createElement
function h(nodeName, attributes, ...args) {
  let children = args.length ? [].concat(...args) : null;
  return { nodeName, attributes, children };
}

// virtual DOM => real DOM
function render(vnode) {
  // Strings just convert to #text Nodes:
  if (vnode.split) return document.createTextNode(vnode);

  // create a DOM element with the nodeName of our VDOM element:
  let n = document.createElement(vnode.nodeName);

  // copy attributes onto the new node:
  let a = vnode.attributes || {};
  Object.keys(a).forEach(k => n.setAttribute(k, a[k]));

  // render (build) and then append child nodes:
  (vnode.children || []).forEach(c => n.appendChild(render(c)));

  return n;
}

document.addEventListener("DOMContentLoaded", () => {
  let dom = render(App);
  document.querySelector("#root").appendChild(dom);
});

console.log(foo);
