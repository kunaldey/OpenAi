// *****************
// Author: Kunal Dey
// *****************

import bot from './assets/bot.svg';
import user from './assets/user.svg';

// const modules = import.meta.globEager('./components/*.js');
const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

function loader(element){
  element.textContent = '';

  loadInterval = setInterval(() => {
    element.textContent += '.';

      if (element.textContent === '....'){
        element.textContent = '';
      }
  }, 300)
}

function typeText(element, text){
  let index = 0;
  let interval = setInterval(() => {
    if(index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20)
}

function generateUniqueId(){
  // const timestamp = Date.now();
  const randomNumber = Math.floor(Math.random() * 10000000000000000000);
  const hexString = randomNumber.toString(16); 

  // return `id-${timestamp}-${hexString}`;
  return `id-${randomNumber}`;
}


function copyText(btnID) {
  let htmlELement = document.querySelector('#'+btnID);
  if (!htmlELement){
    return;
  }

  let elementText = htmlELement.innerText;

  let inputElement = document.createElement('input');
  inputElement.setAttribute('value', elementText);
  document.body.appendChild(inputElement);
  inputElement.select();
  document.execCommand('copy');
  inputElement.parentNode.removeChild(inputElement);
}


function chatStripe (isAi, value, uniqueId){
  return(
    `
    <div class="wrapper ${isAi && 'ai'}">
      <div class ="chat">
        <div class="profile">
          <img
            src="${isAi ? bot : user}"
            alt="${isAi ? 'bot' : 'user'}"
          />
        </div>
        <div class="message" id=${uniqueId}>${value}</div>
        
      </div>
    </div>
    `
  )
}

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  let qery = "";
  if(data.get('prompt2') !== "" && data.get('prompt3') !== ""){
    qery = 'Write a test case with the test case name, preconditions, steps, and expected result to ' + data.get('prompt')+' With the fields '+data.get('prompt2')+' Expected Result: '+data.get('prompt3');
  }

  if(data.get('prompt2') == "" && data.get('prompt3') == ""){
    qery = 'Write a test case with the test case name, preconditions, steps, and expected result to ' + data.get('prompt');
  }

  if(data.get('prompt2') !== "" && data.get('prompt3') == ""){
    qery = 'Write a test case with the test case name, preconditions, steps, and expected result to ' + data.get('prompt')+' With the fields '+data.get('prompt2');
  }

  if(data.get('prompt2') == "" && data.get('prompt3') !== ""){
    qery = 'Write a test case with the test case name, preconditions, steps, and expected result to ' + data.get('prompt')+' Expected Result: '+data.get('prompt3');
  }
  //User's chat stripe
  chatContainer.innerHTML += chatStripe(false, qery);

  form.reset();

  //Bot's chat stripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, "", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);

  //Fetch data from server
  const response = await fetch('http://10.82.82.17:5000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      // prompt: data.get('prompt')
      prompt: qery
    })
  })

  clearInterval(loadInterval);
  messageDiv.innerHTML = '';

  if(response.ok){
    const data =  await response.json();
    const parsedData =  data.bot.trim();

    //console.log({parsedData});
    typeText(messageDiv, parsedData);
  }else{
    const err = await response.text();
    messageDiv.innerHTML = "Something went wrong";
    alert(err);
  }
}

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) =>{
  if (e.keyCode === 13){
    handleSubmit(e);
  }
})

const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
  this.style.height = 0;
  this.style.height = (this.scrollHeight) + "px";
}

function Time() {

   // Creating object of the Date class
   var date = new Date();
  
   // Get current hour
   var hour = date.getHours();
   // Get current minute
   var minute = date.getMinutes();
   // Get current second
   var second = date.getSeconds();
  
   // Variable to store AM / PM
   var period = "";
  
   // Assigning AM / PM according to the current hour
   if (hour >= 12) {
   period = "PM";
   } else {
   period = "AM";
   }
  
   // Converting the hour in 12-hour format
   if (hour == 0) {
   hour = 12;
   } else {
   if (hour > 12) {
   hour = hour - 12;
   }
   }
  
   // Updating hour, minute, and second
   // if they are less than 10
   hour = update(hour);
   minute = update(minute);
   second = update(second);
  
   // Adding time elements to the div
   document.getElementById("digital-clock").innerText = hour + " : " + minute + " : " + second + " " + period;
  
   // Set Timer to 1 sec (1000 ms)
   setTimeout(Time, 1000);
  }
  
   // Function to update time elements if they are less than 10
   // Append 0 before time elements if they are less than 10
  function update(t) {
   if (t < 10) {
   return "0" + t;
   }
   else {
   return t;
   }
  }
  
  Time();

  