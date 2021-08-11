/**
 * @license Copyright (c) 2014-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

import 'regenerator-runtime/runtime'

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'

import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat'
import AutoImage from '@ckeditor/ckeditor5-image/src/autoimage'
import AutoLink from '@ckeditor/ckeditor5-link/src/autolink'
import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter'
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Code from '@ckeditor/ckeditor5-basic-styles/src/code'
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock'
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import FindAndReplace from '@ckeditor/ckeditor5-find-and-replace/src/findandreplace'
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor'
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor'
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily'
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight'
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline'
import Image from '@ckeditor/ckeditor5-image/src/image'
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption'
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert'
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize'
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle'
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar'
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload'
import Indent from '@ckeditor/ckeditor5-indent/src/indent'
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Link from '@ckeditor/ckeditor5-link/src/link'
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage'
import List from '@ckeditor/ckeditor5-list/src/list'
import ListStyle from '@ckeditor/ckeditor5-list/src/liststyle'
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed'
import MediaEmbedToolbar from '@ckeditor/ckeditor5-media-embed/src/mediaembedtoolbar'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat'
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters'
import SpecialCharactersArrows from '@ckeditor/ckeditor5-special-characters/src/specialcharactersarrows'
import SpecialCharactersCurrency from '@ckeditor/ckeditor5-special-characters/src/specialcharacterscurrency'
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials'
import SpecialCharactersMathematical from '@ckeditor/ckeditor5-special-characters/src/specialcharactersmathematical'
import SpecialCharactersText from '@ckeditor/ckeditor5-special-characters/src/specialcharacterstext'
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough'
import Table from '@ckeditor/ckeditor5-table/src/table'
// @ts-ignore
import TableCaption from '@ckeditor/ckeditor5-table/src/tablecaption'
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties'
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties'
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar'
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation'
import TodoList from '@ckeditor/ckeditor5-list/src/todolist'
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline'

class Editor extends ClassicEditorBase {}

// Plugins to include in the build.
Editor.builtinPlugins = [
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Base64UploadAdapter,
  BlockQuote,
  Bold,
  Code,
  CodeBlock,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalLine,
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListStyle,
  MediaEmbed,
  MediaEmbedToolbar,
  Paragraph,
  RemoveFormat,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Table,
  TableCaption,
  TableCellProperties,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
]

Editor.defaultConfig = {
  language: 'fr',
  toolbar: {
    items: [
      'heading',
      '|',
      'undo',
      'redo',
      '|',
      'removeFormat',
      'bold',
      'italic',
      'strikethrough',
      'underline',
      'link',
      'bulletedList',
      'numberedList',
      'todoList',
      '|',
      'outdent',
      'indent',
      'alignment',
      '|',
      'code',
      'codeBlock',
      'findAndReplace',
      '|',
      'fontBackgroundColor',
      'fontColor',
      'fontFamily',
      'fontSize',
      'highlight',
      '|',
      'imageInsert',
      'imageUpload',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      '|',
      'specialCharacters',
      'horizontalLine',
    ],
    shouldNotGroupWhenFull: true,
  },
  image: {
    toolbar: [
      'imageTextAlternative',
      'imageStyle:inline',
      'imageStyle:block',
      'imageStyle:side',
      'linkImage',
    ],
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells',
      'tableCellProperties',
      'tableProperties',
    ],
  },
}

export default Editor
