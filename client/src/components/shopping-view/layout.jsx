import { Outlet } from "react-router-dom";
import Header from "./header";
export default function ShoppingLayout(){
    return(
        <>
        <Header/>
        <Outlet/>
        </>   
    )
}