import React, {Component, useEffect, useRef, useState} from "react";
import { useForm } from "react-hook-form";

import Footer from "../../components/Footer";
import Brand from "../../components/Brand";
import {login, signUp} from "../../services/AuthService";

export default function Register(){
    const {register, handleSubmit } = useForm();
    const [press, isPressed] = useState(false);
    let errors = useRef(false);
    function onSubmit(data){
        isPressed(true)
        signUp(data).then(res => {
            if (res.status === 200){
                sessionStorage.setItem("client", res.data);
                window.history.push("/");
            }else {
                isPressed( false)
                errors = true
            }
        }).catch(errors =>{
            isPressed(false)
            errors = true;
        })
    }

    return(
        <div>
            {/*<Brand></Brand>*/}
            <div className="signup-section pt-120 pb-120">
                <img alt="image" src={require("../../assets/images/bg/section-bg.png")} className="section-bg-top"/>
                <img alt="image" src={require("../../assets/images/bg/section-bg.png")} className="section-bg-bottom"/>
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-xl-6 col-lg-8 col-md-10">
                            <div className="form-wrapper wow fadeInUp" data-wow-duration="1.5s"
                                 data-wow-delay=".2s">
                                <div className="form-title">
                                    <h3>S'inscrire</h3>
                                    <p>Vous avez deja un compte? <a href="/">Se connecter</a>

                                    </p>
                                </div>
                                <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
                                    {/*<p className="text-center" style={{"color" : "tomato"}}>{errors === true ? "" : ""}</p>*/}
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-inner">
                                                <label>Nom *</label>
                                                <input type="text" {...register('nom')} placeholder="nom"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-inner">
                                                <label>Prenom *</label>
                                                <input type="text" {...register('prenom')}  placeholder="prénom" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-inner">
                                                <label>Email *</label>
                                                <input type="email" {...register('email')}  placeholder="Enter Your Email" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-inner">
                                                <label>Mot de passe *</label>
                                                <input type="password" {...register('mpd')}  id="password" placeholder="Create A Password"/>
                                                <i className="bi bi-eye-slash" id="togglePassword"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <button className={!press ? "account-btn" : "disable-btn"} disabled={press} >créer un compte</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}