//convert card number strings into arrays to work with
const convertStringToArr = cardNumber => {
  return cardNumber.split("");
}

// All valid credit card numbers
const valid1 = convertStringToArr('4539689887705798') ;
const valid2 = convertStringToArr('5535766768751439');
const valid3 = convertStringToArr('371612019985236');
const valid4 = convertStringToArr('6011144340682905');
const valid5 = convertStringToArr('4539404967869666');

// All invalid credit card numbers
const invalid1 = convertStringToArr('4532778771091795');
const invalid2 = convertStringToArr('5795593392134643');
const invalid3 = convertStringToArr('375796084459914');
const invalid4 = convertStringToArr('6011127961777935');
const invalid5 = convertStringToArr('5382019772883854');

// Can be either valid or invalid
const mystery1 = convertStringToArr('344801968305414');
const mystery2 = convertStringToArr('5466100861620239');
const mystery3 = convertStringToArr('6011377020962656203');
const mystery4 = convertStringToArr('4929877169217093');
const mystery5 = convertStringToArr('4913540463072523');

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];

//return true if digits are valid, false if digits are not valid
const validateCard = arr => {
  //luhn algorithm
  let sum = 0;
  let doubleNum = 1;
  sum += arr[arr.length-1];
  //iterate the array from right to left
  for(let i = arr.length - 2; i >= 0; i--) {
    let num = 0;
    if(doubleNum === 1) {
      //double the number
      num = arr[i] * 2;
      if(num > 9) {
        num = num - 9;
      }
      doubleNum = 0;
    } else {
      num = arr[i];
      doubleNum = 1;
    }
    sum += num;
  }

  if(sum % 10 === 0) {
    return true;
  } else {
    return false;
  }
}


//check which cards are valid, return array of invalid cards
const findValidCards = arr => {
  let invalidCards = [];
  for(let i = 0; i < arr.length; i++) {
    if(!validateCard(arr[i])) invalidCards.push(arr[i]);
  }
  return invalidCards;
}


const idInvalidCardCompanies = arr => {
  let badCompanies = [];
  let companyFlags = [0,0,0,0];
  let compNames = ['Amex (American Express)', 'Visa', 'Mastercard', 'Discover'];

  for(let i = 0; i < arr.length; i++) {
    let companyPos = arr[i][0] - 3;
    if(companyFlags[companyPos] == 0) {
      companyFlags[companyPos] = 1;
    }
  }

  for(let i = 0; i < companyFlags.length; i++) {
    if(companyFlags[i] == 1) {
      badCompanies.push(compNames[i]);
    }
  }
  return badCompanies;
}

console.log('Companies that produced invalid cards: ');
console.log(idInvalidCardCompanies(batch));

