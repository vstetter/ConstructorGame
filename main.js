

// knight constructor

function Prince(spec) {
  var spec = spec || {};
  this.name = spec.name || "Prince Phillip";
  this.life = 100;
  this.attack = function (dragon, princess) {
    var hits = Math.floor(Math.random() * 20);

    $(".logs").text("pew pew");
    dragon.damage(hits);
    princess.damage(hits);
  }
}

// princess constructor

function Princess() {
  this.name = "Princess Aurora";
  this.life = 3;
  this.damage = function (hits) {

    if (this.life > 0) {
      if (hits % 5 === 0) {
        this.life = this.life - 1;
        $(".logs").append("<h3>Oh no, "+ this.name + " was hit, too! But she's still alive...</h3>");
      } else {
        this.life = this.life;
      }
    } else {
      $(".logs").text("");
      $(".logs").append("<h3>The princess has died, you lose!!!</h3>");
    }
  }
}

//dragon constructor

function Dragon() {
  this.name = "Dragula";
  this.life = 100;
  this.damage = function (hits) {
    if(this.life > 0) {
      this.life = this.life - hits;
      $(".logs").append("<h3>" + this.name + " was hit!!</h3>");
    } else {
      $(".logs").append("<h3>" + this.name + " has died, you win!!!!!</h3>");
    }
  }

}


var myPage = {

  init: function () {
    myPage.initEvents();
  },

  initStyling: function () {

  },

  initEvents: function () {
    $("#createGame").on('submit', function (event) {
      event.preventDefault();
      var traits = {
        name: $('#prince input[name="name"]').val(),
      };
      myPage.prince = new Prince(traits);
      myPage.dragon = new Dragon();
      myPage.princess = new Princess();
      $('#createGame').hide();
      myPage.renderBoard();
    });
    $('#board').on("click", "button", function (event) {
      event.preventDefault();

      myPage.prince.attack (myPage.dragon, myPage.princess);
      $(".status").text(myPage.dragon.name + " has " + myPage.dragon.life + " lives left.");

    });
  },

  renderBoard: function () {
    $('#board').append("<button>Attack</button>");

  }

};

$(document).ready(function () {
  myPage.init();
});
