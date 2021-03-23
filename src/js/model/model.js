export default class Model {
  constructor() {
    this.inc = 0;
    this.exp = 0;
    this.budget = 0;
    this._incItems = [];
    this._expItems = [];
  }

  generateIdFromArray(arr) {
    // Returns a new id based on the last item's id.
    return arr.length !== 0 ? arr[arr.length - 1].id + 1 : 1;
  }

  updateTransactionAmounts(transactionType) {
    // Updates the income or expense amount by summing the 'amount' values from each item.
    this[transactionType] = this[`${transactionType}Items`].reduce(
      (acc, val) => {
        return acc + val.amount;
      },
      0
    );
  }
  updateBudget() {
    // Updates the overall budget amount
    if (this.inc !== 0) {
      this.budget = this.inc - this.exp;
    } else {
      this.budget = 0;
    }
  }
  updateAllValues(type) {
    // Updates the Income or the Expense and the budget.
    this.updateTransactionAmounts(type);
    this.updateBudget();
  }

  /// ADDING AND DELETING //

  deleteItem(type, id) {
    this[`${type}Items`] = this[`${type}Items`].filter(
      (item) => item.id !== id
    );
  }

  addItem(type, text, amount) {
    // I created a new variable newItemsArray to avoid more confusing 'this[items]' statements.
    const newItemsArray = this[`${type}Items`]; // Returns a copy of the items array from the model, NOT the reference.
    newItemsArray.push({
      id: this.generateIdFromArray(newItemsArray),
      text,
      amount,
    });
    this[`${type}Items`] = newItemsArray; // Re-assign the items with the newly created array.
  }

  // GETTING AND SETTING //

  // To make the data manipulation safer, the model returns a copy of the array items rather than the reference.
  get incItems() {
    return [...this._incItems];
  }
  get expItems() {
    return [...this._expItems];
  }
  // When a new array of items is being set on the incomes or expenses, the application always updates the income amounts and the overall budget.

  // While this could be refactored into one setter that determines whether or not the Income Items or the Expense Items need to be updated, I felt this was more readable.
  set incItems(val) {
    this._incItems = val;
    this.updateAllValues('inc');
  }
  set expItems(val) {
    this._expItems = val;
    this.updateAllValues('exp');
  }
}
