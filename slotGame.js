const debugEl = document.getElementById('debug'),
      icon_width = 79,
      icon_height = 79,
      num_icons = 9,
      time_per_icon = 100,
      indexes = [0, 0, 0],
      iconMap = ["banana", "seven", "cherry", "plum", "orange", "bell", "bar", "lemon", "melon"];

const roll = (reel, offset = 0) => {
  const delta = (offset + 2) * num_icons + Math.floor(Math.random() * num_icons);
  const style = getComputedStyle(reel);
  const backgroundPositionY = parseFloat(style.backgroundPositionY || '0');
  const targetPositionY = backgroundPositionY + delta * icon_height;
  const normalizedPositionY = targetPositionY % (num_icons * icon_height);

  return new Promise((resolve) => {
    setTimeout(() => {
      reel.style.transition = `background-position-y ${(8 + delta) * time_per_icon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
      reel.style.backgroundPositionY = `${targetPositionY}px`;
    }, offset * 150);

    setTimeout(() => {
      reel.style.transition = `none`;
      reel.style.backgroundPositionY = `${normalizedPositionY}px`;
      resolve(delta % num_icons);
    }, (8 + delta) * time_per_icon + offset * 150);
  });
};

function rollAll() {
  debugEl.textContent = 'Rolling...';
  const reels = document.querySelectorAll('.reel');

  Promise.all([...reels].map((reel, i) => roll(reel, i)))
    .then((results) => {
      results.forEach((result, i) => {
        indexes[i] = (indexes[i] + result) % num_icons;
      });

      debugEl.textContent = indexes.map(i => iconMap[i]).join(' - ');

      if (indexes[0] === indexes[1] || indexes[1] === indexes[2]) {
        console.log('WIN WIN WIN');
        debugEl.textContent += ' 🎉 WIN!';
      }

      setTimeout(rollAll, 3000);
    });
}

setTimeout(rollAll, 1000);
