window.dom = {
    //增
    create(string){
    const container = document.createElement('template')//不能用div，因为如果中间添加td的话就undefined了，td只能在table/body/tr元素里面，只能用template
    container.innerHTML = string.trim()//trim去掉字符串两边的空格
    return container.content.firstChild//template标签不能支持children[0]
    },
    after(node, node2){
        node.parentNode.insertBefore(node2, node.nextSibling)//把node2插入到node的下一个节点前面
    },
    before(node, node2){
        node.parentNode.insertBefore(node2, node )
    },
    append(parent, node){
        parent.appendChild(node)
    },
    wrap(node, parent){
        dom.before(node, parent)
        dom.append(parent, node)
    },
    //删
    remove(node){
        node.parentNode.removeChild(node)
        return node
    },
    empty(node){
        const {childNodes} = node //等价于const childNodes = node.childNodes
        const array = []
        let x = node.firstChild
        while(x){
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array          //调用remove每次删除node里面的第一个孩子并返回值用于push到空数组array里面，最后返回array，array里面是删掉的孩子
    },
    //改

    attr(node, name, value){   //重载
        if(arguments.length === 3){
        node.setAttribute(name, value)  //改value
    }else if(arguments.length === 2){
        return node.setAttribute(name)   //读属性
    }
    },
    text(node, string){    
        if(arguments.length === 2){
            if('innerText' in node){     //适配
            node.innerText = string
        }else{
            node.textContent = string
        }
        }else if(arguments.length === 1){
            if('innerText' in node){
                return node.innerText
            }else{
                return node.textContent
            }
        }
    },
    html(node, string){
        if(arguments.length === 2){
            node.innerHTML = string
        }else if(arguments.length === 1){
            return node.innerHTML
        }
    },
    style(node, name, value){
        if(arguments.length === 3){
            //dom.style(div, 'color', 'red')
            node.style[name] = value
        }else if(arguments.length === 2){
            if(typeof name === 'string'){
                //dom.style(div, 'color')
                return node.style[name]
            }else if(name instanceof Object){
                //dom.style(div, {color: 'red', border:1px solid red})
                const object = name
                for(let key in object){
                    //key: color / border
                    node.style[key] = object[key]
                }
            }
            
        }
    },
    class:{
        add(node, className){
            node.classList.add(className)
        },
        remove(node, className){
            node.classList.remove(className)
        },
        has(node, className){
            //读class，看它有没有
            return node.classList.contains(className)
        }
    },
    on(node, eventName, fn){
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn){
        node.removeEventListener(eventName, fn)
    },
    //查
    find(selector, scope){   //scope范围, 比如，在div1这个范围里面，里面找div2，就需要用到scope
        return (scope || document).querySelectorAll(selector)
    },
    parent(node){
        return node.parentNode
    },
    children(node){
        return node.children
    },
    siblings(node){
        return Array.from(node.parentNode.children)
        .filter(n=>n !== node)
    },
    next(node){
        let x = node.nextSibling
        while(x && x.nodeType === 3){
            x = x.nextSibling
        }
        return x
    },
    previous(node){
        let x = node.previousSibling
        while(x && x.nodeType === 3){
            x = x.previousSibling
        }
        return x    
    },
    each(nodeList, fn){
        for(let i = 0; i<nodeList.length; i++){
            fn.call(null, nodeList[i])
        }
    },
    index(node){
        const list = dom.children(node.parentNode)
        let i
        for(i =0; i<list.length; i++){
            if(list[i] === node){
                break
            }
        }
        return i
    }
}