let money; let time;

const appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
};


const startBtn = document.getElementById("start");
const budgetValue = document.getElementsByClassName("budget-value")[0];
const dayBudgetValue = document.getElementsByClassName("daybudget-value")[0];
const levelValue = document.getElementsByClassName("level-value")[0];
const expensesValue = document.getElementsByClassName("expenses-value")[0];
const optionalExpensesValue = document.getElementsByClassName("optionalexpenses-value")[0];
const incomeValue = document.getElementsByClassName("income-value")[0];
const monthSavingsValue = document.getElementsByClassName("monthsavings-value")[0];
const yearSavingsValue = document.getElementsByClassName("yearsavings-value")[0];
const expensesItem = document.getElementsByClassName("expenses-item");
const expensesBtn = document.getElementsByTagName("button")[0];
const optionalExpensesBtn = document.getElementsByTagName("button")[1];
const countBtn = document.getElementsByTagName("button")[2];
const optionalExpensesItem = document.querySelectorAll(".optionalexpenses-item");
const incomeItem = document.querySelector(".choose-income");
const checkSavings = document.querySelector("#savings");
const sumValue = document.querySelector(".choose-sum");
const percentValue = document.querySelector(".choose-percent");
const yearValue = document.querySelector(".year-value");
const monthValue = document.querySelector(".month-value");
const dayValue = document.querySelector(".day-value");

startBtn.addEventListener("click", () => {
    time = prompt("Введите дату в формате YYYY-MM-DD", "2019-04-11");
    money = +prompt("Ваш бюджет на месяц?", "50000");
    while (isNaN(money) || money === "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?", "");
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});
expensesBtn.addEventListener("click", () => {
  let sum = 0;
  for (let i = 0; i < expensesItem.length; i++) {
      let a = expensesItem[i].value;
          let b = expensesItem[++i].value;
      if ( typeof(a)==='string'
      && typeof(a) != null
      && typeof(b) != null
      && a != ""
      && b != ""
      && a.length < 50) {
          appData.expenses[a] = b;
          sum += +b;
      } else {
          console.log ("bad result");
          i--;
      }
  }
  expensesValue.textContent = sum;
});
optionalExpensesBtn.addEventListener('click', function() {
    for (var i = 0; i < optionalExpensesItem.length; i++){
      let optExpences = optionalExpensesItem[i].value;
      appData.optionalExpenses[i] = optExpences;
      optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});
countBtn.addEventListener('click', function() {
    appData.moneyPerDay = (appData.budget / 30).toFixed();
    dayBudgetValue.textContent = appData.moneyPerDay;

  if (appData.budget != undefined) {
      if (appData.moneyPerDay < 1000) {
            levelValue.textContent = "Это минимальный уровень достатка!";
        } else if (appData.moneyPerDay > 1000 && appData.moneyPerDay < 2000) {
            levelValue.textContent = "Это средний уровень достатка!";
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "Это высокий уровень достатка!";
        } else {
            levelValue.textContent = "Произошла ошибка";
        }
      } else {
      dayBudgetValue.textContent = "Необходимо нажать кнопку Начать расчет";
    }
});
incomeItem.addEventListener("input", () => {
    const items = incomeItem.value;
    appData.income = items.split(", ");
    incomeValue.textContent = appData.income;
});
checkSavings.addEventListener("click", () => {
    if (appData.savings === true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});
sumValue.addEventListener("input", () => {
    if (appData.savings === true) {
        const summ = +sumValue.value;
        const percent = +percentValue.value;

        appData.monthIncome = summ / 100 / 12 * percent;
        appData.yearIncome = summ / 100 * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});
percentValue.addEventListener("input", () => {
    if (appData.savings === true) {
        const summ = +sumValue.value;
        const percent = +percentValue.value;

        appData.monthIncome = summ / 100 / 2 * percent;
        appData.yearIncome = summ / 100 * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});
