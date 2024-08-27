import React, { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Heading from '@tiptap/extension-heading';
import Strike from '@tiptap/extension-strike';
import Typography from '@tiptap/extension-typography';
import TextAlign from '@tiptap/extension-text-align';
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import { DOMParser as ProseMirrorDOMParser } from 'prosemirror-model';
import EditToolbar from '@components/notes/editToolbar';
import ListRow from '@components/table/listRow';
import { marked } from 'marked';

const TiptapEditor = ({ noteContent, handleContentChange, selectedNote, updateTitle, showAlert, updateCharacterNote, onScroll }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        emptyNodeClass: 'is-editor-empty',
      }),
      Bold,
      Italic,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      Strike,
      Typography,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      FontFamily.configure({ types: ['textStyle'] }),
      TextStyle,
      Underline,
      Highlight,
      Link,
    ],
    content: noteContent,
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      handleContentChange({ target: { value: newContent } });
      updateTitle(newContent);
    },
    editorProps: {
      handlePaste(view, event) {
        const pastedData = event.clipboardData.getData('text/plain');
        if (pastedData) {
          const htmlContent = marked(pastedData);
          const parser = new DOMParser();
          const doc = parser.parseFromString(htmlContent, 'text/html');

          // Convert the HTML content to ProseMirror nodes
          const fragment = ProseMirrorDOMParser.fromSchema(view.state.schema).parse(doc.body);

          view.dispatch(
            view.state.tr.replaceSelectionWith(fragment)
          );

          event.preventDefault();
          return true;
        }
        return false;
      },
      attributes: {
        class: 'prose prose-sm dark:prose-invert focus:outline-none pb-96 m-auto',
      },
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(noteContent);
    }
  }, [selectedNote]);

  const handleScroll = (event) => {
    const scrollTop = event.target.scrollTop;
    if (onScroll) {
      onScroll(scrollTop);
    }
  };

  const handleClick = (event) => {
    const listRowElement = document.getElementById('list-row-section');
    const toolbarElement = document.getElementById('toolbar-section');
    if ((listRowElement && listRowElement.contains(event.target)) || (toolbarElement && toolbarElement.contains(event.target))) {
      // Do nothing if the click is inside the ListRow component
      return;
    }
    if (editor) {
      editor.commands.focus();
    }
  };

  return (
    <div
      className="flex-grow px-8 pb-4 overflow-auto cursor-text"
      onScroll={handleScroll}
      onClick={handleClick}
    >
      <div className="relative w-full h-full">
        {selectedNote?.character && (
          <div id="list-row-section" className='mb-10 mx-auto border-b border-gray-200 dark:border-gray-700'>
            <ListRow
              characterData={selectedNote}
              isNoteView={true}
              showAlert={showAlert}
              updateCharacterNote={updateCharacterNote}
            />
          </div>
        )}
        {/* Editor Content Area */}
        <EditorContent editor={editor} />
      </div>
      {/* Floating Toolbar */}
      {editor && 
        <EditToolbar editor={editor} />
      }
    </div>
  );
};

export default TiptapEditor;