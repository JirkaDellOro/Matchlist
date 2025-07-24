var Matchlist;
(function (Matchlist) {
    const criteria = ["A", "B", "C"];
    const input = { description: "Input", pre: {}, post: {} };
    const items = [];
    window.addEventListener("load", start);
    function start() {
        console.log("Starting");
        setupInput();
        createItems(10);
        document.addEventListener("input", processInput);
    }
    function setupInput() {
        const parent = document.querySelector("fieldset#Input");
        for (const criterion of criteria) {
            parent.children[1].innerHTML += `<span>${criterion}</span>`;
            parent.children[2].innerHTML += `<input type="range" value="0" max="4" name="${criterion}"/>`;
            parent.children[3].innerHTML += `<input type="range" value="0" max="4" name="${criterion}"/>`;
        }
    }
    function createItems(_nItems) {
        const list = document.querySelector("fieldset#Items");
        for (let iItem = 0; iItem < _nItems; iItem++) {
            const div = document.createElement("div");
            const pre = document.createElement("span");
            const post = document.createElement("span");
            const item = {
                description: "Item" + iItem, pre: {}, post: {}, element: div
            };
            pre.innerHTML = "Pre ";
            post.innerHTML = "Post ";
            for (const criterion of criteria) {
                let value;
                value = Math.floor(Math.random() * 5);
                item.pre[criterion] = value;
                pre.innerHTML += criterion + ":" + value + " ";
                value = Math.floor(Math.random() * 5);
                item.post[criterion] = value;
                post.innerHTML += criterion + ":" + value + " ";
            }
            div.innerHTML += item.description;
            div.appendChild(pre);
            div.appendChild(post);
            list.appendChild(div);
            items.push(item);
        }
    }
    function processInput() {
        const formPre = document.querySelectorAll("fieldset#Input form")[1];
        const formPost = document.querySelectorAll("fieldset#Input form")[2];
        input.pre = Object.fromEntries(new FormData(formPre));
        input.post = Object.fromEntries(new FormData(formPost));
        console.log(input);
        sort();
    }
    function sort() {
        const matches = [];
        const tops = [];
        for (const item of items) {
            tops.push(item.element.getClientRects()[0].top);
            matches.push(compare(item));
        }
        for (const item of items) {
            const match = matches.shift();
            item.element.style.order = match.toString();
            console.log(item.description, match);
        }
        for (const index in items) {
            items[index].element.animate([
                { transformOrigin: 'top left', transform: `translate(${0}px, ${tops[index] - items[index].element.getClientRects()[0].top}px)` },
                { transformOrigin: 'top left', transform: 'none' }
            ], { duration: 1000, easing: 'ease', fill: 'both' });
        }
    }
    function compare(_item) {
        let match = 0;
        let matchPre = 0;
        let matchPost = 0;
        for (const criterion of criteria) {
            matchPre += Math.abs(input.pre[criterion] - _item.pre[criterion]);
            matchPost += Math.abs(input.post[criterion] - _item.post[criterion]);
        }
        match = matchPre + matchPost;
        return match;
    }
})(Matchlist || (Matchlist = {}));
//# sourceMappingURL=Matchlist.js.map