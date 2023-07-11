import Storage from "./Storage.js";

class CalorieTracker {
  constructor() {
    this._totalCalories = Storage.getCalorieTotal();
    this._calorielimit = Storage.getCalorieLimit();
    this._meals = Storage.getMeals();
    this._workouts = Storage.getWorkouts();

    this._loadItems();
    this._displayCalorieLimit();
    this._renderStats();
  }

  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    Storage.saveMeals(meal);
    this._renderStats();
    this._displayNewMeal();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    Storage.saveWorkouts(workout);
    this._renderStats();
    this._displayNewWorkout();
  }

  removeMeal(id) {
    const index = this._meals.findIndex((meal) => id === meal.id);
    if (index !== -1) {
      this._totalCalories -= this._meals[index].calories;
      this._meals.splice(index, 1);
      Storage.removeMealFromls(id);
      this._renderStats();
    } else {
      return;
    }
  }

  removeWorkout(id) {
    const index = this._workouts.findIndex((meal) => id === meal.id);
    if (index !== -1) {
      this._totalCalories += this._workouts[index].calories;
      this._workouts.splice(index, 1);
      Storage.removeWorkoutFromls(id);
      this._renderStats();
    } else {
      return;
    }
  }

  setLimit(limit) {
    this._calorielimit = limit;
    Storage.setCalorieLimit(limit);

    this._renderStats();
    this._displayCalorieLimit();
  }

  resetDay() {
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    this._renderStats();
  }

  _displayCalorieLimit() {
    const dailyLimit = document.getElementById("calories-limit");
    dailyLimit.innerText = this._calorielimit;
  }

  _displayCalorieTotal() {
    const dailyCalorieTotal = document.getElementById("calories-total");
    dailyCalorieTotal.innerText = this._totalCalories;
  }

  _displayCaloriesConsumed() {
    const consumed = this._meals.reduce((total, meal) => {
      return total + meal.calories;
    }, 0);
    const consDiv = document.getElementById("calories-consumed");
    consDiv.innerText = consumed;
  }

  _displayCaloriesBurned() {
    const burned = this._workouts.reduce((total, workout) => {
      return total + workout.calories;
    }, 0);
    const burnDiv = document.getElementById("calories-burned");
    burnDiv.innerHTML = burned;
  }

  _displayCaloriesRemaining() {
    const remCal = this._calorielimit - this._totalCalories;
    const remaining = document.getElementById("calories-remaining");
    remaining.innerText = remCal;
    const progressBar = document.getElementById("calorie-progress");

    if (remCal <= 0) {
      remaining.parentElement.parentElement.classList.remove("bg-light");
      remaining.parentElement.parentElement.classList.add("bg-danger");

      progressBar.classList.remove("bg-success");
      progressBar.classList.add("bg-danger");
    } else {
      remaining.parentElement.parentElement.classList.remove("bg-danger");
      remaining.parentElement.parentElement.classList.add("bg-light");

      progressBar.classList.remove("bg-danger");
      progressBar.classList.add("bg-success");
    }
  }

  _displayProgressBar() {
    const progressBar = document.getElementById("calorie-progress");
    const percentage = (this._totalCalories / this._calorielimit) * 100;
    let width = Math.min(percentage, 100);
    if (width <= 0) {
      progressBar.style.width = "0%";
    } else {
      progressBar.style.width = `${width}%`;
    }
  }

  _displayNewMeal() {
    const meals = this._meals;
    const mealDiv = document.getElementById("meal-items");
    mealDiv.innerHTML = "";

    meals.forEach((meal) => {
      const div = document.createElement("div");
      div.classList.add("card", "my-2");
      div.setAttribute("data-id", meal.id);
      // div.classList.add("my-2");
      div.innerHTML = `
          <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <h4 class="mx-1">${meal.name}</h4>
              <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
                        ${meal.calories}
              </div>
              <button class="delete btn btn-danger btn-sm mx-2">
                <i class="fa-solid fa-xmark"></i>
              </button>
              </div>
            </div>
          `;
      mealDiv.appendChild(div);
    });
  }

  _displayNewWorkout() {
    const workouts = this._workouts;
    const workoutDiv = document.getElementById("workout-items");
    workoutDiv.innerHTML = "";

    workouts.forEach((workout) => {
      const div = document.createElement("div");
      div.classList.add("card", "my-2");
      div.setAttribute("data-id", workout.id);
      div.innerHTML = `
          <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <h4 class="mx-1">${workout.name}</h4>
              <div class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5">
                        ${workout.calories}
              </div>
              <button class="delete btn btn-danger btn-sm mx-2">
                <i class="fa-solid fa-xmark"></i>
              </button>
              </div>
            </div>
          `;
      workoutDiv.appendChild(div);
    });
  }

  _loadItems() {
    this._displayNewMeal();
    this._displayNewWorkout();
  }

  _renderStats() {
    Storage.setCalorieTotal(this._totalCalories);
    this._displayProgressBar();
    this._displayCalorieTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
  }
}

export default CalorieTracker;
