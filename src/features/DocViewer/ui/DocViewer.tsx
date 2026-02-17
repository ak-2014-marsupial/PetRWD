import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import css from './DocViewer.module.css';

interface DocViewerProps {
  docName: string;
}

export const DocViewer = ({ docName }: DocViewerProps) => {
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    if (docName) {
      fetch(`/docs/${docName}.md`)
        .then((response) => response.text())
        .then((text) => setMarkdownContent(text))
        .catch(console.error);
    }
  }, [docName]);

  return (
    <div className={css.DocViewer}>
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
};
