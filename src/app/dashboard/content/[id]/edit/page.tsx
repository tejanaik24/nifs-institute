import { notFound } from "next/navigation";
import { getPostById } from "@/lib/db/posts";
import { PostEditorForm } from "@/components/dashboard/post-editor-form";
import { updatePostAction } from "../../actions";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostById(Number(id));
  if (!post) notFound();

  const boundAction = updatePostAction.bind(null, post.id);

  return (
    <div>
      <h1 className="mb-6 text-lg font-semibold">Edit post</h1>
      <PostEditorForm action={boundAction} initial={post} submitLabel="Save changes" />
    </div>
  );
}
