// Inicialización de la variable de estado
let state = { history: [], attempts: {} };

// Variables para manejar el flujo de preguntas
let currentBlock = [];
let currentIndex = 0;
const BLOCK_SIZE = 10;

// Verificar si 'questions' está definida
if (typeof questions === 'undefined' || questions.length === 0) {
  console.error("Las preguntas no están definidas o están vacías.");
} else {
  console.log("Preguntas cargadas correctamente.");
}

// Función para cargar las preguntas en un bloque
function getBlockQuestions(startIndex) {
  return questions.slice(startIndex, startIndex + BLOCK_SIZE);
}

// Mostrar una pregunta y sus opciones
function showQuestion(index) {
  const question = questions[index];
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");

  questionEl.textContent = question.question;
  optionsEl.innerHTML = "";

  for (const [key, option] of Object.entries(question.options)) {
    const button = document.createElement("button");
    button.textContent = `${key}. ${option}`;
    button.onclick = () => selectAnswer(index, key);
    optionsEl.appendChild(button);
  }
}

// Función para manejar la selección de la respuesta
function selectAnswer(index, selectedOption) {
  const question = questions[index];
  const correct = question.correct;

  state.history.push({
    questionId: question.id,
    selected: selectedOption,
    correct: correct
  });

  document.querySelectorAll("#options button").forEach(button => button.disabled = true);
  document.getElementById("nextBtn").disabled = false;

  if (selectedOption === correct) {
    alert("¡Respuesta correcta!");
  } else {
    alert("Respuesta incorrecta. La respuesta correcta es: " + correct);
  }
}

// Función para ir a la siguiente pregunta
function nextQuestion() {
  currentIndex++;

  if (currentIndex < questions.length) {
    showQuestion(currentIndex);
  } else {
    alert("Has terminado el cuestionario.");
  }
}

// Añadir el botón de siguiente pregunta
document.getElementById("nextBtn").onclick = nextQuestion;
