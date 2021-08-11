import CustomEditor from 'ckeditor-custom'

export default () => {
  const editorEl = document.getElementById('editor')

  if (editorEl) {
    CustomEditor.create(editorEl).catch((error) => console.error(error))
  }
}
