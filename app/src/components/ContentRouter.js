import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { useParams } from 'react-router-dom';
const WPGRAPHQL_ENDPOINT = 'https://thn.chh.mybluehost.me/website_8a441532/graphql';
const QUERIES = {
    courses: `query { courses { nodes { id title content(format: RENDERED) featuredImage { node { sourceUrl } } } } }`,
    topics: `query { topics { nodes { id title } } }`,
    pathways: `query { pathways { nodes { id title } } }`,
    resources: `query { eBooks { nodes { id title } } }`,
};
const ContentRouter = () => {
    const { type, slug } = useParams();
    const [loading, setLoading] = React.useState(true);
    const [content, setContent] = React.useState(null);
    const [error, setError] = React.useState(null);
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
            if (res.errors)
                throw new Error(res.errors.map((e) => e.message).join(', '));
            let nodes = [];
            if (t === 'courses')
                nodes = res.data.courses.nodes;
            else if (t === 'topics')
                nodes = res.data.topics.nodes;
            else if (t === 'pathways')
                nodes = res.data.pathways.nodes;
            else if (t === 'resources')
                nodes = res.data.eBooks.nodes;
            setContent(nodes);
            setLoading(false);
        })
            .catch(err => {
            setError(err.message);
            setLoading(false);
        });
    }, [type]);
    if (loading)
        return _jsx("div", { className: "mainContent", children: "Loading..." });
    if (error)
        return _jsxs("div", { className: "mainContent errorText", children: ["Error: ", error] });
    if (!content || !Array.isArray(content) || content.length === 0)
        return _jsx("div", { className: "mainContent", children: "No results found." });
    // Render results for each type
    if (type === 'courses') {
        return (_jsxs("div", { className: "mainContent", children: [_jsx("h2", { children: "Courses" }), _jsx("ul", { children: content.map((c) => {
                        var _a, _b;
                        return (_jsxs("li", { style: { marginBottom: 24 }, children: [_jsx("h3", { children: c.title }), ((_b = (_a = c.featuredImage) === null || _a === void 0 ? void 0 : _a.node) === null || _b === void 0 ? void 0 : _b.sourceUrl) && (_jsx("img", { src: c.featuredImage.node.sourceUrl, alt: c.title, className: "featuredImageSmall" })), _jsx("div", { dangerouslySetInnerHTML: { __html: c.content } })] }, c.id));
                    }) })] }));
    }
    if (type === 'topics') {
        return (_jsxs("div", { className: "mainContent", children: [_jsx("h2", { children: "Topics" }), _jsx("ul", { children: content.map((t) => (_jsx("li", { children: t.title }, t.id))) })] }));
    }
    if (type === 'pathways') {
        return (_jsxs("div", { className: "mainContent", children: [_jsx("h2", { children: "Pathways" }), _jsx("ul", { children: content.map((p) => (_jsx("li", { children: p.title }, p.id))) })] }));
    }
    if (type === 'resources') {
        return (_jsxs("div", { className: "mainContent", children: [_jsx("h2", { children: "Resources (eBooks)" }), _jsx("ul", { children: content.map((r) => (_jsx("li", { children: r.title }, r.id))) })] }));
    }
    return _jsx("div", { className: "mainContent", children: "Unknown content type." });
};
export default ContentRouter;
