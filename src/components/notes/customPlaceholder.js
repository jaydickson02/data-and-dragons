import { Extension } from '@tiptap/core';
import { Decoration, DecorationSet } from 'prosemirror-view';

const CustomPlaceholder = Extension.create({
  name: 'customPlaceholder',

  addOptions() {
    return {
      placeholder: 'A new page in the grimoire',
    };
  },

  addProseMirrorPlugins() {
    return [
      {
        props: {
          decorations: ({ doc }) => {
            const decorations = [];

            if (doc.childCount === 1 && doc.firstChild.isTextblock && doc.firstChild.content.size === 0) {
              const placeholderDecoration = Decoration.widget(1, () => {
                const placeholder = document.createElement('span');
                placeholder.className = 'custom-placeholder';
                placeholder.textContent = this.options.placeholder;
                return placeholder;
              });
              decorations.push(placeholderDecoration);
            }

            return DecorationSet.create(doc, decorations);
          },
        },
      },
    ];
  },
});

export default CustomPlaceholder;