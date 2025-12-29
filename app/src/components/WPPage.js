import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const WPPage = () => {
    var _a, _b;
    const { slug } = useParams();
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!slug)
            return;
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
            if (res.errors)
                throw new Error(res.errors.map((e) => e.message).join(', '));
            // Find course by slug (match title or id)
            const course = res.data.courses.nodes.find((c) => {
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
    if (loading)
        return _jsx("div", { className: "mainContent", children: "Loading..." });
    if (error)
        return _jsxs("div", { className: "mainContent errorText", children: ["Error: ", error] });
    if (!page)
        return _jsx("div", { className: "mainContent", children: "Not found" });
    return (_jsxs("div", { className: "mainContent", children: [_jsx("h2", { children: page.title }), ((_b = (_a = page.featuredImage) === null || _a === void 0 ? void 0 : _a.node) === null || _b === void 0 ? void 0 : _b.sourceUrl) && (_jsx("img", { src: page.featuredImage.node.sourceUrl, alt: page.title, className: "featuredImage" })), _jsx("div", { dangerouslySetInnerHTML: { __html: page.content } })] }));
};
export default WPPage;
