"use client";

import { useRouter } from "next/navigation";

type Props = {
    url: string;
};

function DeleteFileButton({url}: Props) {
    const router = useRouter();
    return (
        <button onClick={async () => {
            await fetch(`/api/file`, {
                method: "DELETE",
                body: JSON.stringify({
                    url
                })
            });
            router.refresh();
        }}>
            Supprimer
        </button>
    );
}

export default DeleteFileButton;