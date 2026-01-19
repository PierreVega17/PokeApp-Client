import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreatePostMutation } from "./postApi";
import Button from "../../components/ui/Button";

const schema = z.object({
  title: z.string().min(3, "Mínimo 3 caracteres"),
  body: z.string().min(5, "Mínimo 5 caracteres"),
});

export default function PostForm() {
  const [createPost, { isLoading, isError, isSuccess }] =
    useCreatePostMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    await createPost(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-2 mt-6 gap-4">
      <div className="flex flex-col gap-4 mb-4">
      <input
        {...register("title")}
        placeholder="Title"
        className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      <textarea
        {...register("body")}
        placeholder="Body"
        className="w-full border border-slate-300 rounded-lg px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.body && <p className="text-red-500">{errors.body.message}</p>}
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Creando..." : "Crear Post"}
      </Button>

      {isError && <p className="text-red-500">Error creando post</p>}
      {isSuccess && <p className="text-green-500">Post creado</p>}
    </form>
  );
}
