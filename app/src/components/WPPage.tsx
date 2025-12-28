import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface WPContent {
  id: string;
  title: string;
  content: string;
}

const WPPage: React.FC = () => {
  const { slug } = useParams();
  const [page, setPage] = useState<WPContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    // WPGraphQL query to get page by slug
    const query = `
      query GetPageBySlug($slug: ID!) {
        page(id: $slug, idType: URI) {
          id
          title
          content
        }
      }
    `;
    fetch('https://thn.chh.mybluehost.me/website_8a441532/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { slug } })
    })
      .then(res => res.json())
      .then(res => {
        if (res.errors) throw new Error(res.errors.map((e: any) => e.message).join(', '));
        setPage(res.data.page);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>Error: {error}</div>;
  if (!page) return <div style={{ padding: '2rem' }}>Not found</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{page.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
};

export default WPPage;
