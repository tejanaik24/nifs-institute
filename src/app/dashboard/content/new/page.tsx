import { PostEditorForm } from "@/components/dashboard/post-editor-form";
import { saveDraftAction } from "../actions";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="mb-6 text-lg font-semibold">New post</h1>
      <PostEditorForm action={saveDraftAction} submitLabel="Save draft" />
    </div>
  );
}
