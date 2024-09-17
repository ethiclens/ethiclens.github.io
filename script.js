let currentStep = 0;
let responses = [];

document.addEventListener('DOMContentLoaded', init);

function init() {
  console.log('Starte die Anwendung');
  // Zeige den Start-Screen und verstecke das Quiz und die Zusammenfassung
  document.getElementById('start-screen').style.display = 'block';
  document.getElementById('quiz-container').style.display = 'none'; 
  document.getElementById('final-summery-statements').style.display = 'none'; 
}

function startQuiz() {
  console.log('Quiz gestartet');
  // Verstecke den Start-Screen und zeige das Quiz (In-Page-Layout) an
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('main-header').style.display = 'none';
  // Blende den Quiz-Container und den Statusbereich ein
  document.getElementById('quiz-container').style.display = 'flex';
  document.getElementById('status-bar').style.display = 'block';
document.getElementsByTagName('footer')[0].style.display = 'none';

  showQuestion(currentStep);
  updateProgress();
}

function showQuestion(step) {
  const question = questions[step];
  console.log(`Zeige Frage ${step + 1}: ${question.question}`);

  // Aktualisiere den Quiz-Header: "Frage X von Y"
  document.getElementById('quiz-header').textContent = `Frage ${step + 1} von ${questions.length}`;

  // Setze die Frage und Antworten
  document.getElementById('quiz-question').textContent = question.question;
  document.getElementById('quiz-answers').innerHTML = question.answers.map((answer, index) =>
    `<button class="quiz-button" onclick="handleAnswer(${step}, ${index})">${answer}</button>`
  ).join('');
document.getElementById('quiz-info').innerHTML = question.info;


  // Verstecke den Feedback-Bereich
  document.getElementById('feedback-container').style.display = 'none';

  // Aktualisiere den Fortschrittsbalken
  updateProgress();
}


function handleAnswer(step, answerIndex) {
  const question = questions[step];
  const score = question.score[answerIndex];
  const recommendation = answerIndex === 0 ? question.yesRecommendation : question.noRecommendation;

  responses.push({
    question: question.question,
    answer: question.answers[answerIndex],
    recommendation: recommendation,
    score: score
  });

  // Zeige die Rückmeldung an
  showFeedback(recommendation);
}

function showFeedback(recommendation) {
  // Überprüfe, ob der Recommendation-Text "Es gibt keine zusätzlichen ethischen Bedenken." enthält
  if (recommendation === "Es gibt keine zusätzlichen ethischen Bedenken.") {
    // Gehe direkt zur nächsten Frage ohne das Modal anzuzeigen
    goToNextQuestion();
  } else {
    // Zeige das Feedback-Modal nur an, wenn es relevante ethische Bedenken gibt
    const modal = document.getElementById('feedback-modal');
    modal.style.display = 'flex';
    document.getElementById('modal-feedback-text').innerHTML = recommendation;
  }
}


// Funktion zum Schließen des Modals
function closeModal() {
  document.getElementById('feedback-modal').style.display = 'none';
}

// Aktualisiere die goToNextQuestion-Funktion
function goToNextQuestion() {
  closeModal(); // Schließe das Modal, bevor die nächste Frage angezeigt wird

  if (currentStep < questions.length - 1) {
    currentStep++;
    showQuestion(currentStep);
    updateProgress();
  } else {
    showStatement();
  }
}


function updateProgress() {
  // Berechne den Fortschritt als Prozentsatz basierend auf der Anzahl der Fragen
  const progress = ((currentStep + 1) / questions.length) * 100;
  
  // Aktualisiere die Breite der Progress-Bar
  document.getElementById('progress-bar').style.width = progress + '%';
}


function showStatement() {
  // Blende das Quiz und den Statusbereich aus und zeige die Zusammenfassung
  document.getElementById('quiz-container').style.display = 'none';
  document.getElementById('status-bar').style.display = 'none';
  document.getElementById('main-header').style.display = 'block';
document.getElementsByTagName('footer')[0].style.display = 'block';

  // Zeige die finale Zusammenfassung
  const summarySection = document.getElementById('final-summery-statements');
  summarySection.style.display = 'block';

  document.getElementById('summary').innerHTML = responses.map(response => {
    let urgencyClass = '';

    if (response.score === 2) {
      urgencyClass = 'very-urgent';
    } else if (response.score === 1) {
      urgencyClass = 'urgent';
    } else {
      urgencyClass = 'unproblematic';
    }

    return `
        <div class="summary-item ${urgencyClass}">
            <p><strong>Frage:</strong> ${response.question}</p>
            <p><strong>Antwort:</strong> ${response.answer}</p>
            <p><strong>Empfehlung:</strong> ${response.recommendation}</p>
        </div>
    `;
  }).join('');
}

function goToStartScreen() {
  // Blende den Statusbereich und die Zusammenfassung aus
  document.getElementById('quiz-container').style.display = 'none';
  document.getElementById('status-bar').style.display = 'none';
  document.getElementById('final-summery-statements').style.display = 'none';
  document.getElementById('main-header').style.display = 'block';
  document.getElementById('start-screen').style.display = 'block';
document.getElementsByTagName('footer')[0].style.display = 'block';


}
