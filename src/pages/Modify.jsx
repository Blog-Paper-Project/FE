import React from "react";
import { useParams } from "react-router-dom";
import ModifyEdit from "../components/editor/ModifyEdit";

const Modify = () => {
  const { postId } = useParams();
  const { blogId } = useParams();

  return (
    <div>
      <ModifyEdit postId={postId} blogId={blogId} />
    </div>
  );
};

export default Modify;
