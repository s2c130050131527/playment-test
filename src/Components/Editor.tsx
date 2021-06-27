import { useContext, useEffect, useRef } from 'react';

import ace from 'ace-builds';

import 'ace-builds/src-min-noconflict/mode-html';
import 'ace-builds/src-min-noconflict/theme-clouds';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import 'ace-builds/src-min-noconflict/ext-beautify';

import 'ace-builds/webpack-resolver';
import { TriggerContext } from '../Context/ButtonTriggerContext';

const Editor: React.FC = () => {
  const { trigger, setTrigger } = useContext(TriggerContext);
  const registerSnippets = () => {
    const { snippetManager } = ace.require('ace/snippets');
    const snippetContent = `
    # scope: html
    snippet hello
        <p>Hello, \${1:name}!</p>
    `;
    const snippets = snippetManager.parseSnippetFile(snippetContent);
    snippetManager.register(snippets, 'html');
  };
  const editRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (editRef.current) {
      const editor = ace.edit(editRef.current);
      editor.setOption('mergeUndoDeltas', 'always');
      editor.setTheme('ace/theme/clouds');
      editor.getSession().setMode('ace/mode/html');
      editor.setShowPrintMargin(false);
      editor.setFontSize('1.17em');
      editor.setOptions({
        minLines: 40,
        wrapBehavioursEnabled: true,
        wrap: 50,
      });
      editor.setOptions({ maxLines: 50 });
      registerSnippets();
      editor.getSession().setValue(`<!DOCTYPE html>
      <html>
      <head>
      <title>Page Title</title>
      <style>
      body {
        background-color: black;
        text-align: center;
        color: white;
        font-family: Arial, Helvetica, sans-serif;
      }
      </style>
      </head>
      <body>
      
      <h1>This is a Heading</h1>
      <p>This is a paragraph.</p>
      <p>Edit the code in the window to the left, and click "Run" to view the result.</p>
      <img src="avatar.png" alt="Avatar" style="width:200px">
      
      </body>
      </html>
      `);
      const beautify = ace.require('ace/ext/beautify'); // get reference to extension
      beautify.beautify(editor.session);
    }
  }, [editRef]);

  useEffect(() => {
    if (editRef.current) {
      if (trigger === 'Run') {
        const editor = ace.edit(editRef.current);
        console.log(editor.session.getValue());
        setTrigger('');
      }
      if (trigger === 'Format') {
        const editor = ace.edit(editRef.current);
        const beautify = ace.require('ace/ext/beautify'); // get reference to extension
        beautify.beautify(editor.session);
        setTrigger('');
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);
  return (
    <div
      id="ace-editor"
      ref={editRef}
      style={{
        height: '832px !important',
      }}
    >
      Editor
    </div>
  );
};

export default Editor;
