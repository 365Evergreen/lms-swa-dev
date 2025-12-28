import * as React from 'react';
import { useParams } from 'react-router-dom';
// Import your content fetchers and layouts
// import { fetchWordPressPage, fetchEbook } from '../utils/wordpressMenu';
// import EbookPage from './EbookPage';
// import StandardPage from './StandardPage';

const ContentRouter: React.FC = () => {
  const { type, slug } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [content, setContent] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLoading(true);
    setError(null);
    // Example: switch by type
    async function fetchContent() {
      try {
        let data;
        switch (type) {
          case 'ebook':
            // data = await fetchEbook(slug);
            break;
          case 'page':
          default:
            // data = await fetchWordPressPage(slug);
            break;
        }
        setContent(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, [type, slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!content) return <div>Not found</div>;

  // Example: render by type
  switch (type) {
    case 'ebook':
      // return <EbookPage data={content} />;
      return <div>Ebook UI for {slug}</div>;
    case 'page':
    default:
      // return <StandardPage data={content} />;
      return <div>Standard Page UI for {slug}</div>;
  }
};

export default ContentRouter;
