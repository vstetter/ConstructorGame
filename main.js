

// prince constructor

function Prince(spec) {
  var spec = spec || {};
  this.name = spec.name || "Prince Phillip";
  this.life = 3;
  $("#livesPrinceRem").text(this.life);
  this.attack = function (dragon, princess) {
    var hits = Math.floor(Math.random() * 20);
    $(".logs").text("");
    $("#ammo").text("");
    $("#ammo").text(">> pow pow >>");
    // $("#attackButton").append("<span id='ammo'>pew pew</span>");
    // $(".logs").text("pew pew");
    dragon.damage(hits);
    princess.damage(hits);
    this.damage(hits);
  }
  this.damage = function (hits) {
    if (this.life > 0) {
      if (hits % 6 === 0) {
        this.life = this.life - 1;
        $(".logs").append("<h3>" + this.name + " was scorched by the dragon's breath - he loses one life!</h3>");
        $("#livesPrinceRem").text(this.life);
      } else {
        this.life = this.life;
      }
    } else {
      $(".logs").text("");
      $(".logs").append("<h3>The dragon killed "+ this.name + ", you lose!!!</h3>");
    }
  }
}

// princess constructor

function Princess() {
  this.name = "Princess Aurora";
  this.life = 3;
  $("#livesPrincessRem").text(this.life);
  this.damage = function (hits) {

    if (this.life > 0) {
      if (hits % 5 === 0) {
        this.life = this.life - 1;
        $(".logs").append("<h3>Oh no, "+ this.name + " was hit, too! She loses a life...</h3>");
        $("#livesPrincessRem").text(this.life);

      } else {
        this.life = this.life;
      }
    } else {
      $(".logs").text("");
      $(".logs").append("<h3>" + this.name + " has died, you lose!!! What kind of a prince are you?</h3>");
    }
  }
}

//dragon constructor

function Dragon() {
  this.name = "Dragula";
  this.life = 100;
  $("#livesDragonRem").text(this.life);
  this.damage = function (hits) {
    if(this.life > 0) {
      this.life = this.life - hits;
      $(".logs").append("<h3>" + this.name + " was hit!!</h3>");
      $("#livesDragonRem").text(this.life);
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
      $(".status").hide();
      $(".livesDragonRem").text(myPage.dragon.life);

    });
  },

  renderBoard: function () {
    $('#board').append("<div id='attackButton'><button>Attack</button><span id='ammo'></span></div>");

  }

};

$(document).ready(function () {
  myPage.init();
});
