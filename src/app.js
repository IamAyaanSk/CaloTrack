import "@fortawesome/fontawesome-free/js/all";
import { Modal, Collapse } from "bootstrap";

import CalorieTracker from "./Tracker.js";
import { Meal, Workout } from "./Items.js";

import "./styles/bootstrap.css";
import "./styles/style.css";

class App {
  constructor() {
    this._tracker = new CalorieTracker();
    this._eventHandlers();
  }

  _eventHandlers() {
    document
      .getElementById("meal-form")
      .addEventListener("submit", this._newItem.bind(this, "meal"));
    document
      .getElementById("workout-form")
      .addEventListener("submit", this._newItem.bind(this, "workout"));

    document
      .getElementById("meal-items")
      .addEventListener("click", this._removeItem.bind(this, "meal"));

    document
      .getElementById("workout-items")
      .addEventListener("click", this._removeItem.bind(this, "workout"));

    document
      .getElementById("filter-meals")
      .addEventListener("keyup", this._filterItems.bind(this, "meal"));

    document
      .getElementById("filter-workouts")
      .addEventListener("keyup", this._filterItems.bind(this, "workout"));

    document
      .getElementById("reset")
      .addEventListener("click", this._reset.bind(this));

    document
      .getElementById("limit-form")
      .addEventListener("submit", this._setLimit.bind(this));
  }

  _newItem(type, e) {
    e.preventDefault();

    const name = document.getElementById(`${type}-name`);
    const calories = document.getElementById(`${type}-calories`);

    if (name.value === "" || calories.value === "") {
      alert(`Enter ${type} and Calories`);
      return;
    } else {
      if (type === "meal") {
        const meal = new Meal(name.value, +calories.value);
        this._tracker.addMeal(meal);
      } else {
        const workout = new Workout(name.value, +calories.value);
        this._tracker.addWorkout(workout);
      }

      name.value = "";
      calories.value = "";
      const collapseItem = document.getElementById(`collapse-${type}`);
      const bsCollapse = new Collapse(collapseItem, {
        toggle: true,
      });
    }
  }

  _removeItem(type, e) {
    console.log(e);
    if (e.target.closest(".delete")) {
      if (confirm(`Are you sure you want to delete ${type}`)) {
        type === "meal"
          ? this._tracker.removeMeal(e.target.closest(".card").dataset.id)
          : this._tracker.removeWorkout(e.target.closest(".card").dataset.id);
        e.target.closest(".card").remove();
      } else {
        return;
      }
    } else {
      return;
    }
  }

  _filterItems(type) {
    const text = document.getElementById(`filter-${type}s`).value.toLowerCase();
    const items = document.querySelectorAll(`#${type}-items .card`);
    items.forEach((item) => {
      const name =
        item.firstElementChild.firstElementChild.firstElementChild.textContent.toLowerCase();
      if (name.indexOf(text) !== -1) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  _setLimit(e) {
    e.preventDefault();
    const limit = document.getElementById("limit");

    if (limit.value === "") {
      alert("Please Enter Calories");
      return;
    } else {
      this._tracker.setLimit(+limit.value);
      limit.value = "";
      const modalEl = document.getElementById("limit-modal");
      const modal = Modal.getInstance(modalEl);
      modal.hide();
    }
  }

  _reset() {
    if (confirm("Are you sure you want to reset day?")) {
      this._tracker.resetDay();
      document.getElementById("meal-items").innerHTML = "";
      document.getElementById("workout-items").innerHTML = "";
      document.getElementById("filter-meals").value = "";
      document.getElementById("filter-workouts").value = "";
      Storage.clearAll();
    } else {
      return;
    }
  }
}

const app = new App();
