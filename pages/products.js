import Layout from "@/components/Layout";
import Link from "next/link";

export default function Product() {
  return (
    <Layout>
      <Link
        className="bg-blue-900 text-white py-2 px-2 rounded-md"
        href={"/products/new"}
      >
        Add a new Product
      </Link>
    </Layout>
  );
}
