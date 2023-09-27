import { useEffect, useState } from "react";
import Navbar from "../../Common/Navbar";
import carep from "../../assets/images/carep.png";
import CareProviderCards from "./CareProviderCards";
import axios from "axios";
import { baseURL } from "../../../config";

export default function AllCareProviders(){
    const [allCareProviders,setAllCareProviders]=useState([]);
    useEffect(()=>{
    axios.get(`${baseURL}/careprovider/allcareproviders`).then(result=>{
        console.log(result);
        setAllCareProviders(result.data);
    }).catch(err=>console.log(err))
    },[])
    // const allCareProviders=[
    //     {
    //         profile:carep,
    //         degree:"Specialis",
    //         name:"Dr. Jane Doe",
    //         price:"Rp.xxx.xxx",
    //         main:"FREE",
    //         desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",

    //     },
    //     {
    //         profile:carep,
    //         degree:"Specialis",
    //         name:"Dr. Jane Doe",
    //         price:"Rp.xxx.xxx",
    //         main:"FREE",
    //         desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",

    //     },
    //     {
    //         profile:carep,
    //         degree:"Specialis",
    //         name:"Dr. Jane Doe",
    //         price:"Rp.xxx.xxx",
    //         main:"FREE",
    //         desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",

    //     },
    //     {
    //         profile:carep,
    //         degree:"Specialis",
    //         name:"Dr. Jane Doe",
    //         price:"Rp.xxx.xxx",
    //         main:"FREE",
    //         desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",

    //     },
    //     {
    //         profile:carep,
    //         degree:"Specialis",
    //         name:"Dr. Jane Doe",
    //         price:"Rp.xxx.xxx",
    //         main:"FREE",
    //         desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",

    //     },
    //     {
    //         profile:carep,
    //         degree:"Specialis",
    //         name:"Dr. Jane Doe",
    //         price:"Rp.xxx.xxx",
    //         main:"FREE",
    //         desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",

    //     },
    //     {
    //         profile:carep,
    //         degree:"Specialis",
    //         name:"Dr. Jane Doe",
    //         price:"Rp.xxx.xxx",
    //         main:"FREE",
    //         desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",

    //     },
    // ]
    return (
        <div >
            <Navbar/>
           {allCareProviders.length>0&& <div style={{width:"75%",margin:"20px auto"}}>
                <h3 style={{fontSize:"35px",marginTop:"30px",textAlign:"start",marginBottom:"5px"}}>Our Care Providers</h3>
            <CareProviderCards allCareProviders={allCareProviders}/>
            </div>}
        </div>
    )
}