class Storage {
  static getCalorieLimit(defaultLimit = 2000) {
    const limit = localStorage.getItem("calorieLimit");
    let finalCalLimit;
    if (limit === null) {
      finalCalLimit = defaultLimit;
    } else {
      finalCalLimit = +limit;
    }
    return finalCalLimit;
  }

  static setCalorieLimit(calLimit) {
    localStorage.setItem("calorieLimit", calLimit);
  }

  static getCalorieTotal(defaultLimit = 0) {
    const total = localStorage.getItem("calorieTotal");
    let finalCalTotal;
    if (total === null) {
      finalCalTotal = defaultLimit;
    } else {
      finalCalTotal = +total;
    }
    return finalCalTotal;
  }

  static setCalorieTotal(calTotal) {
    localStorage.setItem("calorieTotal", calTotal);
  }

  static getMeals(defaultMeals = []) {
    const meals = localStorage.getItem("meals");
    let finalMeals;
    if (meals === null) {
      finalMeals = defaultMeals;
    } else {
      finalMeals = JSON.parse(meals);
    }
    return finalMeals;
  }

  static saveMeals(meal) {
    const meals = Storage.getMeals();
    meals.push(meal);
    localStorage.setItem("meals", JSON.stringify(meals));
  }

  static getWorkouts(defaultWorkouts = []) {
    const workouts = localStorage.getItem("workouts");
    let finalWorkouts;
    if (workouts === null) {
      finalWorkouts = defaultWorkouts;
    } else {
      finalWorkouts = JSON.parse(workouts);
    }
    return finalWorkouts;
  }

  static saveWorkouts(workout) {
    const workouts = Storage.getWorkouts();
    workouts.push(workout);
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }

  static removeMealFromls(id) {
    const meals = Storage.getMeals();
    meals.forEach((meal, index) => {
      if (id === meal.id) {
        meals.splice(index, 1);
      } else {
        return;
      }
      localStorage.setItem("meals", JSON.stringify(meals));
    });
  }

  static removeWorkoutFromls(id) {
    const workouts = Storage.getWorkouts();
    workouts.forEach((workout, index) => {
      if (workout.id === id) {
        workouts.splice(index, 1);
      } else {
        return;
      }
      localStorage.setItem("workouts", JSON.stringify(workouts));
    });
  }

  static clearAll() {
    localStorage.removeItem("meals");
    localStorage.removeItem("workouts");
    localStorage.removeItem("calorieTotal");
  }
}

export default Storage;
