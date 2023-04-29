import Layout from "@/components/Layout";
import axios from "axios";
import { useState } from "react";

export default function NewProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  async function createProduct(evt) {
    evt.preventDefault();
    const data = { title, description, price };
    await axios.post("/api/products", data);
  }
  return (
    <Layout>
      <h1>New Product</h1>
      <form onSubmit={createProduct}>
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
    </Layout>
  );
}
