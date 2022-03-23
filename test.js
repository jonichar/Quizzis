const params = new URLSearchParams(window.location.search)
let id = params.get('id')

let quizzis = []
let answered = []
let filteredQuiz = []

let body = document.querySelector("body")
let project = document.querySelector("#project")
let questions = document.querySelector("#questions")
let closeQuiz = document.querySelector("#breadcrumb")
let quizText = document.querySelector("#titleTest")
let correctQuestions = document.querySelector("#correctQuestions")
let resultScene = document.querySelector("#finishResults")
let currentTestImage = document.querySelector("#currentTestImage")
let quizWinCondition = 0
let correctCounter = 0
let IncorrectCounter = 0
let totalAnswereds = 0

let currentTest = document.querySelector("#currentTest")
let correct = document.querySelector("#currentResult")
let homeButton = document.querySelector("#homeButton")

homeButton.addEventListener('click', () => {
    window.location.href = 'index.html'
})

closeQuiz.addEventListener('click', () => {
    window.location.href = 'index.html'
})

result()

function writeTest(questionArray) {
    correctAnswersValidate(questionArray.length)

    for (let i = 0; i < questionArray.length; i++) {
        let currentCuestion = questionArray[i]
        let questionId = questionArray[i].id

        /*Image
        let imageDiv = document.createElement('div')
        let image = document.createElement('img')
        image.src = currentCuestion.img
        imageDiv.classList.add("image")

        imageDiv.appendChild(image)
        questions.appendChild(imageDiv) */ 

        //Number
        let numberDiv = document.createElement('div')
        numberDiv.classList.add("numberDiv")
        let currentNumberQuestion = document.createElement('div')
        currentNumberQuestion.classList.add("currentNumberQuestion")
        currentNumberQuestion.textContent = i+1

        numberDiv.appendChild(currentNumberQuestion)
        questions.appendChild(numberDiv)

        //Question Text
        let textQuestion = document.createElement('div')
        textQuestion.classList.add("textQuestion")
        textQuestion.textContent = currentCuestion.text

        questions.appendChild(textQuestion)


        //Question Options
        let optionList = document.createElement('div')
        optionList.classList.add("optionList")

        currentCuestion.options.forEach(item => {

            let option = document.createElement('div')
            option.classList.add("option")
            option.classList.add(questionId)

           if (item.isCorrect) {
               option.classList.add("12")
           }else{
               option.classList.add("11")
           }


            option.textContent = item.text
            optionList.appendChild(option)
            questions.appendChild(optionList)

        });
    }
}


//Select Option
function selectOption(questionArray) {
    
    let options = document.querySelectorAll(".option")

    options.forEach(item => {
        item.addEventListener('click', () => {
            checkOption(item,questionArray)
            checkFinish(questionArray.length)
            correctAnswersValidate(questionArray.length)
        });
    })   
}


//Check Option
function checkOption(selectOption, questionArray) {

    for (let i = 0; i < questionArray.length; i++) {

        let questionId = questionArray[i].id

        if (selectOption.classList.contains(questionId) ) {
            
            if (!answered.includes(questionId)) {

                if (selectOption.classList.contains("12")) {
                    selectOption.classList.add("correctOption")
                    correctCounter++
                }else{
                    selectOption.classList.add("incorrectOption")
                    IncorrectCounter++
                }
            
                answered.push(questionId) 
            }
                
        }

    }

}

//Check if user ansewer all the questions
function checkFinish(currentTotalQuestions) {
    totalAnswereds = correctCounter + IncorrectCounter

    if (totalAnswereds == currentTotalQuestions) {
        if (quizWinCondition <= correctCounter) {
            finishResults("win")
        }else{
            finishResults("lose")
        }
    }
}

//Finish Results
function finishResults(status) {
    resultScene.classList.add("blackZone")
    resultScene.classList.remove("hideContainer")

    let imageDiv = document.createElement('div')
    let image = document.createElement('img')
    image.src = filteredQuiz.img

    currentTestImage.appendChild(image)

    currentTest.textContent = filteredQuiz.name
    correct.textContent = correctCounter + "/" + totalAnswereds
}


//show how many correct answers 
function correctAnswersValidate(currentTotalQuestions) {
    correctQuestions.textContent = correctCounter + "/" + currentTotalQuestions
}

//Title Quiz
function testName(testsArray) {
    quizText.innerHTML = testsArray.name
}

//Call the API
function result() {
    axios.get('index.json')

    .then(function (response) {
        quizzis = response.data

        let filtered = quizzis.tests.filter(quiz => {
            return quiz.id == id
        })

        filteredQuiz = filtered[0]
        quizWinCondition = filtered[0].winCondition

        writeTest(filtered[0].questions)
        selectOption(filtered[0].questions)
        testName(filtered[0])
    })
    .catch(function (error) {
        console.log(error);
    });
}

