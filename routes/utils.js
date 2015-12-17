var BingoCard = require('../models/card');

module.exports.random_card = function() {
  var card = new BingoCard();
  card.spaces = [];

  for(var i = 0; i < 25; i ++) {
    var space = {};
    space.value = 'MEMES HAPPEN';
    space.key = '0';
    space.activated = false;
    card.spaces[i] = space;
  }

  card.spaces[12].value = 'FREELO';
  card.spaces[12].key = '1';
  card.spaces[12].activated = true;

  return card;
}

module.exports.get_spaces = function(body) {
  var spaces = [];
  for (var key in body) {
    if (body.hasOwnProperty(key)) {
      var obj = body[key];
      console.log(key);
      if(key.match(/(\d+)$/)) {
        var num = parseInt(key.match(/(\d+)$/)[0], 10);
        console.log(num);
        var type = key.match(/([A-z]+)(?=[\d])/)[0];
        console.log(type);
        
        if(spaces[num] == null) {
          spaces[num] = {};
        }

        if(type == "space") {
          spaces[num].value = obj;
        }
        else if(type == "key") {
          spaces[num].key = obj;
        }
        else if(type == "activated") {
          spaces[num].activated = true;
        }
      }
    }
  }

  return spaces;
}