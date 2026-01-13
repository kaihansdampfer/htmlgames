(function () {
  const root = (window.HTMLGAMES = window.HTMLGAMES || {});
  const prefs = root.prefs;
  const PREFIX = `${prefs.prefix}hs:`;

  function keyFor(gameId) {
    return `hs:${gameId}`;
  }

  function normalizeScores(scores) {
    if (!Array.isArray(scores)) return [];
    return scores
      .map((entry) => ({
        score: Number(entry.score) || 0,
        when: Number(entry.when) || Date.now(),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 20);
  }

  function submit(gameId, score) {
    if (!gameId) return [];
    const numericScore = Number(score);
    if (!Number.isFinite(numericScore)) return [];
    const scores = normalizeScores(prefs.get(keyFor(gameId), []));
    scores.push({ score: numericScore, when: Date.now() });
    const nextScores = normalizeScores(scores);
    prefs.set(keyFor(gameId), nextScores);
    return nextScores;
  }

  function top(gameId, limit = 5) {
    const scores = normalizeScores(prefs.get(keyFor(gameId), []));
    return scores.slice(0, limit);
  }

  function reset(gameId) {
    prefs.remove(keyFor(gameId));
  }

  function resetAll() {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (key && key.startsWith(PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  }

  function listGames() {
    const games = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (key && key.startsWith(PREFIX)) {
        const gameId = key.slice(PREFIX.length);
        if (gameId) {
          games.push(gameId);
        }
      }
    }
    return games.sort();
  }

  root.highscores = {
    submit,
    top,
    reset,
    resetAll,
    listGames,
  };
})();
