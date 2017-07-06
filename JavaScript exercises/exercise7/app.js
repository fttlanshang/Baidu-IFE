(function() {
    var root = document.getElementById('root');
    var callBackArray = [];
    var call = null, prev = null;
    // call represents the setInterval function, prev represents the previous element being traversed
    function init() {
        createOneDepth(root, 0);
        document.getElementById('preOrder').addEventListener('click', traverse);
        document.getElementById('inOrder').addEventListener('click', traverse);
        document.getElementById('postOrder').addEventListener('click', traverse);
    }

    function createOneDepth(root, depth) {
        for(var i = 0; i < 2; i++) {
            var div = document.createElement('div');
            div.textContent = depth + 1;
            div.setAttribute('id', depth + ':' + i);
            div.style.zIndex = depth;
            root.appendChild(div);
            if(depth === 4) {
                continue;
            }else {
                createOneDepth(div, depth + 1);
            }
        }
    }

    function preOrder(root) {
        if(root == null) {
            return;
        }else {
            callBackArray.push(function(root) {
                return function() {
                    root.style.backgroundColor = 'blue';
                    return root;
                }
            }(root));
            preOrder(root.children[0]);
            preOrder(root.children[1]);
        }
    }

    function inOrder(root) {
        if(root == null) {
            return;
        }else {
            inOrder(root.children[0]);
            callBackArray.push(function(root) {
                return function() {
                    root.style.backgroundColor = 'blue';
                    return root;
                }
            }(root));
            inOrder(root.children[1]);
        }
    }

    function traverse(event) {
        if(call !== null)  { // but the blue still exist
            clearInterval(call);
            callBackArray = [];
            if(prev != null)    prev.style.backgroundColor = 'white';
        }
        var id = event.target.getAttribute('id');
        if(id == 'preOrder') {
            callBackArray.push(function() {
                preOrder(root);
            })
        }else if(id === 'postOrder') {
            callBackArray.push(function() {
                postOrder(root);
            })
        }else {
            callBackArray.push(function() {
                inOrder(root);
            });
        }
        call = setInterval(function() {
            if(callBackArray.length <= 0)  {
                prev.style.backgroundColor = 'white';
                clearInterval(call);
                return;
            }
            if(prev != null)    prev.style.backgroundColor = 'white';
            var func = callBackArray.shift();
            prev = func();
        }, 500);

    }

    function postOrder(root) {
        if(root == null) {
            return;
        }else {
            postOrder(root.children[0]);
            postOrder(root.children[1]);
            callBackArray.push(function(root) {
                return function() {
                    root.style.backgroundColor = 'blue';
                    return root;
                }
            }(root));
        }
    }


    init();
}());