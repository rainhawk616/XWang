let query = {};

// function createGuid() {
//     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//         const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
//         return v.toString(16);
//     });
// }

function addClause(field, bool, operator, value) {
  if (value === '') {
    return;
  }

  if (!(field in query)) {
    query[field] = {}
  }

  if (!(bool in query[field])) {
    query[field][bool] = []
  }

  const clause = {val: value};

  if (operator !== null && operator !== undefined) {
    clause.op = operator;
  }
  query[field][bool].push(clause);

  refreshQueryDisplay();
}

function addNumber(event) {
  console.log('event', event);
  console.log('this', this);

  let field = $(this).closest('.field');
  let bool = field.find('.bool');
  let operator = field.find('.operator');
  let value = field.find('.value');

  console.log('field', field);
  console.log('bool', bool);
  console.log('operator', operator);
  console.log('value', value);

  addClause(field.data('field'), bool.val(), operator.val(), value.val());

  value.val('');
}

function addString() {
  console.log('this', this);

  let inputGroup = $(this).closest('.field');
  let bool = inputGroup.find('.bool');
  let operator = inputGroup.find('.operator');
  let value = inputGroup.find('.value');

  console.log('inputGroup', inputGroup);
  console.log('bool', bool);
  console.log('operator', operator);
  console.log('value', value);

  let val = value.val();
  let values = [];
  let quotedText = /["|']([^"']+)["|']/g;
  let match = quotedText.exec(val);

  while (match !== null) {
    values.push(match[1]);
    match = quotedText.exec(val);
  }

  values = values.concat(val.replace(quotedText, '').split(' '));

  for (let i = 0; i < values.length; i++) {
    addClause(inputGroup.data('field'), bool.val(), operator.val(), values[i]);
  }

  value.val('');
}

function addType(event) {
  console.log('event', event);
  console.log('this', this);

  let field = $(this).closest('.field');
  let bool = field.find('.bool');
  let operator = field.find('.operator');
  let value = field.find('.value');

  console.log('field', field);
  console.log('bool', bool);
  console.log('operator', operator);
  console.log('value', value);

  addClause(field.data('field'), bool.val(), operator.val(), value.val());

  value.val('');
}

function refreshQueryDisplay() {
  $('#query').text(JSON.stringify(query, null, 2));
}

function search() {
  window.location.href = 'list?query=' + encodeURIComponent(JSON.stringify(query));
}


// function addFloat(event) {
//   console.log('event', event);
//   console.log('this', this);
//
//   query.cmc = {'&': [], '|': [], '!': []};
//   query.cmc['&'].push({op: '-', val: 1});
// }

$(document).ready(function () {
  $('.addnumber').click(addNumber);
  $('.addstring').click(addString);
  $('.addtype').click(addType);


  $('.value').keyup(function (event) {
    if (event.keyCode === 13) {
      $(this).closest('.field').find('.btn').click();
    }
  });

  $("#form").submit(function () {
    $('.addString').click();
    $('.addInt').click();
    $('.addType').click();
  });

  refreshQueryDisplay();
});