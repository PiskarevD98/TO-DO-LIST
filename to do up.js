let=todoArray =[];
const createAppTitle= (title) =>{
const appTitle=document.createElement('h1');
    appTitle.innerHTML=title;

    return appTitle;
}
const createTodoForm = () =>{
    const form=document.createElement('form');
    const input = document.createElement('input');
    const addbutton=document.createElement('button');
    const wrapper=document.createElement('div')

    addbutton.disabled=!input.value.length;

    input.addEventListener('input', () => {
        addbutton.disabled=!input.value.length;
    });

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder='and what shall we do?';
    addbutton.classList.add('btn', 'btn-primary');
    wrapper.classList.add('input-group-append');
    addbutton.textContent='Add';

    wrapper.append(addbutton);
    form.append(input);
    form.append(wrapper);

    return {
        form,
        input,
        addbutton
    }

}

const createToDoList = () =>{
    const list = document.createElement('ul');
    list.classList.add('list-group');

    return list;

}
const createToDoItem = (name) =>{
const todoItem=document.createElement('li');
const btnWrapper=document.createElement('div');
const doneBtn = document.createElement('button');
const deleteBtn= document.createElement('button');

const randomId=Math.random() * 15.75;
todoItem.id=randomId.toFixed(2);


todoItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
doneBtn.classList.add('btn', 'btn-success');
deleteBtn.classList.add('btn', 'btn-danger');
todoItem.textContent= name;
doneBtn.textContent='Done';
deleteBtn.textContent='Delete';

btnWrapper.append(doneBtn, deleteBtn);
    todoItem.append(btnWrapper);

return{
    todoItem,
    deleteBtn,
    doneBtn,
    btnWrapper
}
}
const changeItemDone = (arr, item) => {
    arr.map(obj => {
        if (obj.id === item.id & obj.done === false){
            obj.done = true;
        } else if(obj.id === item.id & obj.done === false){
            obj.done = false;
        }
    });
}
const completeToDoItem=(item,btn)=>{
    btn.addEventListener('click' , () => {
        todoArray = JSON.parse(localStorage.getItem(key));
        item.classList.toggle('list-group-item-success');
        changeItemDone(todoArray,item);

        localStorage.setItem(key, JSON.stringify(todoArray));

    });
}
const deleteToDoItem=(item,btn)=>{
btn.addEventListener('click' , () => {
    if(confirm('Are you sure?')){
        todoArray = JSON.parse(localStorage.getItem(key));

        const newList=todoArray.filter(obj => obj.id !== item.id);

        localStorage.setItem(key, JSON.stringify(newList));
    item.remove();
    }
});
}
function createTodoApp(container,title,key ){
    const appTitle= createAppTitle(title);
    const appForm=createTodoForm();
    const appList=createToDoList();

    container.append(appTitle,appForm.form,appList);

    if(localStorage.getItem(key)){
        todoArray= JSON.parse(localStorage.getItem(key))

        for( const obj of todoArray){
            const todoItem=createToDoItem(appForm.input.value);
            
            todoItem.todoItem.textContent = obj.name;
            todoItem.todoItem.id = obj.id;


            if (obj.done == true) {
                todoItem.todoItem.classList.add('list-group-item-success');
            }else{
               console.dir( todoItem)
                todoItem.todoItem.classList.remove('list-group-item-success');
            }

            completeToDoItem(todoItem.todoItem,todoItem.doneBtn);
            deleteToDoItem(todoItem.todoItem,todoItem.deleteBtn);

            appList.append(todoItem.todoItem);
            todoItem.todoItem.append(todoItem.btnWrapper);
        }
    }

    appForm.form.addEventListener('submit', e => {
        e.preventDefault();

        const todoItem=createToDoItem(appForm.input.value);

        if (!appForm.input.value){
            return;
        }
        completeToDoItem(todoItem.todoItem,todoItem.doneBtn);
        deleteToDoItem(todoItem.todoItem,todoItem.deleteBtn);

        let localStorageData = localStorage.getItem(key);

        if(localStorageData == null){
            todoArray = [];
        } else{
            todoArray = JSON.parse(localStorageData);
        }



        const createItemObj = (arr) =>{
            const itemObj={};
            itemObj.name=appForm.input.value;
            itemObj.id= todoItem.todoItem.id;
            itemObj.done=false;

            arr.push(itemObj);
        }
        createItemObj(todoArray);
        localStorage.setItem(key, JSON.stringify(todoArray));

        appList.append(todoItem.todoItem);
        appForm.input.value='';
        appForm.addbutton.disabled=!appForm.addbutton.disabled;
    })

}