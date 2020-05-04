const app = document.querySelector('#app');

const header = document.createElement('h1');
header.innerText = 'Acme First, Second, Third';


const slots = ['first','second','third'];

const users = [
    { id: 1, name: 'moe', slot: 'first'},
    { id: 2, name: 'larry', slot: 'second'},
    { id: 3, name: 'curly', slot:'third'},
    { id: 4, name: 'lucy', slot: 'third', selected:false}
  ];


const createRightButton = function(className) {
    const moveRightButton = document.createElement('button');
    moveRightButton.setAttribute('id','button')
    moveRightButton.classList.add(className);
    if(className=='third') {
        moveRightButton.classList.add('nocolor')
    }
    moveRightButton.innerText = '>' + className;
    moveRightButton.classList.add(className);
    moveRightButton.addEventListener('click', ev => {
        console.log(ev.target.className)
        for(let i = 0;i<users.length;i++) {
            if(users[i].slot == ev.target.className && users[i].selected) {
                users[i].slot = slots[Math.min(2,slots.indexOf(ev.target.className)+1)]
            }
        }
        render()
        })
    return moveRightButton;
}

const createLeftButton = function(className) {
    const moveLeftButton = document.createElement('button');
    moveLeftButton.setAttribute('id','button')
    moveLeftButton.classList.add(className);
    if(className=='first') {
        moveLeftButton.classList.add('nocolor')
    }
    moveLeftButton.innerText = '<' + className;
    moveLeftButton.classList.add(className);
    moveLeftButton.addEventListener('click', ev => {
    console.log(ev.target.className)
    for(let i = 0;i<users.length;i++) {
        if(users[i].slot == ev.target.className && users[i].selected) {
            users[i].slot = slots[Math.max(0,slots.indexOf(ev.target.className)-1)]
        }
    }
    render()
    })
    return moveLeftButton;
}

const createUser = function(id,name, slot) {
    const user = document.createElement('div');
    user.setAttribute('id','user');
    user.innerText = name;
    user.classList.add(slot);
    user.addEventListener('click',ev=>{
    console.log(ev.target.innerText)
    console.log(ev.target)
    for(let i = 0;i<users.length;i++) {
        if(users[i].name == ev.target.innerText) {
            users[i].selected = !users[i].selected;
            console.log(users[i].selected)
        }    
    }
    render()
    });
    return user;
}

const firstColumn = document.createElement('h2');
firstColumn.innerText = 'First';
firstColumn.classList.add('first');


const secondColumn = document.createElement('h2');
secondColumn.innerText = 'Second';
firstColumn.classList.add('second');

const thirdColumn = document.createElement('h2');
thirdColumn.innerText = 'Third';
thirdColumn.classList.add('third');

const render = function() {
    app.innerHTML = '';
    app.append(header);
    for(let i = 0;i<slots.length;i++) {
        app.append(createLeftButton(slots[i]));
        app.append(createRightButton(slots[i]));
    }
    for(let i = 0;i<users.length;i++) {
        const id = users[i].id;
        const name = users[i].name;
        const slot = users[i].slot;
        const selected = users[i].selected;
        console.log(name + ' is '+slot)
        const user = createUser(id,name,slot);
        if(selected) {
            user.classList.add('selected')
        }
        else {
            user.classList.remove('selected')
        }
        app.append(user);
        }
    app.append(firstColumn);
    app.append(secondColumn);
    app.append(thirdColumn);

}

render();