$('#startSurveyButton').click(function(){
  var firstName = $('#firstName').val();
  $('#firstName').val(firstName.trim());
  var lastName = $('#lastName').val();
  $('#lastName').val(lastName.trim());
  var emailAddress = $('#email').val();

  $('.errorMessages').empty();
  var emailCorrect = isEmail(emailAddress);
  var firstNameCorrect = isCorrect(firstName, 'fn');
  var lastNameCorrect = isCorrect(lastName, 'ln');

  if (firstNameCorrect && lastNameCorrect && emailCorrect) {
    $('#navbarButton').show();
    $('#navigationItems').show();
    hideInfoForm();
    questionView(1);
  }
});

function isCorrect(name, type) {
  var nameToTest = name.trim();
  if(nameToTest === '' || nameToTest.length === 0 || nameToTest.length >= 100) {
    if(type==='fn') {
      $('#firstNameDiv').append('<div class="errorMessages"><p class="text-danger"'  +
      '>Name must be between 1-100 letters.</p></div>');
      $('#firstName').css({ "border": '#a94442 1px solid'});

    }
    if(type==='ln') {
      $('#lastNameDiv').append('<div class="errorMessages"><p class="text-danger"' +
      '>Name must be between 1-100 letters.</p></div>');
      $('#lastName').css({ "border": '#a94442 1px solid'});
    }
  } else {
    return true;
  }
}

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var legitEmail = regex.test(email);
  if(legitEmail) {
    return true;
  } else {
    $('#emailDiv').append('<div class="errorMessages"><p class="text-danger"' +
    '>This requires properly formatted e-mail!</p></div>');
    $('#email').css({ "border": '#a94442 1px solid'});
  }

}

function hideInfoForm() {
  $('#contactInfo').hide();
}

function hideQuestions() {
    $('#question1').hide();
    $('#question2').hide();
    $('#question3').hide();
    $('#question4').hide();
    $('#question5').hide();
    $('#question6').hide();
}

function questionView(number) {
  //if you add a question to this survey make sure to calculate
  // ceiling of 100/(numberOfQuestions - 1) and change the following two 20s
  // to that result
  var progressAmount = ((number*20)-20);
  hideQuestions();
  $('#question' + number).show();
  $('#myBar').css('width', progressAmount + '%');
}

$('#question1NextButton').click(function(){
    questionView(2);
});

$('#question2NextButton').click(function () {
    questionView(3);
});

$('#question3NextButton').click(function () {
    questionView(4);
})
$('#question4NextButton').click(function () {
    questionView(5);
});

$('#question5NextButton').click(function () {
    questionView(6);
});

$('#navigationOne').click(function () {
    questionView(1);
});

$('#navigationTwo').click(function () {
    questionView(2);
});

$('#navigationThree').click(function () {
    questionView(3);
});

$('#navigationFour').click(function () {
    questionView(4);
});

$('#navigationFive').click(function () {
    questionView(5);
});

$('#navigationSix').click(function () {
    questionView(6);
});

$('#answers').click(function () {

    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let email = $('#email').val();
    let question1 = $('input[name=questionOne]:checked').val()
    let question2 = $('input[name=questionTwo]:checked').val()
    let question3 = $('input[name=questionThree]:checked').val()
    let question4 = $('input[name=questionFour]:checked').val()
    let question5 = $('input[name=questionFive]:checked').val()
    let question6 = $('input[name=questionSix]:checked').val()

    $.ajax({
        type: 'POST',
        url: 'http://localhost:5000/questions',
        data: JSON.stringify({
            firstname: firstName,
            lastname: lastName,
            email: email,
            question1: question1,
            question2: question2,
            question3: question3,
            question4: question4,
            question5: question5,
            question6: question6
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        dataType: 'json',
    }).always(function (xhr) {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('Post in Questionaire Table Successful!');
            window.location.href = 'video.html';

        } else {
            console.log('Post Attempt Failed');
        }
    });
});
