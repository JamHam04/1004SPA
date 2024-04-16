//Variables from html IDs:
const inputForm = document.getElementById("input-form");
const openInputForm = document.getElementById("open-input-form");
const closeInputForm = document.getElementById("close-input-form");
const exerciseInput = document.getElementById("exercise-input");
const repsInput = document.getElementById("reps-input");
const reps2Input = document.getElementById("reps2-input");
const notesInput = document.getElementById("notes-input");
const notes2Input = document.getElementById("notes2-input");
const addExercise = document.getElementById("add-exercise");
const outputTable = document.getElementById("table-container");
const dailyWeightInput = document.getElementById("dailyWeight-input");
const dailyCaloriesInput = document.getElementById("dailyCalories-input");
const outputDailyHealth = document.getElementById("dailyHealthContainer"); 
const outputDailyHealth2 = document.getElementById("dailyHealthContainer2"); 
const dailyHealthBtn = document.getElementById("dailyHealthBtn"); 

//Load data tables
loadData ();

//Button Toggles:
//Shows form
openInputForm.addEventListener("click", () =>
  inputForm.classList.toggle("hide"), 
);

//Shows daily health button when opening form
openInputForm.addEventListener("click", () =>
  dailyHealthBtn.classList.toggle("hide"), 
);

//Hides daily health button when closing form
closeInputForm.addEventListener("click", () =>
  dailyHealthBtn.classList.toggle("hide"), 
);

//Hides daily health button when submitting form
addExercise.addEventListener("click", () =>
  dailyHealthBtn.classList.toggle("hide"), 
);

//Hides open form button
openInputForm.addEventListener("click", () =>
  openInputForm.classList.toggle("hide"),
);

//Shows open form button when submitting
addExercise.addEventListener("click", () =>
  openInputForm.classList.toggle("hide"),
);

//shows open form button when closing
closeInputForm.addEventListener("click", () =>
  openInputForm.classList.toggle("hide"),
);

//Inputting to array
let currentExercise = {}; //Objects to be used for editing implementation
let currentHealth = {};
const exerciseData = []; //Arraya which will hold the exerciseObj data (all inputs)
const dailyHealthData = [];

//Submitting the form
const submit = () => {
  
  //Indexer - used for editing
  const exerciseDataIndex = exerciseData.findIndex((item) => item.jsonKey === currentExercise.jsonKey); 
  const healthDataIndex = dailyHealthData.findIndex((item) => item.dailyHealthKey === currentHealth.dailyHealthKey);
  //Object of all json elements
  const exerciseObj = {
    jsonKey: currentSetDate + `-` + `${exerciseInput.value}` , //Sets the json key
    exercise: exerciseInput.value,
    reps: repsInput.value, 
    reps2: reps2Input.value, 
    notes: notesInput.value,
    notes2: notes2Input.value,

  };

  const dailyHealthObj = {
    dailyHealthKey: currentSetDate + `_DailyHealth`,
    weight: dailyWeightInput.value,
    calories: dailyCaloriesInput.value,
  }

  //Inserting the new element to exerciseData
  if (exerciseDataIndex === -1) { //Only adds if the input is new
    exerciseData.unshift(exerciseObj) //Adds to start of array
  };
  if (healthDataIndex === -1) { //Only adds if the input is new
    dailyHealthData.unshift(dailyHealthObj) //Adds to start of array
  };
  SaveData() //Function that outputs the variables
  reset() //Clears input fields
  loadData(); //Load new date
};

//Output the array variables into table:
function SaveData() {

  //Clear sections
  outputTable.innerHTML = "";
  outputDailyHealth.innerHTML = ""; 
  outputDailyHealth2.innerHTML = ""; 
  
  if (exerciseInput.value) {
    exerciseData.forEach(
      ({ jsonKey, exercise, reps, notes, reps2, notes2}) => {
        let exerciseKey = jsonKey.replace(currentSetDate + '-', '',)
        //Handle any empty keys
        if (exerciseKey == currentSetDate + '-') {
          exerciseKey = '';
        } 
        //If the key is correct and filled
        if (exerciseKey) {
          //Parse into JSON
          const jsonObject = `{"id": "${jsonKey}", "exercise": "${exercise}", "reps": "${reps}", "notes": "${notes}", "reps2": "${reps2}", "notes2": "${notes2}"}`
          const jsonParsed = JSON.parse(jsonObject);
          //Input into localstorage
          localStorage.setItem(jsonKey, JSON.stringify(jsonParsed));  
        }
      }
    )
  }
  
  //Alert box (Not Working)
  // //Error handling for empty exercise field
  // else {
  //   if (dailyWeightInput.value == '' && dailyCaloriesInput.value == ''){ 
  //     addExercise.onclick = alert("Enter exercise");
  //   }
  // }

  //If either daily health inputs are filled
  if (dailyWeightInput.value || dailyCaloriesInput.value) {
  dailyHealthData.forEach(
    ({dailyHealthKey, weight, calories}) => {
      if (dailyHealthKey) {
      const dailyHealthJson = `{"id": "${dailyHealthKey}", "weight": "${weight}", "calories": "${calories}"}`
        const dailyHealthJsonParsed = JSON.parse(dailyHealthJson);
        localStorage.setItem(dailyHealthKey, JSON.stringify(dailyHealthJsonParsed)); 
    }
  }
  )
}

};

function loadData () {
  let jsonLength = localStorage.length;
  if (jsonLength) {
    //keys array to store each
    keys = [];
    healthkeys = []; 
    //Loop to push each saved jsonKey to the keys array
    for (let i = 0; i < jsonLength; i++){
      let jsonKey = localStorage.key(i);
      if(jsonKey.startsWith(currentSetDate + '-')){
        keys.push(jsonKey);
      }
      let dailyHealthKey = localStorage.key(i);
      if(dailyHealthKey == currentSetDate + '_DailyHealth'){ 
        healthkeys.push(dailyHealthKey); 
      }
    }
  }
  loadOutput(); //Go to output function
};

function loadOutput() {
  let jsonLength = localStorage.length;
  if (jsonLength) {

    //let dailyHealthKey = jsonKey.replace(exerciseInput.value + '-', '',);
    if (healthkeys) {
    
      healthkeys.forEach((dailyHealthKey) => {
        //let HealthKey = jsonKey.replace(exerciseInput.value + '-', '',);
        let storedDataHealth = localStorage.getItem(dailyHealthKey);
        if (healthkeys) {
          let dailyHealthDataValue = JSON.parse(storedDataHealth);
          (outputDailyHealth.innerHTML += `
          <h1><strong>Daily Weight:</strong> ${dailyHealthDataValue.weight}</h1> 
          `);
          (outputDailyHealth2.innerHTML += `
          <h1><strong>Daily Calories:</strong> ${dailyHealthDataValue.calories}</h1> 
          `);
        };
      });
    };
    
    keys.forEach((jsonKey) => {
      let exerciseKey = jsonKey.replace(currentSetDate + '-', '',); //Get's rid of the date to just display exercise
      let storedData = localStorage.getItem(jsonKey); //Current stored data
      
      //If it isn't empty then load and display
      if (keys) { 
        let exerciseDataValue = JSON.parse(storedData); 

        //output each saved json in table format
        (outputTable.innerHTML += `
        <div class="row">
            <div class="col border">
            <p><strong>Exercise:</strong> ${exerciseKey}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm border" id="reps">
            <p><strong>Set 1 Reps:</strong> ${exerciseDataValue.reps}</p>
            </div>
            <div class="col-sm border">
            <p><strong>Notes:</strong> ${exerciseDataValue.notes}</p>
            </div>
        </div>
        
        `)
        //Only output the set 2 reps and notes if the input is filled
        if (exerciseDataValue.reps2) {
          (outputTable.innerHTML += `
          <div class="row">
              <div class="col-sm border" id="reps">
              <p><strong>Set 2 Reps:</strong> ${exerciseDataValue.reps2}</p>
              </div>
              <div class="col-sm border">
              <p><strong>Notes:</strong> ${exerciseDataValue.notes2}</p>
              </div>
          </div>
          `)
        };
      }
    });
  };
};

//Close the form after submitting and resets the input fields
const reset = () => {
  exerciseInput.value = "";
  repsInput.value = "";
  reps2Input.value = "";
  notesInput.value = "";
  notes2Input.value = "";
  dailyWeightInput.value = "";
  dailyCaloriesInput.value = "";
  inputForm.classList.toggle("hide");

  //Empty object ready for next input
  currentExercise = {};
  currentHealth = {}; 
}

//Form Submit
inputForm.addEventListener("submit", (event) => {
  event.preventDefault(); //Stops browser refreshing the entire page for the SPA
  submit(); //Calls sumbit function to store values and run the output function
});
