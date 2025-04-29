import { LoginFormControls } from "../../configs";
import { useState } from "react";
import CustomForm from "@/components/common/form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {loginUser} from "@/store/auth-slice/index"

export default function Login(){
    const [formData,setFormData]=useState({userName:"",password:""});
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleFormSubmit=(e)=>{
        e.preventDefault();
        dispatch(loginUser(formData)).then((data)=>{
            console.log(data);
            toast(data?.payload?.message);
        })
        console.log(formData);
    }
    return(
        <div>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-2">Sign in to your account</h1>
                <p className="text-gray-800 font-light mb-3">Don't have an account? <Link className="hover:underline"to="/auth/register">Register</Link></p>
            </div>
            <CustomForm formControls={LoginFormControls} formData={formData} setFormData={setFormData} onSubmit={handleFormSubmit} buttonText="Login" />
        </div>
    )
}