import { useContext, useEffect, useRef } from 'react';

import ace from 'ace-builds';

import 'ace-builds/src-min-noconflict/mode-html';
import 'ace-builds/src-min-noconflict/theme-clouds';
import 'ace-builds/src-min-noconflict/theme-monokai';

import 'ace-builds/src-min-noconflict/ext-language_tools';
import 'ace-builds/src-min-noconflict/ext-beautify';

import 'ace-builds/webpack-resolver';

import { TriggerContext } from '../Context/ButtonTriggerContext';
import styles from './Editor.module.scss';

const Editor: React.FC = () => {
  const { trigger, setTrigger } = useContext(TriggerContext);
  const frameRef = useRef<HTMLIFrameElement>(null);
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
    const theme = localStorage.getItem('theme');
    if (editRef.current) {
      const editor = ace.edit(editRef.current);
      editor.setOption('mergeUndoDeltas', 'always');
      editor.setTheme(
        theme === 'dark' ? 'ace/theme/monokai' : 'ace/theme/clouds'
      );
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
      
      </body>
      </html>
      `);
      const beautify = ace.require('ace/ext/beautify'); // get reference to extension
      beautify.beautify(editor.session);
      if (frameRef.current) {
        frameRef.current.contentWindow?.document.open();
        frameRef.current.contentWindow?.document.write(
          editor.session.getValue()
        );
        frameRef.current.contentWindow?.document.close();
      }
    }
  }, [editRef]);

  const myFunc = async () => {
    if (editRef.current) {
      const editor = ace.edit(editRef.current);
      if (trigger === 'Run' && frameRef.current) {
        setTrigger('');
        frameRef.current.contentWindow?.document.open();
        frameRef.current.contentWindow?.document.write(
          editor.session.getValue()
        );
        frameRef.current.contentWindow?.document.close();
      }
      if (trigger === 'Format') {
        const beautify = ace.require('ace/ext/beautify'); // get reference to extension
        beautify.beautify(editor.session);
        setTrigger('');
      }
      if (trigger === 'Download') {
        setTrigger('');
        const element = document.createElement('a');
        const file = new Blob([editor.session.getValue()], {
          type: 'text/plain;charset=utf-8',
        });
        element.href = URL.createObjectURL(file);
        element.download = 'download.txt';
        document.body.appendChild(element);
        element.click();
      }
      if (trigger === 'Theme') {
        const theme = localStorage.getItem('theme');
        console.log(theme);
        setTrigger('');
        editor.setTheme(
          theme === 'light' ? 'ace/theme/clouds' : 'ace/theme/monokai'
        );
      }
    }
  };
  useEffect(() => {
    myFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);
  return (
    <>
      <div className={styles.editor}>
        <div
          id="ace-editor"
          ref={editRef}
          style={{
            height: '832px !important',
          }}
        >
          Editor
        </div>{' '}
      </div>
      <div className={styles.output}>
        <iframe className={styles.frame} ref={frameRef} title="Output Frame" />
      </div>
    </>
  );
};

export default Editor;
