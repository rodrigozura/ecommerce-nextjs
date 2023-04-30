import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
}) {
  const router = useRouter();
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProduct, setGoToProduct] = useState(false);

  async function saveProduct(evt) {
    evt.preventDefault();
    const data = { title, description, price };
    if (_id) {
      await axios.put("/api/products", { _id, ...data });
    } else {
      await axios.post("/api/products", data);
    }

    setGoToProduct(true);
  }

  if (goToProduct) router.push("/products");
  return (
    <form onSubmit={saveProduct}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="Product Name"
        value={title}
        onChange={(evt) => setTitle(evt.target.value)}
      />
      <label>Description</label>
      <textarea
        placeholder="Description"
        value={description}
        onChange={(evt) => setDescription(evt.target.value)}
      ></textarea>
      <label>Price (in USD)</label>
      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(evt) => setPrice(evt.target.value)}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
