export const nameForId = (sheet, id) => {
  let row = sheet.filter(r => r.id === id)[0];
  if (row) {
    return row.variable_name;
  }
  return null;
};

export const displayTextForId = (sheet, id) => {
  let row = sheet.filter(r => r.id === id)[0];
  if (row) {
    return row.display_text;
  }
  return null;
};

export const evaluateRowConditions = (row, variables, options, userValues) => {
  const { logic_type, variable_1, test, variable_2 } = row;

  if (logic_type === "none" || logic_type === "always_include") {
    return true;
  }
  if (variable_1 === undefined || variable_2 === undefined) {
    return false;
  }

  let returnValue = false;
  const v1Name = nameForId(variables, variable_1[0]);
  const v1Value = userValues[v1Name];
  const v2Values = variable_2.map(v => displayTextForId(options, v));

  if (logic_type === "if" && test === "in_list") {
    v2Values.forEach(v2 => {
      if (v1Value === v2) {
        returnValue = true;
      }
    });
  }

  if (row.logic_type === "if" && test === "equals") {
    if (v2Values.length === 1 && v1Value === v2Values[0]) {
      returnValue = true;
    }
  }

  if (row.logic_type === "if" && test === "does_not_equal") {
    if (v2Values.length === 1 && v1Value !== v2Values[0]) {
      returnValue = true;
    }
  }
  return returnValue;
};

export default evaluateRowConditions;
