'use strict';

function parseInt(fieldName, query, parameters) {
  let queryString = "";

  if (fieldName in query) {
    const field = query[fieldName];

    //and
    if ('&' in field) {
      let andClauses = field['&'];
      for (let i = 0; i < andClauses.length; i++) {
        let expression = andClauses[i];
        let op = expression.op;
        let val = expression.val;
        parameters.push(val);
        queryString += "     AND (data ->> '" + fieldName + "')::int " + op + " $" + (parameters.length) + " ";
      }
    }

    //or
    if ('|' in field) {
      let orClauses = field['|'];
      queryString += "     AND ( ";
      for (let i = 0; i < orClauses.length; i++) {
        let expression = orClauses[i];
        let op = expression.op;
        let val = expression.val;
        parameters.push(val);
        queryString += "     " + (i === 0 ? "" : "OR") + " (data ->> '" + fieldName + "')::int " + op + " $" + (parameters.length) + " ";
      }
      queryString += "     ) ";
    }

    //not
    if ('!' in field) {
      let notClauses = field['!'];
      for (let i = 0; i < notClauses.length; i++) {
        let expression = notClauses[i];
        let op = expression.op;
        let val = expression.val;
        parameters.push(val);
        queryString += "     AND NOT (data ->> '" + fieldName + "')::int " + op + " $" + (parameters.length) + " ";
      }
    }
  }

  return queryString;
}

// /**
//  *
//  * @param {string} fieldName
//  * @param {query} query
//  * @param parameters
//  * @returns {string}
//  */
// function parseFloat(fieldName, query, parameters) {
//   let queryString = "";
//
//   if (fieldName in query) {
//     const field = query[fieldName];
//
//     //and
//     if ('&' in field) {
//       let andClauses = field['&'];
//       for (let i = 0; i < andClauses.length; i++) {
//         let expression = andClauses[i];
//         let op = expression.op;
//         let val = expression.val;
//         parameters.push(val);
//         queryString += "     AND numericify(data ->> '" + fieldName + "') " + op + " $" + (parameters.length) + " ";
//       }
//     }
//
//     //or
//     if ('|' in field) {
//       let orClauses = field['|'];
//       queryString += "     AND ( ";
//       for (let i = 0; i < orClauses.length; i++) {
//         let expression = orClauses[i];
//         let op = expression.op;
//         let val = expression.val;
//         parameters.push(val);
//         queryString += "     " + (i === 0 ? "" : "OR") + " numericify(data ->> '" + fieldName + "') " + op + " $" + (parameters.length) + " ";
//       }
//       queryString += "     ) ";
//     }
//
//     //not
//     if ('!' in field) {
//       let notClauses = field['!'];
//       for (let i = 0; i < notClauses.length; i++) {
//         let expression = notClauses[i];
//         let op = expression.op;
//         let val = expression.val;
//         parameters.push(val);
//         queryString += "     AND NOT numericify(data ->> '" + fieldName + "') " + op + " $" + (parameters.length) + " ";
//       }
//     }
//   }
//
//   return queryString;
// }

function parseString(fieldName, query, parameters) {
  let queryString = "";

  if (fieldName in query) {
    const field = query[fieldName];

    //and
    if ('&' in field) {
      let andClauses = field['&'];
      for (let i = 0; i < andClauses.length; i++) {
        let val = andClauses[i].val;

        //TODO split this string on spaces

        parameters.push("%" + val + "%");
        queryString += "     AND (data ->> '" + fieldName + "') ilike $" + (parameters.length) + " ";
      }
    }

    //or
    if ('|' in field) {
      let orClauses = field['|'];
      queryString += "     AND ( ";
      for (let i = 0; i < orClauses.length; i++) {
        let val = orClauses[i].val;

        //TODO split this string on spaces

        parameters.push("%" + val + "%");
        queryString += "     " + (i === 0 ? "" : "OR") + " (data ->> '" + fieldName + "') ilike $" + (parameters.length) + " ";
      }
      queryString += "     ) ";
    }

    //not
    if ('!' in field) {
      let notClauses = field['!'];
      for (let i = 0; i < notClauses.length; i++) {
        let val = notClauses[i].val;

        //TODO split this string on spaces

        parameters.push("%" + val + "%");
        queryString += "     AND NOT (data ->> '" + fieldName + "') ilike $" + (parameters.length) + " ";
      }
    }
  }

  return queryString;
}

function parseType(fieldName, query, parameters) {
  let queryString = "";

  if (fieldName in query) {
    const field = query[fieldName];

    //and
    if ('&' in field) {
      let andClauses = field['&'];
      for (let i = 0; i < andClauses.length; i++) {
        parameters.push(andClauses[i].val);
        queryString += "     AND (data -> '" + fieldName + "') ? $" + (parameters.length) + " ";
      }
    }

    //or
    if ('|' in field) {
      let orClauses = field['|'];
      queryString += "     AND ( ";
      for (let i = 0; i < orClauses.length; i++) {
        parameters.push(orClauses[i].val);
        queryString += "     " + (i === 0 ? "" : "OR") + " (data -> '" + fieldName + "') ? $" + (parameters.length) + " ";
      }
      queryString += "     ) ";
    }

    //not
    if ('!' in field) {
      let notClauses = field['!'];
      for (let i = 0; i < notClauses.length; i++) {
        parameters.push(notClauses[i].val);
        queryString += "     AND NOT (data -> '" + fieldName + "') ? $" + (parameters.length) + " ";
      }
    }
  }

  return queryString;
}

// /**
//  *
//  * @param {string} fieldName
//  * @param {query} query
//  * @param parameters
//  * @returns {string}
//  */
// function parseBool(fieldName, query, parameters) {
//   let queryString = "";
//
//   if (fieldName in query) {
//     const field = query[fieldName];
//
//     //and
//     if ('&' in field) {
//       let andClauses = field['&'];
//       for (let i = 0; i < andClauses.length; i++) {
//         parameters.push(andClauses[i].val);
//         queryString += "     AND (data -> '" + fieldName + "') ";
//       }
//     }
//
//     //not
//     if ('!' in field) {
//       let notClauses = field['!'];
//       for (let i = 0; i < notClauses.length; i++) {
//         parameters.push(notClauses[i].val);
//         queryString += "     AND NOT (data -> '" + fieldName + "') ";
//       }
//     }
//   }
//
//   return queryString;
// }

const queryGenerator = {
  /**
   *
   * @param query
   * @returns {{queryString: string, parameters: Array}}
   */
  upgrade: function (query) {
    const parameters = [];
    let queryString = "SELECT data "
      + " FROM upgrade "
      + " WHERE 1=1 ";

    queryString += parseString('name', query, parameters);
    queryString += parseType('type', query, parameters);
    queryString += parseInt('points', query, parameters);
    queryString += parseType('restrictions', query, parameters);
    queryString += parseType('wave', query, parameters);
    queryString += parseString('text', query, parameters);
    queryString += parseInt('dice', query, parameters);
    queryString += parseString('range', query, parameters);
    queryString += parseType('deploy', query, parameters);
    queryString += parseInt('energycapacity', query, parameters);
    queryString += parseInt('perattack', query, parameters);

    //..add order by clauses

    queryString += ";";

    return {queryString: queryString, parameters: parameters};
  },
  /**
   *
   * @param type {{table: string, column: string}}
   * @returns {{queryString: string, parameters: [*,*]}}
   */
  type: function(type) {
    return {queryString: "select distinct data ->> $2 as description from $1~ order by description asc;", parameters: [type.table,type.column]};
  }
};

module.exports = queryGenerator;
