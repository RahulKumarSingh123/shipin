import { Link } from "react-router-dom";
import { Menu, Truck } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { menuItems } from "@/configs";
import { ShoppingCart } from "lucide-react";
import { DropdownMenuTrigger ,DropdownMenu} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useSelector } from "react-redux";


function MenuItems(){
    return (
        <div className="flex flex-col md:flex-row gap-5 md:gap-0  mt-9 md:m-0">
            {
                menuItems.map((item)=>(<Link key={item.id} to={item.path} className="font-medium text-md md:text-sm px-5">{item.label}</Link>))
            }
        </div>
    )
}
function HeaderRightContent(){
    const {user}=useSelector(state=>state.auth);
    return (
        <div className="flex lg:items-center lg:flex-row flex-col gap-4">
            <Button variant="outline" size="icon">
                <ShoppingCart className="w-6 h-6"/>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar>
                        <AvatarFallback className="text-white font-semibold text-lg bg-gray-900">
                            {user?.userName?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
            </DropdownMenu>
        </div>
    )
}
export default function Header(){
    return(
        <header className="sticky top-0 bg-background w-full  z-40 border-b">
            <div className="flex h-16 items-center px-5 md:px-8 justify-between">
                <Link to={"/shop/home"} className="flex gap-1 items-center">
                    <h1 className=" text-4xl font-semibold font">shipin</h1>
                    <Truck className="w-6 h-6" />
                </Link>
                <Sheet>
                    <SheetTrigger asChild className="block md:hidden ">
                        <Button variant="outline">
                            <Menu className="w-8 h-8"/>
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <MenuItems/>
                    </SheetContent>
                </Sheet>
                <div className="hidden md:block">
                    <MenuItems/>
                </div>
                <HeaderRightContent/>
            </div>
        </header>
    )
}