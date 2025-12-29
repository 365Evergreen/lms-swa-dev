import * as React from 'react';
import { useParams } from 'react-router-dom';

const WPGRAPHQL_ENDPOINT = 'https://thn.chh.mybluehost.me/website_8a441532/graphql';

const QUERIES: Record<string, string> = {
  courses: `query { courses { nodes { id title content(format: RENDERED) featuredImage { node { sourceUrl } } } } }`,
  topics: `query { topics { nodes { id title } } }`,
  pathways: `query { pathways { nodes { id title } } }`,
  resources: `query { eBooks { nodes { id title } } }`,
};

const ContentRouter: React.FC = () => {
  const { type, slug } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [content, setContent] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLoading(true);
    setError(null);
    setContent(null);
    const t = (type || '').toLowerCase();
    if (!t || !QUERIES[t]) {
      setError('Unknown content type');
      setLoading(false);
      return;
    }
    fetch(WPGRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: QUERIES[t] })
    })
      .then(res => res.json())
      .then(res => {
        if (res.errors) throw new Error(res.errors.map((e: any) => e.message).join(', '));
        let nodes = [];
        if (t === 'courses') nodes = res.data.courses.nodes;
        else if (t === 'topics') nodes = res.data.topics.nodes;
        else if (t === 'pathways') nodes = res.data.pathways.nodes;
        else if (t === 'resources') nodes = res.data.eBooks.nodes;
        setContent(nodes);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [type]);

  if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>Error: {error}</div>;
  if (!content || !Array.isArray(content) || content.length === 0) return <div style={{ padding: '2rem' }}>No results found.</div>;

  // Render results for each type
  if (type === 'courses') {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Courses</h2>
        <ul>
          {content.map((c: any) => (
            <li key={c.id} style={{ marginBottom: 24 }}>
              <h3>{c.title}</h3>
              {c.featuredImage?.node?.sourceUrl && (
                <img src={c.featuredImage.node.sourceUrl} alt={c.title} style={{ maxWidth: 200, marginBottom: 8 }} />
              )}
              <div dangerouslySetInnerHTML={{ __html: c.content }} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (type === 'topics') {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Topics</h2>
        <ul>
          {content.map((t: any) => (
            <li key={t.id}>{t.title}</li>
          ))}
        </ul>
      </div>
    );
  }
  if (type === 'pathways') {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Pathways</h2>
        <ul>
          {content.map((p: any) => (
            <li key={p.id}>{p.title}</li>
          ))}
        </ul>
      </div>
    );
  }
  if (type === 'resources') {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Resources (eBooks)</h2>
        <ul>
          {content.map((r: any) => (
            <li key={r.id}>{r.title}</li>
          ))}
        </ul>
      </div>
    );
  }
  return <div style={{ padding: '2rem' }}>Unknown content type.</div>;
};

export default ContentRouter;
