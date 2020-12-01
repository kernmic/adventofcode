const findElementsThatSumTo2020 = (expenseReport) =>
  expenseReport
    .map((expense, idx) => {
      const sumsTo2020 = expenseReport.find(
        (innerExpense, innerIdx) =>
          innerIdx !== idx && +innerExpense + +expense === 2020
      );
      return sumsTo2020 !== undefined ? [expense, sumsTo2020] : undefined;
    })
    .find((el) => el !== undefined)
    .reduce((acc, val) => +acc * +val, 1);

exports.findElementsThatSumTo2020 = findElementsThatSumTo2020;
