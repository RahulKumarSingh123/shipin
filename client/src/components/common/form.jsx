import { Label} from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Select, SelectItem, SelectValue,SelectContent, SelectTrigger } from "../ui/select";
import { Button } from "../ui/button";

export default function CustomForm({formControls,formData,setFormData,onSubmit,buttonText}){
    function getComponent(field){
        let element="";
        let f=field.name;
        let value=formData[field.name];
        switch(field.componentType)
        {
            case "input":
                element=(
                <Input name={field.name} 
                placeholder={field.placeholder} 
                type={field.type}
                value={value}
                onChange={e=>setFormData({...formData,[f]:e.target.value})}
                />)
                break;
            case "textarea":
                element=(
                <Textarea name={field.name} 
                placeholder={field.placeholder} 
                type={field.type}
                value={value}
                onChange={e=>setFormData({...formData,[f]:e.target.value})}
                />)
                break;
            case "select":
                element=(<Select name={field.name} value={value}
                    onValueChange={value=>setFormData({...formData,[f]:value})}>
                    <SelectTrigger>
                        <SelectValue placeholder={ field.label}></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {field.options?.map((option)=>(<SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>))}
                    </SelectContent>
                </Select>)
                break;
            default:
                element=null
        }
        return element;
    }
    return(
        <form className="flex flex-col gap-3 px-4 md:px-7 py-auto" onSubmit={onSubmit}>
            {formControls.map((field)=>(
                <div key={field.name}>
                    <Label className="mb-2">{field.label}</Label>
                    {getComponent(field)}
                </div>
            ))}
            <Button className="w-full my-2.5">{buttonText}</Button>
        </form>
    )

}