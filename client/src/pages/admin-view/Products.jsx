import CustomForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { addProductFormElements } from "@/configs";
import ProductImageUpload from "@/components/common/image-upload";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { fetchProducts ,addProduct, editProduct} from "@/store/admin-slices/product-slice";
import ProductTile from "@/components/admin-view/productTile";

const initialState={
    title:"",
    description:"",
    category:"",
    brand:"",
    price:"",
    salePrice:"",
    totalStock:""
}
export default function Products(){
    const [openAddProducts,setOpenAddProducts]=useState(false);
    const [formData,setFormData]=useState(initialState);
    const [imageFile,setImageFile]=useState(null);
    const [uploadedImageUrl,setUploadedImageUrl]=useState("");
    const [uploadedImagePublicId,setuploadedImagePublicId]=useState("");
    const [imageLoading,setImageLoading]=useState(false);
    const [editId,seteditId]=useState("");

    const dispatch=useDispatch();
    const {productList}=useSelector(state=>state.adminProducts);

    console.log(productList);

    async function uploadProductImage()
    {
        let data=new FormData();
        data.append("product_image",imageFile);
        setImageLoading(true);
        const response=await axios.post("http://localhost:5000/api/admin/products/upload",data);
        setImageLoading(false);
        const {public_id,secure_url}=response?.data?.result;
        setUploadedImageUrl(secure_url);
        setuploadedImagePublicId(public_id);
        console.log(response.data);
    }
    
    useEffect(()=>{
        dispatch(fetchProducts());
    },[dispatch])

    useEffect(()=>{
        if(imageFile != null)
        {
            uploadProductImage();
        }
    },[imageFile]);

    function addProducts(e){
        e.preventDefault();
        if(editId.length>0){
            dispatch(editProduct({id:editId,data:{
                ...formData,
                image_url:uploadedImageUrl,
                image_public_id:uploadedImagePublicId,
            }})).then((data)=>{
                console.log(data.payload.data);
                if(data.payload.success)
                {
                    setOpenAddProducts(false);
                    setImageFile(null);
                    setFormData(initialState);
                    setUploadedImageUrl("");
                    setuploadedImagePublicId("");
                    dispatch(fetchProducts());
                    toast(data.payload.message);
                    seteditId("");
                }
            })
        }else{
            dispatch(addProduct({
                ...formData,
                image_url:uploadedImageUrl,
                image_public_id:uploadedImagePublicId
            })).then((data)=>{
                console.log(data);
                if(data.payload.success)
                {
                    setOpenAddProducts(false);
                    setImageFile(null);
                    setFormData(initialState);
                    setUploadedImageUrl("");
                    setuploadedImagePublicId("");
                    dispatch(fetchProducts());
                    toast(data.payload.message);
                }
            })
        }
    }

    return (
        <>
            <div className="mb-5 w-full flex justify-end py-5 px-7">
                <Button onClick={()=>{setOpenAddProducts(true)}}>Add New Product</Button>
            </div>
            {
                (productList.length >0)?
                <div className="grid gap-4 m-5 px-4 md:grid-cols-3 lg:grid-cols-4 ">
                    {productList.map((product)=>(<ProductTile product={product} seteditId={seteditId} setFormData={setFormData} setuploadedImagePublicId={setuploadedImagePublicId} setUploadedImageUrl={setUploadedImageUrl} setOpenAddProducts={setOpenAddProducts}/>))}
                </div>
                    :<h2 className="text-lg font-semibold text-gray-800 m-7">No Products Found, Add products.</h2>
            }
            <Sheet open={openAddProducts} onOpenChange={setOpenAddProducts}>
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle><span className="font-bold text-lg">Add New Product</span></SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload  imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} imageLoading={imageLoading} setUploadedImagePublicId={setuploadedImagePublicId}/>
                    <div className="py-6">
                        <CustomForm formControls={addProductFormElements} formData={formData} setFormData={setFormData} onSubmit={addProducts} buttonText={`${(editId.length>0)?"Edit":"Add"} Product`}/>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}