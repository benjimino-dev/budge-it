export default class View {
  // TO-DO: Create clearFormValues method

  constructor() {
    // OVERALL BUDGET
    this.budgetElement = document.querySelector('.overall-budget__amount');
    // FORM
    this.formElement = document.querySelector('.form');
    this.transactionTextElement = document.querySelector('#transaction-text');
    this.transactionAmountElement = document.querySelector(
      '#transaction-amount'
    );
    this.transactionTypeElement = document.querySelector('#transaction-type');
    this.submitButton = document.querySelector('#user-form__submit');
    // BREAKDOWN
    this.breakdownElement = document.querySelector('.breakdown');
    // INCOME
    this.incomeAmountElement = document.querySelector('#inc-amount');
    this.incBreakdown = document.querySelector('.breakdown__inc');
    // EXPENSES
    this.expenseAmountElement = document.querySelector('#exp-amount');
    this.expBreakdown = document.querySelector('.breakdown__exp');
  }

  resetForm() {
    this.formElement.reset();
  }
  generateTransactionList(transactionType, transactions) {
    const transactionList = document.createElement('ul');
    transactionList.classList.add('list');
    transactionList.setAttribute('id', `${transactionType}-transaction-list`);
    transactions.forEach((transaction) => {
      const transactionItem = document.createElement('li');
      transactionItem.classList.add(`list__item`);
      transactionItem.setAttribute('data-id', transaction.id);
      const text = document.createElement('span');
      text.textContent = transaction.text;
      const amount = document.createElement('span');
      amount.textContent = transaction.amount;
      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('btn');
      deleteBtn.classList.add('btn--delete');
      deleteBtn.textContent = 'Delete';
      transactionItem.append(text, amount, deleteBtn);
      transactionList.append(transactionItem);
    });
    return transactionList;
  }
  set overallBudget(amount) {
    this.budgetElement.textContent = '';
    this.budgetElement.textContent = amount;
  }
  set incomeAmount(amount) {
    this.incomeAmountElement.textContent = '';
    this.incomeAmountElement.textContent = amount;
  }
  set expensesAmount(amount) {
    this.expenseAmountElement.textContent = '';
    this.expenseAmountElement.textContent = amount;
  }

  rerenderTransactions(transactionType, transactions) {
    const transactionList = document.querySelector(
      `#${transactionType}-transaction-list`
    ); // Selects the list again as it would have been removed from previous rerender.
    transactionList.remove();
    this[`${transactionType}Breakdown`].append(
      this.generateTransactionList(transactionType, transactions)
    ); // Adds the new transaction list to the appropiate 'breakdown' section.
  }

  get formValues() {
    return {
      transactionText: this.transactionText,
      transactionType: this.transactionType,
      transactionAmount: this.transactionAmount,
    };
  }
  get transactionAmount() {
    return this.transactionAmountElement.value;
  }
  get transactionType() {
    return this.transactionTypeElement.value;
  }
  get transactionText() {
    return this.transactionTextElement.value;
  }
}
