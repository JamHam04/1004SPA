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
const outputTable = document.getElementById("table-container"); //Change var

//Load data tables
loadData ();

//Button Toggles:
//Shows form
openInputForm.addEventListener("click", () =>
  inputForm.classList.toggle("hide"), 
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
let currentExercise = {}; //Object to be used for editing implementation
const exerciseData = []; //Array which will hold the exerciseObj data (all inputs)

//Submitting the form
const submit = () => {
  
  //Indexer - used for editing
  const exerciseDataIndex = exerciseData.findIndex((item) => item.jsonKey === currentExercise.jsonKey); 
  
  //Object of all json elements
  const exerciseObj = {
    jsonKey: currentSetDate + `-` + `${exerciseInput.value}` , //Sets the json key
    exercise: exerciseInput.value,
    reps: repsInput.value, 
    reps2: reps2Input.value, 
    notes: notesInput.value,
    notes2: notes2Input.value,
  };


  
  //Inserting the new element to exerciseData
  if (exerciseDataIndex === -1) { //Only adds if the input is new
    exerciseData.unshift(exerciseObj) //Adds to start of array
  };
  SaveData() //Function that outputs the variables
  reset() //Clears input fields
  loadData();
};

//Output the array variables into table:
function SaveData() {
  outputTable.innerHTML = "";

//Output Table

exerciseData.forEach(
  ({ jsonKey, exercise, reps, notes, reps2, notes2}) => {
    let exerciseKey = jsonKey.replace(currentSetDate + '-', '',);
    if (exerciseKey) {
  //Parse into JSON
  const jsonTest = `{"id": "${jsonKey}", "exercise": "${exercise}", "reps": "${reps}", "notes": "${notes}", "reps2": "${reps2}", "notes2": "${notes2}"}`
  const jsonP = JSON.parse(jsonTest);
  //Input into localstorage
  window.localStorage.setItem(jsonKey, JSON.stringify(jsonP)); 
      }
    }
    )
    };

function loadData () {
  let jsonLength = localStorage.length;
  if (jsonLength) {
    keys = []; //keys array to store each
    //Loop to push each saved jsonKey to the keys array
    for (let i = 0; i < jsonLength; i++){
      let jsonKey = localStorage.key(i);
      if(jsonKey.startsWith(currentSetDate)){
        keys.push(jsonKey);
      }
    }
  }
  loadOutput(); //Go to output function
};

function loadOutput() {
  let jsonLength = localStorage.length;
  if (jsonLength) {
  keys.forEach((jsonKey) => {
    let exerciseKey = jsonKey.replace(currentSetDate + '-', '',); //Get's rid of the date to just display exercise
    let storedData = localStorage.getItem(jsonKey);
    if (exerciseKey) { //If it isn't empty then load and display
      let exerciseDataValue = JSON.parse(storedData); //Get an array 'chars' which should hold the data
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
  inputForm.classList.toggle("hide");
  currentExercise = {}; //Empties object ready for next input
}

//Form Submit
inputForm.addEventListener("submit", (event) => {
  event.preventDefault(); //Stops browser refreshing the entire page for the SPA
  submit(); //Calls sumbit function to store values and run the output function
});


  
