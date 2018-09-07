const todoId=location.hash.substring(1);

let todosArray = JSON.parse(localStorage.getItem('list'));

let todo=todosArray.find(function (todo){
     return todoId === todo.id
})

if(todo === undefined)
{
    location.assign('/index.html');
}


let loc =todosArray.findIndex(function(a){return a.id === todoId})
 
//show the deatils PLACE THE DETAILS
document.querySelector('#todo-title').value =todosArray[loc].title;
document.querySelector('#todo-desc').value =todosArray[loc].Description;
document.querySelector('#todo-priority').value =todosArray[loc].Priority;
lastEdited(todosArray[loc]);




//update the items

document.querySelector('#update-bttn').addEventListener('click',function (event){
 todosArray[loc].title = document.querySelector('#todo-title').value;
   todosArray[loc].Description = document.querySelector('#todo-desc').value
   todosArray[loc].Priority = document.querySelector('#todo-priority').value 
   todosArray[loc].updated = moment().valueOf();

    localStorage.setItem('list',JSON.stringify(todosArray));
    
    location.assign('/index.html');

})


//remove the items
document.querySelector('#remove-bttn').addEventListener('click',function(event){
   todosArray.splice(loc,1);
    localStorage.setItem('list',JSON.stringify(todosArray));

    location.assign('/index.html');
})


//generate last edited
function lastEdited(todoItem)
{

    let para = document.createElement('p');
    para.textContent = `Last Updated : ${moment(todoItem.updated).fromNow()}`;
    document.querySelector('#info').appendChild(para);
}