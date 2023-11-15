import {list} from '@vercel/blob';
import DeleteFileButton from "@/app/ui/components/File/DeleteFileButton";

export default async function AllFilePage() {
    const { blobs } = await list();
    console.log({blobs});
    return(
        <div>
            <h1>Liste des fichiers dans la base : </h1>
            {blobs.map((blob) => (
                <div key={blob.url}>
                    {blob.pathname} - <DeleteFileButton url={blob.url}/>
                </div>
            ))}
        </div>
    )
}