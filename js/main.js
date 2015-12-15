//create variables
var equation = [];
var result = 0;
var temp = '';
var decimalAdded = false;

//create onclick event handler
$("button").on('click', function() {
  var val = $(this).text();

  //if you get a period, make sure it's not a duplicate
  if (val === '.') {
    if (!decimalAdded) {
      temp += val;
      decimalAdded = true;
    }

    //if you get a number
  } else if (!isNaN(val)) {
    temp += val;
    $('#result').val(temp); //not sure about this
    decimalAdded = false;

    //if you get a non-equals symbol
    //change multiplication symbol
  } else if (val === 'x') {
    equation.push(temp);
    equation.push('*');
    temp = '';

    //handle all clear
  } else if (val === 'AC') {
    equation = [];
    temp = '';
    result = 0;
    $('#result').val('');

    //handle clear entry
  } else if (val === 'CE') {
    temp = '';
    $('#result').val('');

    //handle equals and perform calc
  } else if (val === '=') {
    equation.push(temp);
    var newTotal = Number(equation[0]);

    for (var i = 1; i < equation.length; i++) {
      var next = Number(equation[i + 1]);
      var current = equation[i];

      if (current === '+') {
        newTotal += next;
      } else if (current === '-') {
        newTotal -= next;
      } else if (current === '*') {
        newTotal *= next;
      } else if (current === '/') {
        newTotal /= next;
      }

      i++;
    }

    //handle negative values
    if (newTotal < 0) {
      newTotal = Math.abs(newTotal) + '-';
    }

    //show the result
    $('#result').val(newTotal);
    equation = [];
    temp = '';

    //otherwise push the number onto the array
  } else {
    equation.push(temp);
    equation.push(val);
    temp = '';
  }
});
