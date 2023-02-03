import {api} from "../utils/api";

export async function getAuctionByClient(idClient){
    return await api.get(`api/projetEnchere/enchere/mesEnchere/${idClient}`)
}

export async function ajouterAuction(data){
    return await api.post(`api/projetEnchere/enchere/save`, data);
}