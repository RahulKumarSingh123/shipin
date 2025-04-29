import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logout } from "@/store/auth-slice";
export default function Header({setOpen}){
    const dispatch=useDispatch();
    return(
        <nav className="flex items-center justify-between w-full">
            <div className="w-1/5 p-3 md:hidden">
                <Button onClick={()=>{setOpen(open=>!open)}}>
                <AlignJustify height={40} width={40} strokeWidth={2.4}/>
                </Button>
            </div>
            <div className="px-auto w-3/5 md:4/5 md:p-3 md:ml-7">
                <h1 className=" text-3xl font-medium font">shipin</h1>
            </div>
            <div className="w-1/5 p-3 px-auto">
            <Button onClick={()=>{dispatch(logout())}}>
                <LogOut/>
                <span className="hidden md:block">Logout</span>
            </Button>
                
            </div>
        </nav>
    )
}