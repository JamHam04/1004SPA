//Variables from html IDs:
const inputForm = document.getElementById("input-form");
const openInputForm = document.getElementById("open-input-form");
const closeInputForm = document.getElementById("close-input-form");
const exerciseInput = document.getElementById("exercise-input");
const repsInput = document.getElementById("reps-input");
const reps2Input = document.getElementById("reps2-input");
const notesInput = document.getElementById("notes-input");
const addExercise = document.getElementById("add-exercise");
const outputTable = document.getElementById("table-container"); //Change var


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




const submit = () => {
  
  const exerciseDataIndex = exerciseData.findIndex((element) => element.id === currentExercise.id);
  
  
  const exerciseObj = {
    id: `${exerciseInput.value}`, //id for array index
    exercise: exerciseInput.value,
    reps: repsInput.value, 
    reps2: reps2Input.value, //Test value for added input
    notes: notesInput.value,
  };
  
  //Inserting the new element to exerciseData
  if (exerciseDataIndex === -1) { //Only adds if the input is new
    exerciseData.unshift(exerciseObj)

  };
  outputTableFunc() //Function that outputs the variables
  reset() //Clears input fields
};

//Output the array variables into table:
outputTableFunc = () => {
  outputTable.innerHTML = "";

//Output Table
exerciseData.forEach(
  ({ id, exercise, reps, notes, reps2}) => {
      (outputTable.innerHTML += `
      <div class="task" id="${id}">

        <div class="container bg-light">
        <!--Table of exercises including collapsible health columns using button below-->
        <div class="row">
            <div class="col border">
            <p><strong>Exercise:</strong> ${exercise}</p>
            </div>
            <div class="col-sm border collapse" id="HealthCol">\
                <input class="form-control form-control-sm form-control-plaintext" placeholder="Health Data 1">
            </div>
        </div>
        <div class="row">
            <div class="col-sm border" id="reps">
            <p><strong>Set 1 Reps:</strong> ${reps}</p>
            </div>
            <div class="col-sm border">
            <p><strong>Notes:</strong> ${notes}</p>
            </div>
            <div class="col-sm border collapse" id="HealthCol">
                <input class="form-control form-control-sm form-control-plaintext" placeholder="Health Data 2">
            </div>
        </div>
        <div class="row">
            <div class="col-sm border" id="reps">
            <p><strong>Set 2 Reps:</strong> ${reps2}</p>
            </div>
            <div class="col-sm border">
            <p><strong>Notes:</strong> ${notes}</p> <!--NEED NEW VARIABLE FOR SECOND NOTES INPUT TO MATCH REPS-->
            </div>
            <div class="col-sm border collapse" id="HealthCol">
                <input class="form-control form-control-sm form-control-plaintext" placeholder="Health Data 3">
            </div>
        </div>
        </div>
        `)
      }
    );
    }


//Close the form after submitting and resets the input fields
const reset = () => {
  exerciseInput.value = "";
  repsInput.value = "";
  reps2Input.value = "";
  notesInput.value = "";
  inputForm.classList.toggle("hide");
  currentExercise = {}; //Empties object ready for next input
}

inputForm.addEventListener("submit", (e) => {
  e.preventDefault(); //Stops browser refreshing the entire page for the SPA
  submit(); //Calls sumbit function to store values and run the output function
});

//Add new reps input (Currently not fully working)
function addReps(){
    var newRepsInput='<input type="int" class="form-control" id="reps2-input" value="">'; //Puts html input line into variable
    $('#input-form').append(newRepsInput); //Appends line to form
  }

