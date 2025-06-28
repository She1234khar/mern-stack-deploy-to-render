import { Link } from "react-router-dom";
import { loginFormControls } from "../../config/pt";
import { toast } from "sonner";


import CommonForm from "../../components/common/form";

import { useState } from 'react';
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice/slice";

const initialState={

  email:'',
  password:''
}
 export default function AuthLogin() {
 
  const [formData, setFormData] = useState(initialState);
  const dispatch =useDispatch();
function onSubmit(){
  // event.preventDefault();
  dispatch(loginUser(formData)).then((data)=>{
    if(data?.payload?.success){
      toast.success(data?.payload.message);
    }
    else{
      toast.error(data?.payload.message);
    }
  })
  
}

    return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Welcome Back! Sign in to your account
        </h1>
        <p className="mt-2">
          Dont't have Account?{" "}
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText="Sign In"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}
