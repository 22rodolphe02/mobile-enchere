import Brand from "../components/Brand";
import {useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import {ajouterAuction} from "../services/EnchereService";
import {getAllCategories} from "../services/CategoriesService";

export default function AddAuction(){
    const{handleSubmit, register} = useForm()
    const [press, isPress] = useState(false);
    const [message, setMessage] = useState(null);
    const [client, setClient] = useState(null);
    const [categories, setCategories] = useState(null);

    useEffect(()=>{
        let cl = JSON.parse(sessionStorage.getItem("client"));
        if (!cl){
            window.location.href = "/"
        }
        setClient(cl)

        getAllCategories().then(res =>{
            setCategories(res.data)
        })

    }, [])

    function submit(data){
        isPress(true)
        data.idClient = client.id;
        data.duree = data.duree+":00"
        ajouterAuction(data).then(res => {
            setMessage(res.data.message)
            isPress(false)
        })
    }

    if (!categories){
        return (
            <div className="preloader">
                <div className="loader">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        )
    }else{
        return(
            <>
                <Brand></Brand>
                <div className="row mt-5">
                    <div className="col-md-4">
                        <div className="form-wrapper">
                            <div className="form-title">
                                <h3>Ajouter Enchère</h3>
                            </div>
                            {message ?
                                <div className="alert alert-info" role="alert">
                                    {message}
                                </div> : ""
                            }
                            <form className="w-100" onSubmit={handleSubmit(submit)}>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-inner">
                                            <label>Produit</label>
                                            <input {...register("produit")} type="text" placeholder="Entrer le nom du produit" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-inner">
                                            <label>Prix min</label>
                                            <input {...register("prixMin")} type="number" step="any" placeholder="Entrer le prix du produit" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-inner">
                                            <label>Categories</label>
                                            <select {...register("idCategorie")} className="nice-select">
                                                {categories.map(cat =>
                                                    <option value={cat.id} key={cat.id} className="option">{cat.categorie}</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-inner">
                                            <label>Durre</label>
                                            <input {...register("duree")} type="time" placeholder="Entrer le nom du produit" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-inner">
                                            <label>Description</label>
                                            <textarea {...register("description")} type="text" placeholder="Entrer le nom du produit" />
                                        </div>
                                    </div>
                                </div>
                                <button className={!press ? "account-btn" : "disable-btn"} disabled={press}>
                                    {press ? <div className="spinner-border spinner-border-sm me-2" role="status" style={{"color": "#494949"}}> </div> : "" }
                                    enregistrer
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}