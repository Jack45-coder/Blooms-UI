import React, { useState } from "react";
import api from "../api/apiClient";

const CreateBlog = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
  });

  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const userId = user?.id;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitBlog = async (e) => {
    e.preventDefault();

    try {
      await api.post("/blogs", form, {
        headers: { userId: userId }
      });

      setMessage("Blog Created Successfully!");
      setForm({ title: "", description: "", content: "" });

    } catch (err) {
      setMessage("Error creating blog!");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-5">Create Blog</h1>

      {message && <p>{message}</p>}

      <form onSubmit={submitBlog} className="space-y-3">

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button className="bg-green-600 text-white px-4 py-2">
          Create
        </button>

      </form>
    </div>
  );
};

export default CreateBlog;