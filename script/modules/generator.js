var Generator;

(function() {

  // Interface.
  Generator = {
    getRandomArtist: getRandomArtist
  };

  // Generate random artist data.
  function getRandomArtist() {
    var artist = {
      name: 'Test ' + (random(9000) + 1000),
      badgeNumber: random(10000) + 1,
      phone: randomOf([null, randomPhone()]),
      remarks: randomOf([null, 'Etc Whatever']),
      lotteryEligible: randomBool(),
    };

    if (artist.lotteryEligible) {
      artist.lotteryGuaranteed = randomBool();
    }

    return artist;
  }

  // Generate a random integer up to (but not including) the max value.
  function random(max) {
    return Math.floor(Math.random() * max);
  }

  // Select a random value from an array of values.
  function randomOf(choices) {
    return choices[random(choices.length)];
  }

  // Generate a random boolean value.
  function randomBool() {
    return Math.random() >= 0.5;
  }

  // Generate a random US phone number.
  function randomPhone() {
    var separator = randomOf(['.', '-', '']);
    var countryCode = randomOf(['', '1' + separator]);
    return countryCode +
      (random(800) + 200).toString() + separator +
      (random(800) + 200).toString() + separator +
      (random(9000) + 1000).toString();
  }

})();
