'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5= {
  owner: 'Sama Samir',
  movements: [420, 1080, 500, 400, -900],
  interestRate: 1.1,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements,sort=false) {
  // to empty container
  containerMovements.innerHTML = '';


  // to sort movements
  const movs = sort ? movements.slice().sort((a, b) => a - b):movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>

      <div class="movements__value">${mov}€</div>
    </div> `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  // acc.balance = balance;
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');

  });
};
createUsernames(accounts);

const updateUI =function(acc) {

  // Display Movements
  displayMovements(acc.movements);

  // Display Balance
  calcDisplayBalance(acc);

  // Display Summary
  calcDisplaySummary(acc);

}

// Event handler

let CurrentAccount;
btnLogin.addEventListener('click', function (e) {
  // to prevent form Submitting, when click btn arrow
  e.preventDefault();

  CurrentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(CurrentAccount);

  // currentAccount && currentAccount.pin == ?.
  if (CurrentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI & Massege
    labelWelcome.textContent = `Welcome back, ${
      CurrentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear Input
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(CurrentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);

  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value=inputTransferTo.value=''; 

  if (
    amount > 0 &&
    receiverAcc &&
    CurrentAccount.balance >= amount &&
    receiverAcc?.username !== CurrentAccount.username
  ){
    CurrentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(CurrentAccount);
}
});

btnLoan.addEventListener('click',function(e){
  e.preventDefault();
  const amount =Number(inputLoanAmount.value);

  if(amount >0 && CurrentAccount.movements.some(mov => mov >= amount*0.1)){
    CurrentAccount.movements.push(amount);
    // Update UI
    updateUI(CurrentAccount);
  }
  // clear
  inputLoanAmount.value = '';

});


btnClose.addEventListener('click',function(e){
  e.preventDefault();

  
  if(inputCloseUsername.value === CurrentAccount.username && Number(inputClosePin.value) === CurrentAccount.pin){
    const index = accounts.findIndex(acc => acc.username === inputCloseUsername.value);
    
    // Delete Account
    accounts.splice(index, 1);
    
    document.querySelector('.welcome').innerHTML="Log in to get started";

    // Hide UI
    containerApp.style.opacity = 0;
    
  }
  inputCloseUsername.value = inputClosePin.value ='';
});

let sorted= false;
btnSort.addEventListener('click',  function(e){
  e.preventDefault();
  displayMovements(CurrentAccount.movements , !sorted);
  sorted= !sorted ;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

let arr1 = ['a', 'b', 'c', 'd', 'e'];
console.log(arr1.reverse());
console.log(arr1);

console.log(arr1.reverse());
console.log(arr1);

const checkDogs = function (dogJulia, dogKate) {
  const dogJuliaCorrected = dogJulia.slice(1, -2);
  const dogs = dogJuliaCorrected.concat(dogKate);
  // const dogs = [...copyJulia,...dogKate]
  console.log(dogs);

  dogs.forEach(function (dog, i) {
    if (dog > 3) {
      console.log(`Dog number ${i + 1} is an adult age ${dog}`);
    } else {
      console.log(`Dog number ${i + 1} is an puppy age ${dog}`);
    }
  });
};

const dogJulia = [3, 5, 2, 12, 7];
const dogKate = [4, 1, 15, 8, 3];
// checkDogs(dogJulia, dogKate);

const eurToUsd = 1.1;
const movements1 = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const movementsUsd =movements1.map (function (mov){
//   return mov * eurToUsd;
// })

const movementsUsd = movements1.map(mov => mov * eurToUsd);

console.log(movementsUsd);

const dogAges = [16, 6, 10, 5, 6, 1, 4];

const calcAvgHumanAge = ages =>
  ages.map(age => (age <= 2 ? age * 2 : 16 + age * 4)).filter(age => age >= 18);

calcAvgHumanAge([5, 2, 4, 1, 15, 8]);
calcAvgHumanAge([16, 6, 10, 5, 6, 1, 4]);

const eurToUSD = 1.1;
const totalDeposits = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUSD)
  .reduce((acc, mov) => acc + mov);
console.log(totalDeposits);


// return <0 , A ,B (keep order);
// return >0 , A ,B (Switch order);


console.log( movements);
console.log(movements.sort());
console.log(movements.sort((a, b) => a - b));
console.log(movements.sort((a, b) => b - a));