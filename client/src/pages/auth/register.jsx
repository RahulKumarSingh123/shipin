import CustomForm from "@/components/common/form";
import { RegisterFormControls } from "../../configs";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {registerUser} from "@/store/auth-slice/index"
import { toast } from "sonner";

export default function Register(){
    const initialState={
        userName:"",
        email:"",
        password:""
    }
    const [formData,setFormData]=useState(initialState);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleFormSubmit=(e)=>{
        e.preventDefault();
        dispatch(registerUser(formData)).then((data)=>{
            if(data?.payload?.success)
            {
                toast(data?.payload?.message)
                navigate('/auth/login')
            }
            else{
                toast(data?.payload?.message);
            }
        })
    }
        console.log(formData);
    return(
        <div>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-2">Create a new account</h1>
                <p className="text-gray-800 font-light mb-3">Already have an account? <Link className="hover:underline"to="/auth/login">Login</Link></p>
            </div>
            <CustomForm formControls={RegisterFormControls} formData={formData} setFormData={setFormData} onSubmit={handleFormSubmit} buttonText="Register" />
        </div>
    )
}