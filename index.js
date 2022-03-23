let tests = []
let testsList = document.querySelector("#testsList")

result()
 

function rewrite(testsArray) {
    for (let i = 0; i < testsArray.length; i++) {

        //Test Div
        let testDiv = document.createElement('div')
        testDiv.classList.add('testDiv')
        testDiv.id = testsArray[i].id

        //Test status
        let testStatusDiv = document.createElement('div')
        let testStatus = document.createElement('img')
        testStatus.classList.add("testStatusDiv")

        if (!testsArray[i].isDone) {
            testStatus.src = "pending.png"
        }else {
            testStatus.src = "done.png"
        }

        testStatusDiv.appendChild(testStatus)

        //img
        let imageDiv = document.createElement('div')
        let image = document.createElement('img')
        image.src = testsArray[i].img
        imageDiv.classList.add("image")


        imageDiv.appendChild(image)


        //Test Name
        let testName = document.createElement('div')
        testName.textContent = testsArray[i].name

        testName.classList.add('testname')

        testDiv.appendChild(imageDiv)
        testDiv.appendChild(testStatusDiv)
        testDiv.appendChild(testName)
        testsList.appendChild(testDiv)

        clickedTest(testsArray[i].id)

    }
}

function clickedTest(id) {
    let tests = document.querySelectorAll(".testDiv")
    
    tests.forEach(item => {
        item.addEventListener('click', () => {
            goQuiz(item.id, id)
        })
    });
    
}

function goQuiz(currentTestId, id) {
    if (currentTestId == id) {
        window.location.href = 'test.html?id=' + currentTestId;
    }
}

function result() {
    axios.get('http://127.0.0.1:5500/index.json')

    .then(function (response) {
        quizzis = response.data
        rewrite(quizzis.tests)
    })
    .catch(function (error) {
        console.log(error);
    });
}