// https://jasonformat.com/wtf-is-jsx/
class NoReact {
  // transpiled JSX => virtual DOM
  // function name must match transpiled JSX (check .babelrc)
  static createElement(nodeName, attributes, ...args) {
    let children = args.length ? [...args] : null;
    return {
      nodeName,
      attributes,
      children
    };
  } // virtual DOM => real DOM

  static render(vnode) {
    // Strings just convert to #text Nodes:
    if (vnode.split) return document.createTextNode(vnode); // create a DOM element with the nodeName of our VDOM element:

    let node = document.createElement(vnode.nodeName); // copy attributes onto the new node:

    let attributes = vnode.attributes || {};
    Object.keys(attributes).forEach(key =>
      node.setAttribute(key, attributes[key])
    ); // render (build) and then append child nodes:

    (vnode.children || []).forEach(child =>
      node.appendChild(NoReact.render(child))
    );
    return node;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ITEMS = "hello there people".split(" "); // turn an Array into list items:

  let list = items =>
    items.map(p => NoReact.createElement("li", null, " ", p, " ")); // view with a call out ("partial") to generate a list from an Array:

  let vdom = NoReact.createElement(
    "div",
    {
      id: "foo"
    },
    NoReact.createElement("p", null, "Look, a simple JSX DOM renderer!"),
    NoReact.createElement("ul", null, list(ITEMS))
  ); // render() converts our "virtual DOM" (see below) to a real DOM tree:

  let dom = NoReact.render(vdom); // Remember that "virtual DOM"? It's just JSON - each "VNode" is an object with 3 properties.

  console.log(vdom); // The whole process (JSX -> VDOM -> DOM) in one step:

  document.querySelector("#root").appendChild(dom);
});
