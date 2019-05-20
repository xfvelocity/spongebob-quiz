const body = document.querySelector('section');
const questionDiv = document.createElement('div');
const buttonDiv = document.createElement('div');
const ul = document.createElement('ul');
const li = document.createElement('li');
const title = document.createElement('h2');
const rightArrow = document.createElement('i');
const next = document.createElement('button');
const submit = document.createElement('button');
const button = document.createElement('button');
rightArrow.classList.add('fas', 'fa-arrow-circle-right', 'right');
const quizButton = document.getElementsByClassName('quizButton');
const quizQuestion = Math.floor(Math.random() * questions.length);

const appendQDiv = element => {
  questionDiv.appendChild(element);
};

const appendBDiv = element => {
  buttonDiv.appendChild(element);
};

const transition = (area, time) => {
  area.style.transition = `${time}s ease`;
};

let t = 0;
const typeWriter = type => {
  if (t < type.length) {
    title.innerHTML += type.charAt(t);
    t++;
    setTimeout(typeWriter, 40, type);
  }
};

const list = {
  create: () => {
    body.appendChild(questionDiv);
    questionDiv.classList.add('questionDiv');
    title.classList.add('quizTitle');
    appendQDiv(title);
    appendQDiv(ul);
    appendQDiv(buttonDiv);
    buttonDiv.classList.add('buttonDiv');
    appendBDiv(submit);
    submit.classList.add('submitButton');
    submit.innerHTML = 'Submit';
    appendBDiv(next);
    next.classList.add('nextButton');
    next.innerHTML = 'Next';
    next.appendChild(rightArrow);
  },

  addTitle: question => {
    typeWriter(questions[question].question);
  },

  addAnswer: question => {
    for (let i = 0; i < 4; i += 1) {
      const li = document.createElement('li');
      ul.appendChild(li);
      li.appendChild(button);
      li.classList.add('quizButton');
      li.setAttribute('id', i);
      li.innerHTML = questions[question].answer[i];
    }
  }
};

const createQuiz = question => {
  list.create();
  list.addTitle(question);
  list.addAnswer(question);
};

const resetQuiz = () => {
  body.removeChild(questionDiv);
  title.innerHTML = '';
  t = 0;
  ul.innerHTML = '';
  createQuiz(Math.floor(Math.random() * questions.length));
};

ul.addEventListener('click', e => {
  const buttonPress = e.target;
  const correctAnswer = questions[quizQuestion].correct;
  let whichButton = document.getElementById(buttonPress.id);
  buttonPress.style.backgroundColor = 'white';
  buttonPress.style.color = 'black';

  if (buttonPress.innerHTML === correctAnswer) {
    whichButton.style.backgroundColor = '#00BF00';
    transition(whichButton, 0.7);
  } else {
    whichButton.style.backgroundColor = '#BD0000';
    transition(whichButton, 0.7);
  }
});

buttonDiv.addEventListener('click', e => {
  const buttonPressed = e.target;
  if (buttonPressed.className === 'submitButton') {
  } else if (buttonPressed.className === 'nextButton') {
    resetQuiz();
    buttonPressed.disabled = true;
    setTimeout(function() {
      buttonPressed.disabled = false;
    }, 1400);
    if (questions.shown === true) {
      resetQuiz();
    }
  }
});

createQuiz(quizQuestion);
