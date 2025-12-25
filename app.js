// Inicialización de la variable de estado
let state = { history: [], attempts: {} };

// Variables para manejar el flujo de preguntas
let currentBlock = [];
let currentIndex = 0;
const BLOCK_SIZE = 2;  // Mostramos 2 preguntas por bloque por ahora

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

// ===================== FUNCIONES DE MENÚ Y TEST =====================

// Mostrar el menú principal
function showMenu() {
  const loginEl = document.getElementById("login");
  const menuEl = document.getElementById("menu");
  const testEl = document.getElementById("test");
  const blockMsgEl = document.getElementById("blockMsg");

  loginEl.style.display = "none";
  testEl.style.display = "none";
  blockMsgEl.style.display = "none";
  menuEl.style.display = "block";

  menuEl.innerHTML = "";  // Limpiar el contenido del menú
  const h2 = document.createElement("h2");
  h2.textContent = "Selecciona un bloque de preguntas";
  menuEl.appendChild(h2);

  // Agregar bloques de preguntas al menú
  const blockButton = document.createElement("button");
  blockButton.textContent = "Bloque 1";
  blockButton.onclick = () => startTest();
  menuEl.appendChild(blockButton);
}

// Iniciar el cuestionario
function startTest() {
  const menuEl = document.getElementById("menu");
  const testEl = document.getElementById("test");

  // Ocultar el menú
  menuEl.style.display = "none";
  testEl.style.display = "block";

  // Cargar las preguntas
  currentBlock = getBlockQuestions(currentIndex);
  showQuestion(currentIndex);
}

// Cerrar sesión
async function logout() {
  try {
    await auth.signOut();
    alert('Has cerrado sesión');
    showLoginScreen();  // Mostrar la pantalla de login nuevamente
  } catch (error) {
    console.error('Error al cerrar sesión:', error.message);
  }
}
