namespace Matchlist {
  type Criteria = { [name: string]: number };
  type Item = { description: string, pre: Criteria, post: Criteria, element?: HTMLElement };
  const criteria: string[] = ["A", "B", "C"];

  const input: Item = { description: "Input", pre: {}, post: {} };
  const items: Item[] = [];

  window.addEventListener("load", start);


  function start(): void {
    console.log("Starting");
    setupInput();
    createItems(10);
    document.addEventListener("input", processInput);
  }

  function setupInput(): void {
    const parent: HTMLElement = document.querySelector("fieldset#Input");
    for (const criterion of criteria) {
      parent.children[1].innerHTML += `<span>${criterion}</span>`;
      parent.children[2].innerHTML += `<input type="range" value="0" max="4" name="${criterion}"/>`;
      parent.children[3].innerHTML += `<input type="range" value="0" max="4" name="${criterion}"/>`;
    }
  }

  function createItems(_nItems: number): void {
    const list: HTMLElement = document.querySelector("fieldset#Items");

    for (let iItem: number = 0; iItem < _nItems; iItem++) {
      const div: HTMLElement = document.createElement("div");
      const pre: HTMLElement = document.createElement("span");
      const post: HTMLElement = document.createElement("span");

      const item: Item = {
        description: "Item" + iItem, pre: {}, post: {}, element: div
      };

      pre.innerHTML = "Pre ";
      post.innerHTML = "Post ";

      for (const criterion of criteria) {
        let value: number;
        value = Math.floor(Math.random() * 5);
        item.pre[criterion] = value;
        pre.innerHTML += criterion + ":" + value + " ";
        value = Math.floor(Math.random() * 5);
        item.post[criterion] = Math.floor(Math.random() * 5);
        post.innerHTML += criterion + ":" + value + " ";
      }

      div.innerHTML += item.description;
      div.appendChild(pre);
      div.appendChild(post);
      // div.style.order = "" + (10 - iItem);

      list.appendChild(div);
      items.push(item);
    }
  }

  function processInput(): void {
    const formPre: HTMLFormElement = <HTMLFormElement>document.querySelectorAll("fieldset#Input form")[1];
    const formPost: HTMLFormElement = <HTMLFormElement>document.querySelectorAll("fieldset#Input form")[2];
    input.pre = <Criteria><unknown>Object.fromEntries(new FormData(formPre));
    input.post = <Criteria><unknown>Object.fromEntries(new FormData(formPost));
    console.log(input);

    sort();
  }
  function sort(): void {
    for (const item of items) {
      const match: number = compare(item);
      item.element.style.order = match.toString();
      console.log(item.description, match);
    }
  }

  function compare(_item: Item): number {
    let match: number = 0;
    let matchPre: number = 0;
    let matchPost: number = 0;

    for (const criterion of criteria) {
      matchPre += Math.abs(input.pre[criterion] - _item.pre[criterion]);
      matchPost += Math.abs(input.post[criterion] - _item.post[criterion]);
    }

    match = matchPre + matchPost;
    return match;
  }
}


