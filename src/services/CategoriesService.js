import {api} from "../utils/api";

export async function getAllCategories(){
    return await api.get("/api/projetEnchere/categorie")
}