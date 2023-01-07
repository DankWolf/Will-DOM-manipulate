//window.location.href = "http://newURL.com";

const root = document.getElementById('root');

function createSection(sectionName) {
  let sectionLabel = '';
  for (let i = 0; i < sectionName.length; i++) {
    sectionLabel += sectionName[i];
  }
  sectionLabel = document.createElement('section');
  sectionLabel.setAttribute('class', 'section');
  root.appendChild(sectionLabel);
  return sectionLabel;
}
const login = createSection('login');
const signup = createSection('signup');
const taskDisplay = createSection('taskDisplay');

function createForm(formType) {
  //start with login
  const authForm = document.createElement('form');
  authForm.setAttribute('class', 'form');

  const inputDiv = document.createElement('div');
  inputDiv.setAttribute('class', 'input-div');

  function createLoginForm() {
    //form needs 3 inputs and a submit button
    const nameDiv = document.createElement('div');
    nameDiv.setAttribute('class', 'input-div');
    nameDiv.setAttribute('id', 'name-input-div');

    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'input-box');
    nameInput.setAttribute('id', 'name-input');
    nameInput.setAttribute('placeholder', 'put your stupid name here');

    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('class', 'input-label');
    nameLabel.innerHTML = 'Name: ';

    nameDiv.appendChild(nameLabel);
    nameDiv.appendChild(nameInput);

    //Create Email components
    const emailDiv = document.createElement('div');
    emailDiv.setAttribute('class', 'input-div');

    const emailInput = document.createElement('input');
    emailInput.setAttribute('type', 'text');
    emailInput.setAttribute('class', 'input-box');
    emailInput.setAttribute('id', 'email-input');
    emailInput.setAttribute('placeholder', 'email here');

    const emailLabel = document.createElement('label');
    emailLabel.setAttribute('class', 'input-label');
    emailLabel.innerHTML = 'Email: ';

    emailDiv.appendChild(emailLabel);
    emailDiv.appendChild(emailInput);

    //Create Password Components
    const passwordDiv = document.createElement('div');
    passwordDiv.setAttribute('class', 'input-div');

    const passwordInput = document.createElement('input');
    passwordInput.setAttribute('type', 'password');
    passwordInput.setAttribute('class', 'input-box');
    passwordInput.setAttribute('id', 'password-input');
    passwordInput.setAttribute('placeholder', 'password goes here');

    const passwordLabel = document.createElement('label');
    passwordLabel.setAttribute('class', 'input-label');
    passwordLabel.innerHTML = 'Password: ';

    passwordDiv.appendChild(passwordLabel);
    passwordDiv.appendChild(passwordInput);
    authForm.appendChild(nameDiv);
    authForm.appendChild(emailDiv);
    authForm.appendChild(passwordDiv);
  }

  function createSignupForm() {
    //form needs 3 inputs and a submit button
    const nameDiv = document.createElement('div');
    nameDiv.setAttribute('class', 'input-div');
    nameDiv.setAttribute('id', 'name-input-div');

    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'input-box');
    nameInput.setAttribute('id', 'signup-name-input');
    nameInput.setAttribute('placeholder', 'put your stupid name here');

    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('class', 'input-label');
    nameLabel.innerHTML = 'Name: ';

    nameDiv.appendChild(nameLabel);
    nameDiv.appendChild(nameInput);

    //Create Email components
    const emailDiv = document.createElement('div');
    emailDiv.setAttribute('class', 'input-div');

    const emailInput = document.createElement('input');
    emailInput.setAttribute('type', 'text');
    emailInput.setAttribute('class', 'input-box');
    emailInput.setAttribute('id', 'signup-email-input');
    emailInput.setAttribute('placeholder', 'email here');

    const emailLabel = document.createElement('label');
    emailLabel.setAttribute('class', 'input-label');
    emailLabel.innerHTML = 'Email: ';

    emailDiv.appendChild(emailLabel);
    emailDiv.appendChild(emailInput);

    //Create Password Components
    const passwordDiv = document.createElement('div');
    passwordDiv.setAttribute('class', 'input-div');

    const passwordInput = document.createElement('input');
    passwordInput.setAttribute('type', 'password');
    passwordInput.setAttribute('class', 'input-box');
    passwordInput.setAttribute('id', 'signup-password-input');
    passwordInput.setAttribute('placeholder', 'password goes here');

    const passwordLabel = document.createElement('label');
    passwordLabel.setAttribute('class', 'input-label');
    passwordLabel.innerHTML = 'Password: ';
    passwordDiv.appendChild(passwordLabel);
    passwordDiv.appendChild(passwordInput);
    authForm.appendChild(nameDiv);
    authForm.appendChild(emailDiv);
    authForm.appendChild(passwordDiv);
  }
  if (formType === 'login') createLoginForm();
  else if (formType === 'signup') createSignupForm();

  return authForm;
}

function createBtn() {
  //Create submit button
  const button = document.createElement('button');
  button.setAttribute('class', 'btn');
  button.setAttribute('type', 'submit');
  button.innerHTML = 'Submit';
  return button;
}

const loginForm = createForm('login');
const loginBtn = createBtn();
loginBtn.setAttribute('id', 'login-btn');
loginForm.appendChild(loginBtn);

const signupForm = createForm('signup');
const signupBtn = createBtn();
signupBtn.setAttribute('id', 'signup-btn');
signupForm.appendChild(signupBtn);

login.appendChild(loginForm);
signup.appendChild(signupForm);

loginBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const inputFields = await getInputData('login');
  console.log('this is retrieved input ', inputFields);
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputFields),
  });

  if (response.status === 200 || response.status === '200') {
    console.log('True! user is logged in now.');
    //change the display to dashboard section
  }
});

signupBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const inputFields = await getInputData('signup');
  console.log('This is inputFields: ', inputFields);
  const response = await fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputFields),
  });
  console.log('User signed in!! Here is the response: ', response);
  if (response.status === 200 || response.status === '200') {
    console.log('True! user is created now.');
    //change the display to dashboard section
  }
});
const getInputData = async (form) => {
  let nameInput;
  let emailVal;
  let passwordVal;
  function defineVals(form) {
    if (form === 'login') {
      nameInput = document.getElementById('name-input');
      emailVal = document.getElementById('email-input').value;
      passwordVal = document.getElementById('password-input').value;
    } else if (form === 'signup') {
      nameInput = document.getElementById('signup-name-input');
      emailVal = document.getElementById('signup-email-input').value;
      passwordVal = document.getElementById('signup-password-input').value;
    }
  }
  const data = await defineVals(form);
  console.log('This is the nameInput:', nameInput);
  let nameVal;
  if (nameInput.style.display !== 'none') {
    nameVal = nameInput.value;
  }
  const reqObj = {};
  if (nameVal) {
    reqObj.name = nameVal;
  }
  reqObj.email = emailVal;
  reqObj.password = passwordVal;
  nameInput.value = '';
  emailVal = '';
  passwordVal = '';
  return reqObj;
};
