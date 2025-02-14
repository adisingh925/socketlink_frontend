import { useState } from "react";
import { FiCopy } from "react-icons/fi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeSnippet = ({ snippets }) => {
    const [activeLanguage, setActiveLanguage] = useState(Object.keys(snippets)[0]);

    const handleCopy = () => {
        navigator.clipboard.writeText(snippets[activeLanguage]);
        alert("Code copied to clipboard!");
    };

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg mb-8 border border-gray-700">
            {/* Tabs for languages */}
            {/* Tabs for languages */}
            <div className="flex overflow-x-auto space-x-4 border-b border-gray-700 px-4 py-2 scrollbar-hide">
                {Object.keys(snippets).map((lang) => (
                    <button
                        key={lang}
                        className={`text-sm font-medium px-3 py-1 whitespace-nowrap rounded ${activeLanguage === lang ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"
                            }`}
                        onClick={() => setActiveLanguage(lang)}
                    >
                        {lang}
                    </button>
                ))}
            </div>

            {/* Fixed Layout with Scroll */}
            <div className="relative" style={{ height: '300px' }}>
                {/* <button
                    onClick={handleCopy}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 mr-1"
                >
                    <FiCopy size={18} />
                </button> */}

                {/* Scrollable Area */}
                <div className="p-2 bg-gray-900 rounded-b-lg" style={{ height: '100%', overflowY: 'auto' }}>
                    <SyntaxHighlighter
                        language={activeLanguage.toLowerCase()}
                        style={oneDark}
                        customStyle={{
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            margin: 0,
                            minHeight: '100%',
                        }}
                        codeTagProps={{
                            style: { fontSize: '14px' }
                        }}
                    >
                        {snippets[activeLanguage]}
                    </SyntaxHighlighter>
                </div>
            </div>
        </div>
    );
};

export default CodeSnippet;
