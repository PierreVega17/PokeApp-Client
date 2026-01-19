import PostForm from "../features/posts/PostForm";
import PostList from "../features/posts/PostList";

export default function PostsPage() {
  return (
    <div className="max-w-xl mx-auto space-y-6 p-6 gap-6">
      <h2 className="text-2xl font-bold">Blog</h2>
      <PostForm />
      <PostList />
    </div>
  );
}
