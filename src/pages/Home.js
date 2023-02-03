import Brand from "../components/Brand";
import React, {useEffect, useState} from "react";
import {getAuctionByClient} from "../services/EnchereService";

export default function Home(){
    const [data, setData] = useState(null);

    useEffect(()=>{
        const client = JSON.parse(sessionStorage.getItem("client"));
        if (client == null) {
            window.location.href = "/"
        }

        getAuctionByClient(client.id).then(res => {
            setData(res.data)
        })
    }, [])


    console.log(data)
    if (!data){
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
        return (
            <>
                <Brand></Brand>
                <div className="dashboard-section pt-120 pb-120">
                    <img alt="image" src={require("../assets/images/bg/section-bg.png")} className="img-fluid section-bg-top" />
                    <img alt="image" src={require('../assets/images/bg/section-bg.png')} className="img-fluid section-bg-bottom" />
                    <div className="ms-3 my-3">
                        <h2>Liste des enchères</h2>
                    </div>
                    <div className="table-wrapper">
                        <table className="eg-table order-table table mb-0">
                            <thead>
                            <tr>
                                <th>Bidding ID</th>
                                <th>Date</th>
                                <th>Prix depart</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map(auction =>
                                <tr key={auction.id}>
                                    <td data-label="Id">{auction.id}</td>
                                    <td data-label="Date">{auction.dateDebut}</td>
                                    <td data-label="prix depart">Ar {auction.prixMin}</td>
                                    <td data-label="status" className="text-info">{auction.status}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
}