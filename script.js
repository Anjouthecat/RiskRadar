
let score = 0;
let progress = 1;

const clickSound = document.getElementById('click-sound');
const successSound = document.getElementById('success-sound');
const failSound = document.getElementById('fail-sound');

const scenarios = {
  phishing: {
    title: "🎣 Phishing",
    text: "Click here to verify your bank account now!",
    correct: "scam"
  },
  romance: {
    title: "💘 Romance Scam",
    text: "I love you. Please send money for a flight ticket ❤️",
    correct: "scam"
  },
  shopping: {
    title: "🛍️ Online Shopping",
    text: "Flash deal: iPhone 14 for $100! Limited time.",
    correct: "scam"
  }
};

let currentLevel = null;

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function goToHome() {
  document.getElementById('level-progress').textContent = progress;
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('filled', i < progress);
  });
  showScreen('home-screen');
}

function goToLevels() {
  showScreen('levels-screen');
}

function startLevel(key) {
  playSound(clickSound);
  currentLevel = scenarios[key];
  document.getElementById('level-title').textContent = currentLevel.title;
  document.getElementById('scenario-text').textContent = currentLevel.text;
  showScreen('game-screen');
}

function answer(choice) {
  const result = document.getElementById('result-msg');
  const badge = document.getElementById('badge');

  if (choice === currentLevel.correct) {
    result.textContent = "✅ Correct! You spotted the scam.";
    playSound(successSound);
    score++;
    progress++;
    badge.classList.remove('hidden');
  } else {
    result.textContent = "❌ Oops! That was a scam.";
    playSound(failSound);
    badge.classList.add('hidden');
  }

  document.getElementById('score').textContent = score;
  const funFacts = [
    "Scammers often use urgency to trick you.",
    "Romance scams cost victims over $300 million per year.",
    "Phishing emails often have spelling mistakes.",
    "Fake job offers usually ask for personal info early.",
    "If it seems too good to be true, it probably is.",
    "Scammers may impersonate real companies or banks.",
    "Verify links before clicking – always.",
    "Real organizations don’t pressure you to act fast.",
    "Don't trust unknown senders asking for money or info.",
    "Scams often use emotional manipulation to trick victims."
  ];
  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
  document.getElementById("fun-fact").textContent = "💡 " + randomFact;
  showScreen('result-screen');
}

function playSound(sound) {
  if (!sound) return;
  const playPromise = sound.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        console.log("🔊 Sound played:", sound.id);
      })
      .catch((error) => {
        console.warn("🚫 Sound playback blocked or failed:", sound.id, error);
        document.body.addEventListener('click', () => {
          sound.play().catch(err => console.error("Still blocked:", err));
        }, { once: true });
      });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const introSound = document.getElementById('intro-sound');
  if (!introSound) return;

  const playPromise = introSound.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        console.log("🎵 Intro played");
      })
      .catch((err) => {
        console.warn("🔇 Autoplay blocked, waiting for click...");
        document.body.addEventListener('click', () => {
          introSound.play().catch(err => console.error("Still blocked:", err));
        }, { once: true });
      });
  }
});
