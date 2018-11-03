$(document).ready(function() {
  var questions = [
    {
      // question 1
      question:
        "Which two actors directed themselves in movies and won Oscars for Best Actor?",
      choices: [
        {
          chocie: "Laurence Olivier and Roberto Benigni",
          correct: true,
          img: ""
        },
        {
          chocie: "Jack Nicholson and Kevin Spacey",
          correct: false,
          img: "a"
        },
        {
          chocie: "Laurence Olivier and Roberto Benigni",
          correct: false,
          img: "a"
        },
        {
          chocie: "Tom Hanks and Paul Newman",
          correct: false,
          img: "s"
        }
      ]
    },
    // question 2
    {
      question:
        '"After all, tomorrow is another day!" was the last line in which Oscar-winning Best Picture?',
      choices: [
        {
          chocie: "Great Expectations",
          correct: false,
          img: ""
        },
        {
          chocie: "Gone With the Wind",
          correct: true,
          img: ""
        },
        {
          chocie: "Harold and Maude",
          correct: false,
          img: ""
        },
        {
          chocie: "The Matrix",
          correct: false,
          img: ""
        }
      ]
    },
    //question 3
    {
      question:
        "Who is the only person to win an Oscar for Best Director for the only movie he ever directed?",
      choices: [
        {
          chocie: "Bob Fosse",
          correct: false,
          img: ""
        },
        {
          chocie: "Frank Borzage",
          correct: false,
          img: ""
        },
        {
          chocie: "Leo McCarey",
          correct: false,
          img: ""
        },
        {
          chocie: "Jerome Robbins",
          correct: true,
          img: ""
        }
      ]
    },
    //question 4
    {
      question: "Who is the most nominated actor in Academy history?",
      choices: [
        {
          chocie: "Jack Nicholson",
          correct: true,
          img: ""
        },
        {
          chocie: "Laurence Olivier",
          correct: false,
          img: ""
        },
        {
          chocie: "Spencer Tracy",
          correct: false,
          img: ""
        },
        {
          chocie: "Paul Newman",
          correct: false,
          img: ""
        }
      ]
    }
  ];

  // status
  var correct = 0;
  var wrong = 0;
  // start q index
  var start = 0;
  // render function
  function render() {
    $("#correct").text("Correct answers : " + correct);
    $("#wrong").text("Wrong answers : " + wrong);
    if (start > 3) {
      console.log("done");
      return;
    }
    var q = questions[start].question;
    console.log(q);
    var h3 = $("<h3>").text(q);
    $(".battlefield").append(h3);
    var choices = questions[start].choices;
    var i = 0;
    choices.forEach(function(c) {
      var p = $("<p>").text(c.chocie);
      p.attr("value", i);
      $(".battlefield").append(p);
      i++;
    });
  }
  // calling the function
  $("#start").on("click", function() {
    $(this).hide();
    render();
    timer();
  });

  //timer function
  var time = 5;
  var counter;
  function timer() {
    counter = setInterval(function() {
      if (time <= 0 && start > 3) {
        console.log("game over");
        clearInterval(counter);
        reset();
      } else if (time <= 0) {
        clearInterval(counter);
        time = 5;
        wrong++;
        change();
      } else {
        time--;
        $("#timer").text(time);
      }
    }, 1000);
    $("#timer").text(time);
  }

  // function chose answer
  var next;
  function change() {
    $("p").each(function(i, e) {
      if (questions[start].choices[i].correct == true) {
        $(this).css("background", "green");
      } else {
        $(this).css("background", "red");
      }
    });
    clearInterval(counter);

    next = setTimeout(function() {
      time = 5;
      start++;
      $("h3 , p").remove();
      render();
      timer();
      lock = false;
    }, 5000);
  }
  var lock = false;
  $(document).on("click", "p", function() {
    if (lock == false) {
      var t = event.target;
      if (questions[start].choices[$(t).attr("value")].correct == true) {
        correct++;
        console.log(correct);
      } else {
        wrong++;
        console.log(wrong);
      }
      lock = true;
      change();
    }
  });

  //reset
  function reset() {
    correct = 0;
    wrong = 0;
    time = 5;
    start = 0;
    var restart = $('<button id="restart">').text("restart");
    $(".battlefield").append(restart);
    $("#restart").on("click", function() {
      $(this).fadeOut();
      render();
      timer();
    });
  }
});
