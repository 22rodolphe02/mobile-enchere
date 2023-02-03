import {api} from "../utils/api";

export async function rechargeCompte(data){
    return await api.post("/api/soldes/", data)
}

export async function getMouvementSolde(){
    return await api.get("/api/projetEnchere/mouvement");
}