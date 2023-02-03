import Brand from "../../components/Brand";
import {useForm} from "react-hook-form";
import {getMouvementSolde, rechargeCompte} from "../../services/SoldeController";
import React, {useEffect, useState} from "react";

export default function Rechargement(){

    const{handleSubmit, register} = useForm()
    const[message, setMessage] = useState(null);
    const[mouvement, setMouvement] = useState(null)
    const[client, setClient] = useState(null);
    const[press, isPress] = useState(false)

    useEffect(()=>{
        const cl = JSON.parse(sessionStorage.getItem("client"));
        if (!cl){
            window.location.href = "/";
        }
        setClient(cl)
        getMouvementSolde().then(res=>{
            console.log(res.data)
            setMouvement(res.data.mouvements)
        })
    }, [])

    function submit(data){
        isPress(true);
        data.client = client;
        data.mouvementSolde = mouvement.find(mvm => 1 == mvm.id)
        rechargeCompte(data).then(res => {
            setMessage(res.data.message)
            isPress(false)
        })
    }

    function select(e){
        e.target.classList.toggle("open")
    }

    if (!mouvement){
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
                                <h3>Recharger compte</h3>
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
                                            <label>Montant</label>
                                            <input {...register("montant")} type="number" step="any" placeholder="Entrer " />
                                        </div>
                                    </div>
                                    {/*<div className="col-12">
                                        <div className="form-inner">
                                            <label>Mouvement</label>
                                            <select {...register("mouvementSolde")} className="nice-select">
                                                {mouvement.map(mvm =>
                                                    <option value={mvm.id} key={mvm.id} className="option">{mvm.nom}</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>*/}
                                </div>
                                <button className={!press ? "account-btn" : "disable-btn"} disabled={press}>
                                    {press ? <div className="spinner-border spinner-border-sm me-2" role="status" style={{"color": "#494949"}}>

                                    </div> : "" }
                                    valider
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}