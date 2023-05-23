let firstName = prompt("Hey there! Enter your Name") 

let lastName = prompt("Now enter your last name")

function greet(firstName, lastName) {
                    console.log(`Hey there, ${firstName} ${lastName[0]}!`)
          }

greet(firstName, lastName);

let maxNum= parseInt(prompt("Do you want to play guess the number? Enter the highest number or press q to quit"));

const targetNum = Math.floor(Math.random() * maxNum) + 1;

let guess = parseInt(prompt("Lets play! Enter your first guess"));

while (guess !== targetNum) {
 if (guess === "q") break;
 guess = parseInt(guess);
 if (guess < targetNum){
          guess = prompt("Too low, try again!");
 } else if (guess > targetNum){
          guess = prompt("Too high, try again!");
 }    
} 
 if (guess === "q") {
    console.log("OK, Goodbye!");      
 } else if (guess === targetNum) {
    console.log(`You Win!! The number was ${targetNum}`);  
 }