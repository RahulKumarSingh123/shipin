import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { deleteProduct, fetchProducts } from "@/store/admin-slices/product-slice";
import { toast } from "sonner";

export default function productTile({product,seteditId,setFormData,setUploadedImageUrl,setOpenAddProducts,setuploadedImagePublicId})
{
    const dispatch=useDispatch();
    function handleEdit()
    {
        seteditId(product._id.toString());
        setFormData({
            title:product.title,
            description:product.description,
            category:product.category,
            brand:product.brand,
            price:product.price,
            salePrice:product.salePrice,
            totalStock:product.totalStock,
        });
        setUploadedImageUrl(product.image_url);
        setuploadedImagePublicId(product.image_public_id);
        setOpenAddProducts(true);
    }
    function handleDelete(){
        dispatch(deleteProduct(product._id)).then((data)=>{
            console.log(data);
            if(data.payload.success)
            {
                dispatch(fetchProducts());
                toast(data.payload.message);
            }
        })
    }
    return (
        <Card>
            <div>
                <div className="relative">
                    <img src={product.image_url} alt={product.tile} className="w-full h-[180px] object-contain rounded-t-lg"/>
                </div>
                <CardContent>
                    <h2 className="text-xl font-bold mb-2">{product.title}</h2>
                    <div className="flex justify-between items-center mb-2">
                        <span className={`${(product.salePrice>0)?"line-through":""} text-lg font-semibold text-primary`}>₹{product.price}</span>
                        <span className="text-lg font-bold">₹{product.salePrice}</span>
                    </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <Button onClick={handleEdit}>Edit</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </CardFooter>
            </div>

        </Card>
    )
}