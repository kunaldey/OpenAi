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
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexString = randomNumber.toString(16); 

  return `id-${timestamp}-${hexString}`;
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

  const qery = 'Write a test case with the test case name, preconditions, steps, and expected result to ' + data.get('prompt')+' With the fields '+data.get('prompt2')+' Expected Result: '+data.get('prompt3');

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
