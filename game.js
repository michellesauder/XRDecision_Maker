const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");


let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];


// Questions for decision making
let questions = [
        {
          "question": "Is the quality of the decision important?",
          "choice1": "yes",
          "choice2": "no",
          "answer": 1
        },
        {
          "question": "Is team commitment to the decision important?",
          "choice1": "yes",
          "choice2": "no",
          "answer": 1
        },
        {
          "question": "Do you have enough information to make the decision on your own?",
          "choice1": "yes",
          "choice2": "no",
          "answer": 1
        },
        {
            "question": "Is the problem well structured?",
            "choice1": "yes",
            "choice2": "no",
            "answer": 1
          },
          {
            "question": "If you made the decision yourself, would the team support it?",
            "choice1": "yes",
            "choice2": "no",
            "answer": 1
          },
          {
            "question": "Does the team share organizational goals?",
            "choice1": "yes",
            "choice2": "no",
            "answer": 1
          },
          {
            "question": "Is conflict amongst the team over the decision likely?",
            "choice1": "yes",
            "choice2": "no",
            "answer": 1
          }

      
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 7;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    // game.classList.remove("hidden");
    // loader.classList.add("hidden");
  };

  getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
      localStorage.setItem("mostRecentScore", score);
      //go to the end page
      return window.location.assign("/end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerHTML = currentQuestion.question;
  
    choices.forEach(choice => {
      const number = choice.dataset["number"];
      choice.innerHTML = currentQuestion["choice" + number];
    });

//gets rid of old questions

availableQuesions.splice(questionIndex, 1);
acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
      if (!acceptingAnswers) return;
  
      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset["number"];
  
      const classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
  
      if (classToApply === "correct") {
        incrementScore(CORRECT_BONUS);
      }
  
      selectedChoice.parentElement.classList.add(classToApply);
  
      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 1000);
    });
  });

  incrementScore = num => {
    score += num;
    scoreText.innerText = score;
  };

  
startGame();
