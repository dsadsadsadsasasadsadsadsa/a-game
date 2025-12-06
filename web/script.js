(() => {
  const $ = id => document.getElementById(id);
  const startBtn = $('start');
  const gameSection = $('game');
  const rminSpan = $('rmin');
  const rmaxSpan = $('rmax');
  const minInput = $('min');
  const maxInput = $('max');
  const guessInput = $('guess');
  const submitBtn = $('submit');
  const giveupBtn = $('giveup');
  const resetBtn = $('reset');
  const feedback = $('feedback');
  const attemptsP = $('attempts');

  let secret = null;
  let attempts = 0;
  let low = 1, high = 100;

  function updateAttempts() {
    attemptsP.textContent = `Attempts: ${attempts}`;
  }

  function setFeedback(text, cls) {
    feedback.textContent = text;
    feedback.className = `feedback ${cls || ''}`.trim();
  }

  function startGame() {
    low = parseInt(minInput.value, 10) || 1;
    high = parseInt(maxInput.value, 10) || 100;
    if (low > high) {
      alert('Minimum must be <= Maximum');
      return;
    }
    secret = Math.floor(Math.random() * (high - low + 1)) + low;
    attempts = 0;
    rminSpan.textContent = low;
    rmaxSpan.textContent = high;
    gameSection.classList.remove('hidden');
    setFeedback('Game started. Make your guess!', '');
    updateAttempts();
    guessInput.value = '';
    guessInput.focus();
    console.log('Secret (debug):', secret);
  }

  function makeGuess() {
    const raw = guessInput.value.trim();
    if (!raw) return;
    const g = Number(raw);
    if (!Number.isInteger(g)) {
      setFeedback('Please enter an integer.', '');
      return;
    }
    if (g < low || g > high) {
      setFeedback(`Out of range: enter a number between ${low} and ${high}.`, '');
      return;
    }
    attempts += 1;
    updateAttempts();

    if (g < secret) {
      setFeedback('Too low.', 'too-low');
    } else if (g > secret) {
      setFeedback('Too high.', 'too-high');
    } else {
      setFeedback(`Correct! You guessed ${secret} in ${attempts} attempts.`, 'correct');
    }
  }

  function giveUp() {
    setFeedback(`You gave up. The number was ${secret}.`, '');
  }

  function resetAll() {
    secret = null;
    attempts = 0;
    gameSection.classList.add('hidden');
    setFeedback('', '');
  }

  startBtn.addEventListener('click', startGame);
  submitBtn.addEventListener('click', makeGuess);
  guessInput.addEventListener('keydown', e => { if (e.key === 'Enter') makeGuess(); });
  giveupBtn.addEventListener('click', giveUp);
  resetBtn.addEventListener('click', resetAll);

})();
