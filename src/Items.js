class Meal {
  constructor(mealName, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = mealName;
    this.calories = calories;
  }
}

class Workout {
  constructor(workoutName, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = workoutName;
    this.calories = calories;
  }
}

export { Meal, Workout };
