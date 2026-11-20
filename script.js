const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const progressLabel = document.querySelector(".progress-label");
const errorLabel = document.querySelector(".error-label");
const goalContainers = document.querySelectorAll(".goal-container");
const customCheckboxs = document.querySelectorAll(".custom-checkbox");
const goalInputs = document.querySelectorAll(".goal-input");
const addBtn = document.querySelector("#task-plus")
const resetBtn = document.querySelector("#reset")

const allQuates = [
  `Raise the bar by completing your goals`,
  `Well begun is half done`,
  `Just a step away, keep going`,
  `Wow! You just completed all the goals, time for chill`,
];

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
  goal1: {
    name: "",
    completed: false,
  },
  goal2: {
    name: "",
    completed: false,
  },
  goal3: {
    name: "",
    completed: false,
  },
};
let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed,
).length;
progressLabel.innerText = allQuates[completedGoalsCount];
progressValue.style.width = `${(completedGoalsCount / goalInputs.length) * 100}%`;
progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`;


customCheckboxs.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    const allInputsFilled = [...goalInputs].every((input) => {
      return input.value;
    });
    if (allInputsFilled) {
      checkbox.parentElement.classList.toggle("completed");
      progressBar.classList.remove("show-error");
      const inputId = checkbox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed,
      ).length;

      progressValue.style.width = `${(completedGoalsCount / goalInputs.length) * 100}%`;
      progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`;
      progressLabel.innerText = allQuates[completedGoalsCount];
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      progressBar.classList.add("show-error");
    }
  });
});


goalInputs.forEach((input) => {
  input.value = allGoals[input.id].name;

  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }
  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error");
  });

  input.addEventListener("input", (e) => {
    if (allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }
    ((allGoals[input.id].name = input.value),
      localStorage.setItem("allGoals", JSON.stringify(allGoals)));
  });
});



