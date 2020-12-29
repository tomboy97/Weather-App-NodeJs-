console.log('Client side js loaded!!')

//to listen the form and input
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//to deisplay message on screen
//messageOne.textContent = 'From Javascript'

//to add the event listener to the submitted job
weatherForm.addEventListener('submit', (e) => {
    // to prevent instant refreshing of the form
    e.preventDefault()

    //to get the input value of the form
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    //to fetch the forecast data
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.Error){
                messageOne.textContent = data.Error
            }
            else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                //console.log(data.location)
                //console.log(data.forecast)
            }        
        })
    })
})