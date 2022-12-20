import dynamic from 'next/dynamic';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
)
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = ({ editorState, changeEvent }) => {
  return (
    <>
      <div className="container my-5">
        <Editor
            editorState={editorState}
            onEditorStateChange={changeEvent}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="text-editor-wrapper"
        />
      </div>
    </>
  )
}

export default TextEditor