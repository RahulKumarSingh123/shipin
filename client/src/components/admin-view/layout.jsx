import { Outlet } from "react-router-dom";
import Header from "./header";
import SideBar from "./sidebar"
import { useState } from "react";

export default function AdminLayout(){
    const [open,setOpen]=useState(false);
    return (
        <main className="min-h-screen max-w-screen  ">
            <nav className="h-[60px] ">
                <Header setOpen={setOpen}/>
            </nav>
            <div className="grid grid-cols-6">
            <aside className="hidden md:block h-full md:col-span-1 py-2 px-1">
                <SideBar open={open} setOpen={setOpen}/>
            </aside>
            <section className="h-full col-span-6 md:col-span-5 bg-muted md:grid-cols-8">
                <Outlet/>
            </section>
            </div>
        </main>
    )
}