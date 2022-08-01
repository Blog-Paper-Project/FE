/* Toast-UI Viewer 임포트 */
import "@toast-ui/editor/dist/toastui-editor.css";
import { Viewer } from "@toast-ui/react-editor";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";

const ViewEdit = ({ contents }) => {
  return <Viewer initialValue={contents} />;
};

export default ViewEdit;
