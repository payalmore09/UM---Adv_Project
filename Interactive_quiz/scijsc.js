const quizData = [
  {
    question: "What is the chemical symbol for water?",
    a: "O2",
    b: "H2O",
    c: "CO2",
    d: "H3PO4",
    correct: "b"
  },
  {
    question: "Which element is the most abundant in the Earth's atmosphere?",
    a: "Oxygen",
    b: "Nitrogen",
    c: "Carbon",
    d: "Hydrogen",
    correct: "b"
  },
  {
    question: "What is the study of the Earth's physical structure and substance called?",
    a: "Biology",
    b: "Physics",
    c: "Chemistry",
    d: "Geology",
    correct: "d"
  },
  {
    question: "Which of the following is NOT a primary color of light?",
    a: "Red",
    b: "Green",
    c: "Yellow",
    d: "Blue",
    correct: "c"
  },
  {
    question: "What is the process by which plants make their own food called?",
    a: "Photosynthesis",
    b: "Respiration",
    c: "Transpiration",
    d: "Fermentation",
    correct: "a"
  },
  {
    question: "What is the closest planet to the Sun?",
    a: "Earth",
    b: "Mars",
    c: "Mercury",
    d: "Venus",
    correct: "c"
  },
  {
    question: "What is the unit of measurement for force?",
    a: "Newton",
    b: "Watt",
    c: "Volt",
    d: "Ampere",
    correct: "a"
  },
  {
    question: "Which subatomic particle has a negative charge?",
    a: "Proton",
    b: "Neutron",
    c: "Electron",
    d: "Photon",
    correct: "c"
  }
];

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const nextBtn = document.getElementById('next');
const submitBtn = document.getElementById('submit');
const prevBtn = document.getElementById('prev');

let currentQuiz = 0;
let score = 0;
let answers = [];

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];

  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;

  showAnswerOptions();

  if (currentQuiz === quizData.length - 1) {
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'inline-block';
  } else {
    nextBtn.style.display = 'inline-block';
    submitBtn.style.display = 'none';
  }
}

function deselectAnswers() {
  answerEls.forEach(answerEl => answerEl.checked = false);
}

function showAnswerOptions() {
  answerEls.forEach((answerEl, index) => {
    answerEl.style.display = 'inline-block';
    answerEl.checked = false;
  });
}

function getSelected() {
  let answer;
  answerEls.forEach(answerEl => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

prevBtn.addEventListener('click', () => {
  if (currentQuiz > 0) {
    currentQuiz--;
    loadQuiz();
  }
});

nextBtn.addEventListener('click', () => {
  const answer = getSelected();

  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }
    answers.push({ question: quizData[currentQuiz].question, selected: answer, correct: quizData[currentQuiz].correct });
    currentQuiz++;

    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      showResult();
    }
  }
});

submitBtn.addEventListener('click', () => {
  const answer = getSelected();

  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }
    answers.push({ question: quizData[currentQuiz].question, selected: answer, correct: quizData[currentQuiz].correct });
    showResult();
  }
});

function showResult() {
  quiz.innerHTML = `
    <h2>You answered ${score}/${quizData.length} questions correctly</h2>
    <button onclick="location.reload()">Reload</button>
    <button onclick="viewResult()">View Result</button>
  `;
}

function viewResult() {
  let resultHTML = `
    <h2>Quiz Result</h2>
    <table>
      <tr>
        <th>Question</th>
        <th>Your Answer</th>
        <th>Correct Answer</th>
      </tr>
  `;
  answers.forEach((answer, index) => {
    const isCorrect = answer.selected === answer.correct;
    resultHTML += `
      <tr>
        <td>${answer.question}</td>
        <td class="${isCorrect ? 'correct' : 'incorrect'}">${answer.selected.toUpperCase()}</td>
        <td>${answer.correct.toUpperCase()}</td>
      </tr>
    `;
  });
  resultHTML += `
    </table>
    <p>Total Marks: ${score}/${quizData.length}</p>
    <button onclick="location.reload()">Reload</button>
  `;
  quiz.innerHTML = resultHTML;
}
