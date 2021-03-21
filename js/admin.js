let allQuestions = [];
//quesitonID, question, answers1-4, correctAnswer
let numberOfQuestions = 0;
let currentQuestion = 0;

const databaseURL = 'https://josh-edge.com/COMP351/projects/1/dbinterface';

const beginButtonElement = document.getElementById('beginButton')
beginButtonElement.addEventListener('click', startQuiz)
const questionEditorElement = document.getElementById('questionEditor')

const addButtonElement = document.getElementById('addButton')
addButtonElement.addEventListener('click', addQuestion)

const saveButtonElement = document.getElementById('saveButton')
saveButtonElement.addEventListener('click', saveQuestion)//putQuestion

const deleteButtonElement = document.getElementById('deleteButton')
deleteButtonElement.addEventListener('click', deleteQuestion)

const prevQuestionButtonElement = document.getElementById('prevQuestionButton')
prevQuestionButtonElement.addEventListener('click', prevQuestion)

const nextQuestionButtonElement = document.getElementById('nextQuestionButton')
nextQuestionButtonElement.addEventListener('click', nextQuestion)

let questionInputElement = document.getElementById("questionInput");
let answer1Element = document.getElementById("answer1");
let answer2Element = document.getElementById("answer2");
let answer3Element = document.getElementById("answer3");
let answer4Element = document.getElementById("answer4");
let questionCurrentNumberElement = document.getElementById("questionCurrentNumber");
let radio1Element = document.getElementById("radioButton1");
let radio2Element = document.getElementById("radioButton2");
let radio3Element = document.getElementById("radioButton3");
let radio4Element = document.getElementById("radioButton4");

function startQuiz() { // Done
    beginButtonElement.classList.add('hide');
    retrieveStorage();
    questionEditorElement.classList.remove('hide');
}

function retrieveStorage() { // All done!
    console.log("retrieve called!");
    allQuestions=[];
    fetch(databaseURL, {method:'GET'})
        .then(res => res.json())
        .then(data =>
            data.map(item => {
                allQuestions.push(item);
                numberOfQuestions = allQuestions.length;
                currentQuestion = numberOfQuestions;
                printAnswer();
            })
        )
        
}

function postQuestion(q, aID, a1, a2, a3, a4) { //TODO: implement function to add a new question to db
    fetch(databaseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            question: q,
            answerID: aID,
            answer1: a1,
            answer2: a2,
            answer3: a3,
            answer4: a4
        })
    })
        .then((res) => res.json())
        .then((data) =>console.log(data))
    retrieveStorage();
}

function putQuestion(questionID, question, answer1, answer2, answer3, answer4, answerID) { //TODO: implement function so it sends the captured data to the database
    console.log(questionID);
    fetch(databaseURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            questionID: questionID,
            question: question,
            answerID: answerID,
            answer1: answer1,
            answer2: answer2,
            answer3: answer3,
            answer4: answer4
        })
    })
        .then((res) => res.json())
        .then((data) =>console.log(data))
    retrieveStorage();
}

function deleteQuestion() { //TODO: see below
    if (confirm('Are you sure you want to delete the current question?')) {
        fetch(databaseURL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                questionID: allQuestions[currentQuestion-1].questionID,
            })
        })
        retrieveStorage();
    }
}


function addQuestion() { // Done, works.
    currentQuestion++;
    document.getElementById("questionCurrentNumber").innerHTML = "Question " + currentQuestion;
    clearFields()
}



function saveQuestion() { // Done
    let question = document.getElementById("questionInput").value
    let answer1 = document.getElementById("answer1").value
    let answer2 = document.getElementById("answer2").value
    let answer3 = document.getElementById("answer3").value
    let answer4 = document.getElementById("answer4").value
    let answerID = getRadioValue()
    if(currentQuestion>numberOfQuestions){
        console.log("post called!");
        postQuestion(question, answerID, answer1, answer2, answer3, answer4)
    }
    else if(currentQuestion<=numberOfQuestions){
        console.log("put called!");
        putQuestion(allQuestions[currentQuestion-1].questionID, question, answer1, answer2, answer3, answer4, answerID)
    }
    
}



function getRadioValue() { // Done
    let radioAnswers = document.getElementsByName('answers');

    for (i = 0; i < 4; i++) {
        if (radioAnswers[i].checked)
            return i + 1;
    }
}

function printAnswer() { // Done!
    questionInputElement.value = allQuestions[currentQuestion - 1].question;
    answer1Element.value = allQuestions[currentQuestion - 1].answer1;
    answer2Element.value = allQuestions[currentQuestion - 1].answer2;
    answer3Element.value = allQuestions[currentQuestion - 1].answer3;
    answer4Element.value = allQuestions[currentQuestion - 1].answer4;
    document.getElementById("questionCurrentNumber").innerHTML = "Question " + currentQuestion;
    let x = allQuestions[currentQuestion - 1].answerID;
    radio1Element.checked = false;
    radio2Element.checked = false;
    radio3Element.checked = false;
    radio4Element.checked = false;
    if (x == 1) {
        radio1Element.checked = true;
    }
    if (x == 2) {
        radio2Element.checked = true;
    }
    if (x == 3) {
        radio3Element.checked = true;
    }
    if (x == 4) {
        radio4Element.checked = true;
    }
}

function clearFields() { // Done
    questionInputElement.value = "";
    answer1Element.value = "";
    answer2Element.value = "";
    answer3Element.value = "";
    answer4Element.value = "";
    document.getElementById("questionCurrentNumber").innerHTML = "Question " + currentQuestion;
    radio1Element.checked = false;
    radio2Element.checked = false;
    radio3Element.checked = false;
    radio4Element.checked = false;
}

function nextQuestion() { // Done
    if (currentQuestion < numberOfQuestions) {
        currentQuestion++;
        printAnswer();
    }
    else {
        window.alert("No subsequent questions!")
    }
}

function prevQuestion() { // Done
    if (currentQuestion > 1 && currentQuestion<=numberOfQuestions) {
        currentQuestion--;
        printAnswer();
    }
    else if(currentQuestion > numberOfQuestions){
        currentQuestion=numberOfQuestions;
        printAnswer();
    }
    else {
        window.alert("No prior questions!")
    }
}

