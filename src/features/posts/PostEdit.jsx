import { useParams, useNavigate } from "react-router-dom";
import { useGetPostQuery, useUpdatePostMutation } from "./postApi";
import { useState, useEffect } from "react";
import Button from "../../components/ui/Button";

export default function PostEdit() {
  const { id } = useParams();
  const nav = useNavigate();
  const { data, isLoading } = useGetPostQuery(id);
  const [updatePost] = useUpdatePostMutation();
  const isLoadingUpdate = updatePost.isLoading;

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setBody(data.body);
    }
  }, [data]);

  const submit = async (e) => {
    e.preventDefault();
    await updatePost({ id, title, body });
    nav("/posts");
  };

  return (
    <form onSubmit={submit} className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 mt-6 gap-4">
      <div className="flex flex-col gap-4 mb-4">
        <input value={title}
         onChange={(e) => setTitle(e.target.value)}
         className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
         />
        <textarea value={body}
         onChange={(e) => setBody(e.target.value)}
         className="w-full border border-slate-300 rounded-lg px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
         />
      </div>
      <Button disabled={isLoadingUpdate}>{isLoadingUpdate ? "Guardando..." : "Guardar"}</Button>
    </form>
  );
}
