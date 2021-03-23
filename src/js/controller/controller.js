export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
  refreshState(transactionType) {
    this.view.resetForm();
    // Updates the model and the view
    this.model.updateAllValues(transactionType);
    this.view.overallBudget = this.model.budget;
    this.view.incomeAmount = this.model.inc;
    this.view.expensesAmount = this.model.exp;
    this.view.rerenderTransactions(
      transactionType,
      this.model[`${transactionType}Items`]
    );
  }
  deleteHandler(e) {
    // Determine whether or not the item to be deleted is an inc or an exp, delete the item from the model and update the view.
    if (e.target.matches('.btn.btn--delete')) {
      const id = parseInt(e.target.parentNode.getAttribute('data-id')); // Get the item ID as a Number.
      const transactionType = e.target.parentNode.parentNode.id.split('-')[0]; // Returns 'inc' or 'exp'
      this.model.deleteItem(transactionType, id);
      this.refreshState(transactionType);
    }
  }
  submitHandler(e) {
    // Get the values from the user form, add the item to the model and update the view.
    e.preventDefault();
    const {
      transactionText,
      transactionType,
      transactionAmount,
    } = this.view.formValues;
    this.model.addItem(
      transactionType,
      transactionText,
      parseInt(transactionAmount)
    );
    this.refreshState(transactionType);
  }
  init() {
    this.view.breakdownElement.addEventListener('click', (e) =>
      this.deleteHandler(e)
    );
    this.view.formElement.addEventListener('submit', (e) =>
      this.submitHandler(e)
    );
  }
}
