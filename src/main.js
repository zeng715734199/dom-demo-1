const div1 = dom.create('<div>newDiv</div>')
console.log(div1)

dom.after(test, div1)

dom.each(test.children, (n) => dom.style(n, 'color', 'red'))
