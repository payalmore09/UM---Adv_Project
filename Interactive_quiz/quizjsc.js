const quizData = [
  {
    question: "What does 'CPU' stand for?",
    a: "Central Processing Unit",
    b: "Computer Processing Unit",
    c: "Central Processor Unit",
    d: "Computer Processor Unit",
    correct: "a"
  },
  {
    question: "Which programming language is used for building dynamic and interactive websites?",
    a: "Java",
    b: "Python",
    c: "JavaScript",
    d: "C++",
    correct: "c"
  },
  {
    question: "What is the purpose of a firewall in computer networks?",
    a: "To prevent unauthorized access",
    b: "To speed up internet connection",
    c: "To store backup data",
    d: "To monitor hardware performance",
    correct: "a"
  },
  {
    question: "What type of software allows users to perform specific tasks, such as word processing or spreadsheet calculations?",
    a: "System software",
    b: "Utility software",
    c: "Application software",
    d: "Firmware",
    correct: "c"
  },
  {
    question: "Which type of network topology connects all devices in a single loop?",
    a: "Star",
    b: "Bus",
    c: "Ring",
    d: "Mesh",
    correct: "c"
  },
  {
    question: "What does 'HTML' stand for?",
    a: "HyperText Markup Language",
    b: "Hyperlink and Text Markup Language",
    c: "High Tech Markup Language",
    d: "HyperText Model Language",
    correct: "a"
  },
  {
    question: "Which protocol is used for securely transmitting data over the internet?",
    a: "HTTP",
    b: "FTP",
    c: "SMTP",
    d: "HTTPS",
    correct: "d"
  },
  {
    question: "What does 'LAN' stand for?",
    a: "Local Access Network",
    b: "Large Area Network",
    c: "Local Area Network",
    d: "Land Area Network",
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
