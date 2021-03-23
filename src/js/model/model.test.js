import Model from '../model/model';

test('Adds new income and expense item to data and updates budget', () => {
  const AddTestModel = new Model();

  expect(AddTestModel.inc).toBe(0);
  expect(AddTestModel.exp).toBe(0);
  expect(AddTestModel.budget).toBe(0);
  // TEST ADDING INCOME
  AddTestModel.addItem('inc', 'Monthly salary', 1000);
  expect(AddTestModel._incItems[0].id).toBe(1);
  expect(AddTestModel._incItems[0].text).toBe('Monthly salary');
  expect(AddTestModel._incItems[0].amount).toBe(1000);
  expect(AddTestModel.inc).toBe(1000);
  expect(AddTestModel.exp).toBe(0);
  expect(AddTestModel.budget).toBe(1000);
  // TEST ADDING EXPENSE
  AddTestModel.addItem('exp', 'New car', 500);
  expect(AddTestModel.expItems[0].id).toBe(1);
  expect(AddTestModel.expItems[0].text).toBe('New car');
  expect(AddTestModel.expItems[0].amount).toBe(500);
  // TEST OVERALL BUDGET UPDATE AFTER INC AND EXP ADDED
  expect(AddTestModel.inc).toBe(1000);
  expect(AddTestModel.exp).toBe(500);
  expect(AddTestModel.budget).toBe(500);
});

test('Deletes an income / expense and updates budget values', () => {
  const DelTestModel = new Model();
  DelTestModel.addItem('inc', 'Monthly salary', 1000);
  DelTestModel.addItem('exp', 'New car', 500);
  expect(DelTestModel.inc).toBe(1000);
  expect(DelTestModel.exp).toBe(500);
  expect(DelTestModel.budget).toBe(500);
  expect(DelTestModel.incItems.length).toBe(1);
  expect(DelTestModel.expItems.length).toBe(1);
  // TEST DELETION
  DelTestModel.deleteItem('inc', 1);
  expect(DelTestModel.inc).toBe(0);
  expect(DelTestModel.budget).toBe(0);
  expect(DelTestModel.incItems.length).toBe(0);
});
