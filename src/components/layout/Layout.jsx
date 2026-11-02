import Navbar from "./Navbar"; 
import { Outlet } from "react-router-dom";

export default function Layout(){
    return(
        <>
        <Navbar></Navbar>
        <div className="bg-background">
                <Outlet/>

        </div>
        </>
    )
}