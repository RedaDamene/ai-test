'use client';
import type { PutBlobResult } from '@vercel/blob';
import {useState, useRef, ChangeEvent, FormEvent} from 'react';
import Image from "next/image";

function UploadFile() {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);

    const [image, setImage] = useState<string>("");
    const [openAIResponse, setOpenAIResponse] = useState<string>("");
    function handleFileChange(event: ChangeEvent<HTMLInputElement>){
        if (!inputFileRef.current?.files) {
            throw new Error("No file selected");
        }
        //Récupère l'image
        const file = inputFileRef.current.files[0];

        // Converse l'image en base64 (string) avec FileReader
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            if(typeof  reader.result === "string")
            setImage(reader.result);
        }

        reader.onerror = (error) => {
            console.log("Erreur : " + error)
        }

    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if(image === "") {
            alert('Ajouter une image.');
            return;
        }

        await fetch(
            `/api/image`,
            {
                method: "POST",
                headers: {
                    "Conent-Type": 'applicaiton/json'
                },
                body: JSON.stringify({
                    image: image
                })
            }
        )
            .then(async (response:any) => {
                //Streaming response
                const reader = response.body?.getReader();
                setOpenAIResponse("");
                while(true) {
                    const { done, value } = await reader?.read();

                    if(done) {
                        break;
                    }
                    // Ajoute la nouvelle lecture a la valeur precédente
                    // "Une simple phrase qui ajoute" + "nouveau mot" etc...
                    var currentChunk = new TextDecoder().decode(value);
                    setOpenAIResponse((prev) => prev + currentChunk);
                }
            })

    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center text-md">
                <div className="bg-gray-500 w-full max-w-2xl rounded-lg shadow-md p-8">
                    <h2 className="text-xl font-bold mb-4">Chosir un fichier</h2>
                    {   image !== "" ?
                            <div className="mb-4 overflow-hidden">
                                <Image
                                    src={image}
                                    width={500}
                                    height={500}
                                    alt="Image que l'utilsateur a entré"
                                    className="w-full object-contain"
                                />
                            </div>
                        :
                            <div className="mb-4 p-8 text-center">
                                <p>La photo sera ici.</p>
                            </div>
                    }
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <input
                            className="text-sm border rounded-lg cursor-pointer mb-2"
                            name="file"
                            ref={inputFileRef}
                            type="file"
                            onChange={handleFileChange}
                            required />
                        <br/>
                        <div className="flex justify-center">
                            <button
                                className="p-2 bg-blue-600 rounded-md mb-4"
                                type="submit"
                            >
                                Analyser
                            </button>
                        </div>
                    </form>

                    { openAIResponse !== "" ?
                        <div className="border-t border-gray-300 pt-4">
                            <h2 className="text-xl font-bold mb-2">Réponse : </h2>
                            <p>{openAIResponse}</p>
                        </div>
                    : null
                    }
                </div>
            </div>
        </>
    );
}

export default UploadFile;