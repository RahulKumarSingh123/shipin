import { Outlet } from "react-router-dom";

export default function AuthLayout(){
    return(
        <div className="h-screen w-screen flex">
            <div className="md:flex flex-col hidden justify-center h-full md:w-1/2 text-center bg-black text-white">
                Welcome to Shipin
            </div>
            <div className="flex flex-col justify-center h-full md:w-1/2  px-10 md:px-20 text-center">
                <Outlet/>
            </div>
        </div>
    )
}