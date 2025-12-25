// Importa Firebase Analytics desde el SDK modular
import { getAnalytics } from "firebase/analytics";

// Configura Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA8Cx38i-rvc-RX4zaEU8b2_ONVj7Rfy2Y",
  authDomain: "word-3bcb4.firebaseapp.com",
  projectId: "word-3bcb4",
  storageBucket: "word-3bcb4.firebasestorage.app",
  messagingSenderId: "933335373972",
  appId: "1:933335373972:web:cba07eb5e8b64949b0fc81",
  measurementId: "G-F4QSBQLS5T"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firebase Analytics (usando getAnalytics)
const analytics = getAnalytics(app);
