import React from "react";
import { useParams } from "react-router-dom";
import ModifyEdit from "../components/editor/ModifyEdit";

const Modify = () => {
  const { postId } = useParams();
  const { userId } = useParams();

  return (
    <div>
      <ModifyEdit postId={postId} userId={userId} />
    </div>
  );
};

export default Modify;
