import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from "./Spinner";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
}) {
  const router = useRouter();
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [goToProduct, setGoToProduct] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  async function saveProduct(evt) {
    evt.preventDefault();
    const data = { title, description, price, images };
    if (_id) {
      await axios.put("/api/products", { _id, ...data });
    } else {
      await axios.post("/api/products", data);
    }

    setGoToProduct(true);
  }

  if (goToProduct) router.push("/products");

  async function uploadImage(ev) {
    const files = ev.target?.files;
    if (files.length > 0) {
      const data = new FormData();
      setIsUploading(true);
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }

  return (
    <form onSubmit={saveProduct}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="Product Name"
        value={title}
        onChange={(evt) => setTitle(evt.target.value)}
      />
      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-2">
        {!!images?.length &&
          images.map((link) => (
            <div key={link} className="h-24">
              <img className="rounded-lg" src={link} alt="" />
            </div>
          ))}
        {isUploading && (
          <div className="h-24 flex items-center">
            <Spinner />
          </div>
        )}
        <label
          className="w-24 h-24 cursor-pointer border text-center flex flex-col 
        items-center justify-center text-sm gap-1 text-gray-500 
        rounded-lg bg-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Upload</div>
          <input type="file" className="hidden" onChange={uploadImage} />
        </label>
      </div>
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
