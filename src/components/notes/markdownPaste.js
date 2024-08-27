import { Extension } from '@tiptap/core';
import { Plugin } from 'prosemirror-state';
import { marked } from 'marked';

const MarkdownPaste = Extension.create({
  name: 'markdownPaste',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handlePaste(view, event, slice) {
            if (event.clipboardData && event.clipboardData.getData('text/plain')) {
              const pastedText = event.clipboardData.getData('text/plain');

              // Convert Markdown to HTML using marked
              const html = marked(pastedText);

              // Parse the HTML into a document fragment
              const parser = new DOMParser();
              const doc = parser.parseFromString(html, 'text/html');
              const fragment = view.state.schema.nodeFromDOM(doc.body);

              // Insert the fragment into the editor
              const tr = view.state.tr.replaceSelectionWith(fragment);
              view.dispatch(tr);
              return true;
            }
            return false;
          },
        },
      }),
    ];
  },
});

export default MarkdownPaste;