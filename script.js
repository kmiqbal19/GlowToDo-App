console.log("test");
const input = document.querySelector(".add-input");
const addButton = document.querySelector(".add-btn");
const saveButton = document.querySelector(".btn-save");
const clearAllBtn = document.querySelector(".btn-clear");
const dataSection = document.querySelector(".todo-data");
const aboutBtn = document.querySelector(".about");
let inputContainer = [];
let count = 0;
addButton.addEventListener("click", function (e) {
  if (input.value !== "") {
    count++;
    inputContainer.push(input.value);

    dataSection.insertAdjacentHTML(
      "beforeend",
      `       <div class="todo-data-each" data-todo="${count}">
  <span class="slh s-num">${String(count).padStart(
    2,
    "0"
  )}.</span><span class="slh s-todo">${input.value}</span>
  <button class="done">Done</button>
  <button class="delete">Delete</button>
</div>`
    );
    input.value = "";
  }
});

dataSection.addEventListener("click", function (e) {
  const doneButton = document.querySelectorAll(".done");
  const delButton = document.querySelectorAll(".delete");
  doneButton.forEach((doneBtn) => {
    if (e.target === doneBtn) {
      e.target
        .closest(".todo-data-each")
        .querySelector(".s-todo")
        .classList.toggle("line-through");
    }
  });
  delButton.forEach((delBtn) => {
    if (e.target === delBtn) {
      const deleted = e.target
        .closest(".todo-data-each")
        .querySelector(".s-todo").textContent;
      const index = inputContainer.findIndex((data) => data === deleted);
      inputContainer.splice(index, 1);

      e.target.closest(".todo-data-each").remove();
      count = 0;
      document.querySelectorAll(".todo-data-each").forEach((data) => {
        const input = data.querySelector(".s-todo").textContent;
        if (data.querySelector(".s-todo").classList.contains("line-through")) {
          dataSection.insertAdjacentHTML(
            "beforeend",
            `       <div class="todo-data-each" data-todo="${count + 1}">
              <span class="slh s-num">${String(count + 1).padStart(
                2,
                "0"
              )}.</span><span class="slh s-todo" style = "text-decoration : line-through">${input}</span>
              <button class="done">Done</button>
              <button class="delete">Delete</button>
            </div>`
          );
        } else {
          dataSection.insertAdjacentHTML(
            "beforeend",
            `       <div class="todo-data-each" data-todo="${count + 1}">
        <span class="slh s-num">${String(count + 1).padStart(
          2,
          "0"
        )}.</span><span class="slh s-todo">${input}</span>
        <button class="done">Done</button>
        <button class="delete">Delete</button>
      </div>`
          );
        }
        count++;
        data.remove();
      });
    }
  });
});
saveButton.addEventListener("click", function (e) {
  localStorage.setItem("data", JSON.stringify(inputContainer));
});

const init = function () {
  const allData = JSON.parse(localStorage.getItem("data"));
  if (allData) {
    allData.forEach((data) => {
      count++;
      dataSection.insertAdjacentHTML(
        "beforeend",
        `       <div class="todo-data-each" data-todo="${count}">
<span class="slh s-num">${String(count).padStart(
          2,
          "0"
        )}.</span><span class="slh s-todo">${data}</span>
<button class="done">Done</button>
<button class="delete">Delete</button>
</div>`
      );
    });
  } else {
    return;
  }
};
init();
clearAllBtn.addEventListener("click", function (e) {
  count = 0;
  dataSection.innerHTML = "";
  localStorage.clear();
});
aboutBtn.addEventListener("click", function () {
  document.querySelector(".modal-overlay").classList.remove("hidden");
});
// const overlays = [
//   document.querySelector(".modal-overlay"),
//   document.querySelector(".close-modal-btn"),
// ];
const modalCloseBtn = document.querySelector(".close-modal-btn");

modalCloseBtn.addEventListener("click", function () {
  document.querySelector(".modal-overlay").classList.add("hidden");
});
