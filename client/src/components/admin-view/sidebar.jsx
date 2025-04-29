import { CalendarArrowDown, ChartNoAxesCombined, ShoppingBasket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

function MenuItems(){
    const navigate=useNavigate()
    const MenuItems = [{
        id: "dashboard",
        label: "DashBoard",
        path: "/admin/dashboard",
        icon:<ChartNoAxesCombined/>
    },
    {
        id: "products",
        label: "Products",
        path: "/admin/products",
        icon:<ShoppingBasket/>
    },
    {
        id: "orders",
        label: "Orders",
        path: "/admin/orders",
        icon:<CalendarArrowDown/>
    },
    // {
    //     id: "features",
    //     label: "Features",
    //     path: "/admin/features",
    //     icon:
    // }
]
    return(
    <>
        
        {
            MenuItems.map((item)=>{
                return(
                <div
                    key={item.id}
                    className="flex cursor-pointer text-xl gap-2 items-center text-muted-foreground hover:bg-muted hover:text-foreground rounded-md px-3 py-2"
                    onClick={()=>{navigate(item.path)}}
                >
                    {item.icon}
                    
                    <span >{item.label}</span>
                </div>
                )
            })
        }
        </>
    )
}
export default function SideBar({open,setOpen}){
    return(
        <>
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="left">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                <span className="text-2xl font-extrabold">Admin Panel</span>
              </SheetTitle>
            </SheetHeader>
                <MenuItems/>
            </SheetContent>
        </Sheet>
        <div className="hidden md:block">
            <MenuItems/>
        </div>
        </>
    )
}