import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface WPContent {
  id: string;
  title: string;
  content: string;
  featuredImage?: {
    node?: {
      sourceUrl?: string;
    };
  };
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
    // WPGraphQL query to get courses by slug
    const query = `
      query GetCourses {
        courses {
          nodes {
            id
            title
            content(format: RENDERED)
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    `;
    fetch('https://thn.chh.mybluehost.me/website_8a441532/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    })
      .then(res => res.json())
      .then(res => {
        if (res.errors) throw new Error(res.errors.map((e: any) => e.message).join(', '));
        // Find course by slug (match title or id)
        const course = res.data.courses.nodes.find((c: any) => {
          // Try to match slug to title (case-insensitive, replace spaces with hyphens)
          const courseSlug = c.title.toLowerCase().replace(/\s+/g, '-');
          return courseSlug === slug;
        });
        setPage(course || null);
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
      {page.featuredImage?.node?.sourceUrl && (
        <img src={page.featuredImage.node.sourceUrl} alt={page.title} style={{ maxWidth: '100%', marginBottom: '1rem' }} />
      )}
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
};

export default WPPage;
