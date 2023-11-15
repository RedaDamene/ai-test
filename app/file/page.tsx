import UploadFile from "@/app/ui/components/UploadFile/UploadFile";
import OpenAI from "openai";

export default function FileUploadPage() {
const openai = new OpenAI();

    return (
        <UploadFile />
    );
}
