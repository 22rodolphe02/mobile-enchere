import {api} from "../utils/api";

export function checkLogin(){
    let client = JSON.parse(localStorage.getItem("client"))
    return !!client;
}

export async function login(data){
    return await api.post("api/projetEnchere/client/login", data)
}

export async function signUp(data){
    return await api.post("api/projetEnchere/client/save", data)
}