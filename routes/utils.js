var BingoCard = require('../models/card');

module.exports.random_card = function() {
  var card = new BingoCard();
  card.rows = [];
  for(var r = 0; r < 5; r ++) {
    var row = {};
    row.spaces = [];
    for(var c = 0; c < 5; c ++) {
      var space = {};
      space.value = 'MEMES HAPPEN';
      space.key = '0';
      space.activated = false;
      row.spaces[c] = space;
    }
    card.rows[r] = row;
  }
  console.log(card);
  card.rows[2].spaces[2].value = 'FREELO';
  card.rows[2].spaces[2].key = '1';
  card.rows[2].spaces[2].activated = true;

  return card;
}