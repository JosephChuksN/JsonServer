
 
const fullName = document.querySelector("#name")
const email = document.querySelector("#mail")
const account = document.querySelector("#acct")
const password = document.querySelector("#pass")
const confirmPass = document.querySelector("#pass2")
const myForm = document.querySelector(".form")


const isValidMail = (email) => {
    return   String(email).toLowerCase().match( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  
}
const isPassValid = (pass) =>{
    return String(pass).match(("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"))
}

let isInputValid = false;
 let inputss

 let users =[]
 let usersJson 
 let usersJsonObj
 const invalid = (inputt) =>{
     inputt.nextElementSibling.innerHTML = `<p style="color: red;">This field is required</P`
     inputt.style.borderColor = "red"
 } 
 const valid = (inputt) => {
     inputt.nextElementSibling.innerHTML = ""
     inputt.style.borderColor = ""
 }

const signUpHandler = () =>{
  
  
    isInputValid = true;
    valid(fullName)
    valid(email)
    valid(account)
    valid(password)
    valid(confirmPass)

    if(!fullName.value || fullName.value.length < 6){
        invalid(fullName)
        isInputValid = false
    }
    if(!isValidMail(email.value)){
        invalid(email)
        isInputValid = false
    }
    if(account.value.length < 10){
        invalid(account)
        isInputValid = false
    }
   
    
    if(!isPassValid(password.value)){
        invalid(password)
        isInputValid = false
    }
  
    if(confirmPass.value !== password.value){
        invalid(confirmPass)
        isInputValid = false
}
}

const passValues = () =>{
    formValues = new FormData(myForm)
    formInputs = Object.fromEntries(formValues.entries());
    console.log(JSON.stringify(formInputs))
     

    fetch('http://localhost:3000/Users', {
  method:'POST',
  headers:{
      "Content-Type":"application/json"
  },    
  body: JSON.stringify(formInputs)   
   
     })
     .then(res => {return res.json()})

}

const loader = () =>{
    document.querySelector(".d-flex").style.display = "block"
    document.querySelector("container").style.display = "none"
}


//  const inputEntries = () => {
//     return Array.from(document.querySelectorAll(".form"));
// }
// const arr = () => {
 

//      inputss = inputEntries().map(formInputs =>{
// return{
//     fullname: formInputs.querySelector("#name").value,
//     email: formInputs.querySelector("#mail").value,
//     account: formInputs.querySelector("#acct").value,
//     password: formInputs.querySelector("#pass").value,
//     verifiedPassword: formInputs.querySelector("#pass2").value,

// };

//      })

//      usersJson = JSON.stringify(inputss)
//      usersJsonObj = JSON.parse(usersJson)
//      myForm.reset();
    
// }

const mainLoad = () =>{
  return  setTimeout(loader(), 3000);
}

myForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    signUpHandler();
    
if(isInputValid){
    passValues()
    mainLoad()
    
}


  
   
   
})

