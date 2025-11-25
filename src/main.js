const todos = [
  {
    text: "task1",
    isDone: true,
  },
];
function todoItem(item, index) {
  const todoElement = document.createElement("li");
  todoElement.className =
    "w-[90%] bg-white rounded-lg p-3 flex items-center justify-between";
  todoElement.innerHTML = `
    <div class="flex items-center ">
                            <input type="checkbox" class="absolute right-10 w-5 h-5" onInput="handleChecked(${index})" ${
    item.isDone && "checked"
  }>
                            <span class="ps-10">${
                              item.isDone ? `<s>${item.text}</s>` : item.text
                            }</span>
                        </div>
                           <button class="absolute left-10 text-red-500 hover:text-red-700 transition-colors duration-200 p-1 rounded" 
            type="button" id="remove" data-action="remove"
            title="حذف تسک">
        <i class="fas fa-times"></i>
    </button>`;
        const length = todos.length;
    const count = document.querySelector("#todoCount");
    console.log(count);
    count.innerHTML = `${length}`;
  return todoElement;
}

document.querySelector("#todosUl").addEventListener("click", (e) => {
  const button = e.target.closest('[data-action="remove"]');
  if (button) {
    const index = parseInt(button.closest("li").dataset.index);
    removeTodo(index);
  }
});

function removeTodo(index) {
  if (confirm("آیا از حذف این تسک مطمئن هستید؟")) {
    todos.splice(index, 1);
    render();
  }
}

function render() {
  if (todos.length) {
    const todosUL = document.createElement("ul");
    todosUL.className =
      "space-y-3 h-[220px] overflow-y-scroll flex flex-col justify-start relative items-center";

    todos.forEach((item, index) => {
      todosUL.append(todoItem(item, index));
    });

    document.getElementById("todosUl").innerHTML = todosUL.outerHTML;

  }
}

function handleChecked(index) {
  const currentTodoItem = todos[index];
  todos[index] = {
    text: currentTodoItem.text,
    isDone: !currentTodoItem.isDone,
  };
  render();
}

document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();
  const todoInput = e.target.elements.todoInput;
  if (todoInput.value) {
    todos.unshift({
      text: todoInput.value,
      isDone: false,
    });
    
    render();
    todoInput.value = "";
  } else {
    alert("لطفا متن تسک را بنویسید!");
  }
});

render();
