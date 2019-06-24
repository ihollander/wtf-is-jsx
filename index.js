// https://jasonformat.com/wtf-is-jsx/
class NoReact {
  // transpiled JSX => virtual DOM
  // function name must match transpiled JSX (check .babelrc)
  static createElement(nodeName, attributes, ...args) {
    const children = args.length ? [...args] : null;
    return { nodeName, attributes, children };
  }

  // virtual DOM => real DOM
  static render(vnode) {
    // Strings just convert to #text Nodes:
    if (typeof vnode === "string") return document.createTextNode(vnode);

    // create a DOM element with the nodeName of our VDOM element:
    const node = document.createElement(vnode.nodeName);

    // copy attributes onto the new node:
    const attributes = vnode.attributes || {};
    Object.keys(attributes).forEach(key =>
      node.setAttribute(key, attributes[key])
    );

    // render (build) and then append child nodes:
    if (vnode.children.length) {
      // recursively call render on all child nodes
      vnode.children.forEach(child => node.appendChild(NoReact.render(child)));
    }

    return node;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ITEMS = "hello there people".split(" ");

  // turn an Array into list items:
  let list = items => items.map(p => <li> {p} </li>);

  // view with a call out ("partial") to generate a list from an Array:
  let vdom = (
    <div id="foo">
      <p>Look, a simple JSX DOM renderer!</p>
      <ul>{list(ITEMS)}</ul>
    </div>
  );

  // render() converts our "virtual DOM" (see below) to a real DOM tree:
  let dom = NoReact.render(vdom);

  // Remember that "virtual DOM"? It's just JSON - each "VNode" is an object with 3 properties.
  console.log(vdom);

  // The whole process (JSX -> VDOM -> DOM) in one step:
  document.querySelector("#root").appendChild(dom);
});
