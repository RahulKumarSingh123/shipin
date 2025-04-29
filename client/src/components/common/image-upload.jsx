import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useRef } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({imageFile,setImageFile,uploadedImageUrl,setUploadedImageUrl,imageLoading,setuploadedImagePublicId}){
    const inputRef=useRef(null);
    function imageFileChange(e){
        console.log(e.target.files);
        const selectedFile=e.target.files?.[0];
        if(selectedFile) setImageFile(selectedFile);
    }
    function handleDragover(e){
        e.preventDefault();
    }
    function handleDrop(e){
        e.preventDefault();
        const droppedFile=e.dataTransfer.files?.[0];
        if(droppedFile)
        {
            setImageFile(droppedFile)
        }
    }
    function handleRemoveImage(){
        setImageFile(null);
        if(inputRef.current)
        {
            inputRef.current.value="";
        }
    }
    console.log(imageFile)

    return (
        <div className="w-full max-w-md mx-auto px-5 md:px-7">
            <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
            <div onDragOver={handleDragover} onDrop={handleDrop} className="border-2 border-dashed rounded-lg p-4">
                <Input id="image-upload" type="file" ref={inputRef} onChange={imageFileChange} className="hidden"
                />
                {
                    (uploadedImageUrl.length>0)?
                    <div>
                        <XIcon className="w-4 h-4 relative -bottom-6 left-63 cursor-pointer" onClick={()=>{
                            setUploadedImageUrl("");
                            setuploadedImagePublicId("");
                        }
                        }/>
                        <img src={uploadedImageUrl} className="rounded-lg"></img>
                    </div>
                    :(!imageFile)?
                    <Label htmlFor="image-upload" className="flex flex-col items-center justify-center h-32 cursor-pointer">
                        <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2"/>
                        <span>Drag & Drop or Click to Upload Image</span>
                    </Label>:
                    (imageLoading)?<Skeleton className="h-16 bg-gray-100"/>
                    :<div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <FileIcon className="w-8 text-primary mr-2 h-8"/>
                        </div>
                        <p className="text-sm font-medium">{imageFile.name}</p>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={handleRemoveImage}>
                            <XIcon className="w-4 h-4"/>
                            <span className="sr-only">Remove Files</span>
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default ProductImageUpload;