import Link from "next/link";
import ProductCard from "@/app/ui/components/Product/ProductCard";
import AIPrompt from "@/app/ui/components/AiInput/AiPrompt";

export default function Home() {
  return (
    <main>
      <h1>Bonjour tout le monde</h1>
        <Link href="/users">
            Utilisateurs
        </Link>
        <Link href="/users/new">
            Nouveau utilisateur
        </Link>
        <ProductCard />
    </main>
  )
}
