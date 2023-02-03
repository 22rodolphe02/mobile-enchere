import Brand from "../../components/Brand";
import React, {Component, useState} from "react";
import {useForm} from "react-hook-form";
import {login} from "../../services/AuthService";

export default function Login(){
    const {register, handleSubmit } = useForm();
    const [press, isPressed] = useState(false);
    const [message, setMessage] = useState(null);

    function onSubmit(data){
        isPressed(true);
        login(data).then(r => {
            if (r.status === 200){
                if (r.data.success){
                    sessionStorage.setItem("client", JSON.stringify(r.data.client));
                    window.location.href = "/home";
                }else {
                    setMessage(r.data.message)
                    isPressed(false)
                }
                // window.location.href = "/encheres"
            }
        })
    }
    return (
        <div>
            <div className="login-section pt-120 pb-120">
                <img alt="images" src={require("../../assets/images/bg/section-bg.png")} className="img-fluid section-bg-top" />
                <img alt="images" src={require("../../assets/images/bg/section-bg.png")} className="img-fluid section-bg-bottom" />
                <div className="container">
                    <div className="row d-flex justify-content-center g-4">
                        <div className="col-xl-6 col-lg-8 col-md-10">
                            <div className="form-wrapper wow fadeInUp" data-wow-duration="1.5s"
                                 data-wow-delay=".2s">
                                <div className="form-title">
                                    <h3>Log In</h3>
                                    <p>Nouveau Membre? <a href="/register">Créer un compte</a></p>
                                </div>
                                {message ? <div className="alert alert-warning text-center" role="alert">
                                    {message}
                                </div> : ""}

                                <form className="w-100" onSubmit={handleSubmit(onSubmit)} method="post" >
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-inner">
                                                <label>Enter Your Email *</label>
                                                <input type="email" {...register('email')} value="rodolphe@gmail.com" placeholder="Enter Your Email" />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-inner">
                                                <label>Password *</label>
                                                <input type="password" {...register('mpd')} id="password" value="rodolphe" placeholder="Password" />
                                                <i className="bi bi-eye-slash" id="togglePassword"></i>
                                            </div>
                                        </div>
                                    </div>
                                    {/*<button className={!press ? "account-btn" : "disable-btn"} disabled={press}>Log in</button>*/}
                                    <button className={!press ? "account-btn" : "disable-btn"} disabled={press}>
                                        {press ? <div className="spinner-border spinner-border-sm me-2" role="status" style={{"color": "#494949"}}>

                                        </div> : "" }
                                        Log in
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}