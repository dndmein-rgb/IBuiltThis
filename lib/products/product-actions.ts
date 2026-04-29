"use server"
import {auth} from "@clerk/nextjs/server"
type FormState={
    success:boolean;
    errors?:Record<string,string[]>;
    message:string;
}
export const addProductAction=async(prevState:FormState,formData:FormData)=>{
    console.log(formData);
    try {
        const {userId}=await auth();
        if(!userId){
            return{
        success:false,
        message:"You must be signed to submit a product ",
         errors: undefined,
    }
}
        const rawFormData = Object.fromEntries(formData.entries());
            //validate the data

        
    } catch (error) {
       console.error(error) ;
       return{
        success:false,
        errors:error,
        message:"Failed to submit product"
    }
    }
    
}