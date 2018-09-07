let todos = [];


//check if local storage contains anyting

if(JSON.parse(localStorage.getItem('list'))!==null)
todos = JSON.parse(localStorage.getItem('list'));



let getSummary = function()
{
    let High=0;``
    let Low=0;
    let Medium=0;

    todos.forEach( function(todoitem){
       if(todoitem.Priority ==='High'&& todoitem.completed===false)
           High++;

       if(todoitem.Priority ==='Low'&& todoitem.completed===false)
           Low++;
           
        if(todoitem.Priority ==='Medium'&& todoitem.completed===false)
        Medium++;
    })

    document.querySelector('#summary').textContent=`Total Tasks : ${High+Low+Medium} -- High:${High} -- Medium: ${Medium} -- Low:${Low}`
}



getSummary();
    

let searchText='';
let filteredTodo=todos;

    function addItem(title,desc,Priority){

   
            timestamp = moment().valueOf()
            

          
        
            let todoObj={
                id:uuidv4(),
                title: title,
                Description : desc,
                Priority : Priority,
                completed :false,
                created : timestamp,
                updated : timestamp
                }
               todos.push(todoObj);
             
               localStorage.setItem('list',JSON.stringify(todos)); 
            }

//remove a item from list

            removeItem = function(id){
                let index=todos.findIndex( function(item){
                    return item.id === id;
                })

                if(index > -1)
                {
                    todos.splice(index,1);
                }

                renderTodo(todos,'');

                let JSONdata=JSON.stringify(todos);
                localStorage.setItem('list',JSONdata);
                refresh(todos);

            }

renderTodo = function(todos,searchText){
    filteredTodo=todos.filter(function(todo){
        return todo.title.toLowerCase().includes(searchText.toLowerCase());
    })

    filteredTodo.forEach( function(todoItem){
        const tr = document.createElement('tr');
        const linktd = document.createElement('td');
        const buttontd = document.createElement('td');
        const checkboxtd = document.createElement('td');
        const timetd = document.createElement('td');

        const link=document.createElement('a');
        const button=document.createElement('button');
        const checkbox=document.createElement('input');
        const time=document.createElement('span');

        time.textContent=`${moment(todoItem.created).fromNow()}`;


        checkbox.setAttribute('type','checkbox');
        button.textContent='(x)';

        link.textContent=`Title : ${todoItem.title} || Description: ${todoItem.Description} || Priority: ${todoItem.Priority}`;
        link.setAttribute('href',`/edit.html#${todoItem.id}`)
        if(todoItem.completed==true)
        checkbox.setAttribute('checked','true');

        checkboxtd.appendChild(checkbox);
        linktd.appendChild(link);
        timetd.appendChild(time);
        buttontd.appendChild(button);

        tr.appendChild(checkboxtd);
        tr.appendChild(linktd);
        tr.appendChild(timetd);
        tr.appendChild(buttontd)        

        checkbox.addEventListener('change',function(){
            if(checkbox.checked==true)
            {
                todoItem.completed=true;
            }

            if(checkbox.checked==false)
            {
                todoItem.completed=false;
            }

            localStorage.setItem('list',JSON.stringify(todos));

            refresh(todos);
        })

        button.addEventListener('click',function(){

            removeItem(todoItem.id);
        })
       
   
        document.body.querySelector("#add-here-body").appendChild(tr);
    })

    if(filteredTodo.length==0){
       document.querySelector('#search-filter').setAttribute('placeholder','Enter to filter');
    }
    
}

renderTodo(todos,searchText);

document.querySelector('#search-filter').addEventListener('input',function(event){
    
    document.querySelector("#add-here-body").innerHTML="";

    searchText=event.target.value;

    renderTodo(todos,searchText);
})


document.querySelector("#add-button").addEventListener('click',function (event) {

    event.preventDefault();

    let title=document.querySelector('#todo-title').value;
    let desc=document.querySelector('#todo-desc').value;
    let prio=document.querySelector('#todo-priority').value;
     addItem(title,desc,prio);
     refresh(todos);
})

document.querySelector('#remove-all').addEventListener('click',function(event){
    todos = [];
    let choice=confirm('Remove from Storage also ?');
    
    if(choice==true)
    localStorage.removeItem('list');
    refresh(todos);
})


function refresh(todos){
    document.querySelector("#add-here-body").innerHTML="";
    renderTodo(todos,"");
    getSummary();
}


// synchronize update across tabs
window.addEventListener('storage',function(event){
    if(event.key === 'list')
    {
        todos = JSON.parse(this.localStorage.getItem('list'));

        refresh(todos);
    }
})

