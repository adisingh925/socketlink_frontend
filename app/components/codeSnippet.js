import { useState } from "react";
import { FiCopy } from "react-icons/fi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeSnippet = ({ snippets }) => {
    const [activeLanguage, setActiveLanguage] = useState(Object.keys(snippets)[0]);

    const handleCopy = () => {
        const textToCopy = snippets[activeLanguage];

        if (navigator.clipboard && window.isSecureContext) {
            // Preferred method
            navigator.clipboard.writeText(textToCopy)
                .then(() => alert("Code copied to clipboard!"))
                .catch(() => fallbackCopy(textToCopy));
        } else {
            // Fallback method
            fallbackCopy(textToCopy);
        }
    };

    const fallbackCopy = (text) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.position = "fixed";
        textArea.style.top = "-1000px";
        textArea.style.left = "-1000px";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            alert(successful ? "Code copied to clipboard!" : "Failed to copy code.");
        } catch (err) {
            alert("Failed to copy code.");
        }

        document.body.removeChild(textArea);
    };

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg mb-8 border border-gray-700">
            {/* Tabs for languages */}
            <div className="flex overflow-x-auto space-x-4 border-b border-gray-700 px-4 py-2 scrollbar-hide">
                {Object.keys(snippets).map((lang) => (
                    <button
                        key={lang}
                        className={`text-sm font-medium px-3 py-1 whitespace-nowrap rounded ${activeLanguage === lang
                            ? "bg-gray-700 text-white"
                            : "text-gray-400 hover:text-white"
                            }`}
                        onClick={() => setActiveLanguage(lang)}
                    >
                        {lang}
                    </button>
                ))}
            </div>

            {/* Fixed Layout with Scroll */}
            <div className="relative">
                {/* Copy button */}
                <button
                    onClick={handleCopy}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                    title="Copy to clipboard"
                >
                    <FiCopy size={18} />
                </button>

                {/* Scrollable Area */}
                <div className="p-2 bg-gray-900 rounded-b-lg overflow-auto">
                    <SyntaxHighlighter
                        language={activeLanguage.toLowerCase()}
                        style={oneDark}
                        customStyle={{
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            margin: 0,
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
