let budget=document.getElementById('budget');
let Calculate=document.getElementById('frm1');
let total_budget=document.getElementById('total_budget');
let total_expenses=document.getElementById('total_expenses');
let total_balance=document.getElementById('total_balance');
let expense_name=document.getElementById('expense_name');
let expense_value=document.getElementById('expense_value');
let add_expense=document.getElementById('frm2');
let currentItem, edit=document.getElementById('edit');


let expenses;
if(localStorage.expenses != null)
  expenses = JSON.parse(localStorage.getItem('expenses'));
else
  expenses =[];


total_balance.style.fontWeight = 'bold';
if(localStorage.budget != null)
  total_balance.style.color = '#76af70';
else
  total_balance.style.color = '#a09fa1';

function get_Balance(){
  total_balance.innerHTML = '$ ' + (+total_budget.innerHTML - +total_expenses.innerHTML).toString();
}


Calculate.onclick=()=>{
  if(budget.value !=='')
    localStorage.setItem('budget',budget.value);
}
total_budget.innerHTML = localStorage.getItem('budget') ?? 0;


add_expense.onclick=()=>{
  if(expense_name.value===''||expense_value.value==='')
  {
    window.alert('Enter Valid Expense');
  }
  else if(add_expense.innerHTML === "Update")
  {
    expenses[currentItem]={
      title:expense_name.value,
      value:expense_value.value,
    }
    localStorage.setItem('expenses',JSON.stringify(expenses));
  }
  else{
    expenses[expenses.length]={
      title:expense_name.value,
      value:expense_value.value,
    }
    localStorage.setItem('expenses',JSON.stringify(expenses));
  }
  add_expense.innerHTML = "Add Expense";
}

function getData(){
  let table = '',sum = 0;
  for(let i=0;i<expenses.length;i++){
    sum+= +expenses[i].value;
    table +=
      `
        <tr>
          <td class='title'>${expenses[i].title}</td>
          <td>${expenses[i].value}</td>
          <td onclick="update(${i})" class='control' id='edit'><i class="fa-solid fa-edit" style='color:#0a628f;'></i></td>
          <td onclick="Delete(${i})" class='control' id='delete'><i class="fa-solid fa-trash" style='color: #a12e2a;'></i></td>
        </tr>
      `
  }
  document.getElementById('tbody').innerHTML = table;
  total_expenses.innerHTML = sum.toString();
  if(+total_budget.innerHTML !== 0)
    get_Balance();
}

let Delete = (id)=>{
  expenses.splice(id,1);
  localStorage.expenses = JSON.stringify(expenses);
  getData();
}

let update = (id)=>{
  expense_name.value = expenses[id].title;
  expense_value.value = expenses[id].value ;
  add_expense.innerHTML = "Update";
  currentItem=id;
  getData();
}
getData();