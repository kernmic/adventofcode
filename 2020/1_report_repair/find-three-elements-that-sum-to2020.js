const findThreeElementsThatSumTo2020 = (expenseReport) => {
  for (let a = 0; a < expenseReport.length; a++) {
    const elA = +expenseReport[a];
    for (let b = 0; b < expenseReport.length; b++) {
      const elB = +expenseReport[b];
      for (let c = 0; c < expenseReport.length; c++) {
        const elC = +expenseReport[c];
        if (elA + elB + elC === 2020) {
          return elA * elB * elC;
        }
      }
    }
  }
};

exports.findThreeElementsThatSumTo2020 = findThreeElementsThatSumTo2020;
