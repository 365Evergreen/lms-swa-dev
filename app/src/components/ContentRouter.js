var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { useParams } from 'react-router-dom';
// Import your content fetchers and layouts
// import { fetchWordPressPage, fetchEbook } from '../utils/wordpressMenu';
// import EbookPage from './EbookPage';
// import StandardPage from './StandardPage';
const ContentRouter = () => {
    const { type, slug } = useParams();
    const [loading, setLoading] = React.useState(true);
    const [content, setContent] = React.useState(null);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
        setLoading(true);
        setError(null);
        // Example: switch by type
        function fetchContent() {
            return __awaiter(this, void 0, void 0, function* () {
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
                }
                catch (e) {
                    setError(e.message);
                }
                finally {
                    setLoading(false);
                }
            });
        }
        fetchContent();
    }, [type, slug]);
    if (loading)
        return _jsx("div", { children: "Loading..." });
    if (error)
        return _jsxs("div", { children: ["Error: ", error] });
    if (!content)
        return _jsx("div", { children: "Not found" });
    // Example: render by type
    switch (type) {
        case 'ebook':
            // return <EbookPage data={content} />;
            return _jsxs("div", { children: ["Ebook UI for ", slug] });
        case 'page':
        default:
            // return <StandardPage data={content} />;
            return _jsxs("div", { children: ["Standard Page UI for ", slug] });
    }
};
export default ContentRouter;
