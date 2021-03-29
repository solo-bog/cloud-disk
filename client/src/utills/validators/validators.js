export const required = (value) => {
    if(value){
        return undefined
    }
    else{
        return "Field is require"
    }
}

export const maxLength = (number) => (value) => {
    if(value && value.length>number){
        return `Max length is ${number}`
    }
    else {
        return undefined
    }
}

export const minLength = (number) => (value) => {
    if(value && value.length < number){
        return `Min length is ${number}`
    }
    else {
        return undefined
    }
}

export const isEmail = (value) =>{
    if(value.includes("@")) return undefined
    else{
        return "Uncorrect email"
    }
}

export const confirmPassword = (firstPassword) => (value) => {
    if(firstPassword===value){
        return undefined
    }
    else {
        return "Passwords are different"
    }
}