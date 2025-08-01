import React, { useState } from 'react';
import axios from 'axios';
import { Globe, Hash, Loader2, Check, Copy, ExternalLink } from 'lucide-react';
import { API_BASE } from '../conf/config';

export default function CreateCounterForm() {
    const [url, setUrl] = useState('');
    const [count, setCount] = useState(0);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(
                `${API_BASE}/counters`,
                { url, initialCounter: Number(count) }
            );
            setResult(data);
        } catch (error) {
            console.error('Failed to create badge:', error);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (!result || !result.badgeMarkdown) return;
        // Extract only the badge URL (first parentheses)
        const match = result.badgeMarkdown.match(/\((.*?)\)/);
        const badgeUrl = match?.[1] || result.badgeMarkdown;
        navigator.clipboard.writeText(badgeUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const resetForm = () => {
        setUrl('');
        setCount(0);
        setResult(null);
    };

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 min-h-screen">
            <div className="mx-auto max-w-2xl">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="inline-flex justify-center items-center bg-indigo-600 mb-4 rounded-full w-16 h-16">
                        <Hash className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="mb-2 font-bold text-gray-900 text-3xl">Counter Badge Creator</h1>
                    <p className="text-gray-600">Create beautiful counter badges for your GitHub repositories</p>
                </div>

                {!result ? (
                    <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-xl p-8 rounded-2xl">
                        <div>
                            <label className="flex items-center mb-3 font-semibold text-gray-700 text-sm">
                                <Globe className="mr-2 w-4 h-4 text-indigo-500" />
                                Target URL
                            </label>
                            <div className="relative">
                                <input
                                    type="url"
                                    required
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="https://github.com/username/repository"
                                    className="px-4 py-3 pl-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl focus:ring-0 w-full text-gray-700 transition-colors"
                                />
                                <Globe className="top-1/2 left-4 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
                            </div>
                        </div>

                        <div>
                            <label className="flex items-center mb-3 font-semibold text-gray-700 text-sm">
                                <Hash className="mr-2 w-4 h-4 text-indigo-500" />
                                Initial Counter Value
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={count}
                                    min={0}
                                    onChange={(e) => setCount(e.target.value)}
                                    placeholder="0"
                                    className="px-4 py-3 pl-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl focus:ring-0 w-full text-gray-700 transition-colors"
                                />
                                <Hash className="top-1/2 left-4 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !url.trim()}
                            className="flex justify-center items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 shadow-lg hover:shadow-xl px-6 py-4 rounded-xl w-full font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Creating Badge...</span>
                                </>
                            ) : (
                                <>
                                    <Check className="w-5 h-5" />
                                    <span>Create Badge</span>
                                </>
                            )}
                        </button>
                    </form>
                ) : (
                    <div className="bg-white shadow-xl p-8 rounded-2xl">
                        <div className="mb-6 text-center">
                            <div className="inline-flex justify-center items-center bg-green-100 mb-3 rounded-full w-12 h-12">
                                <Check className="w-6 h-6 text-green-600" />
                            </div>
                            <h2 className="mb-1 font-bold text-gray-900 text-2xl">Badge Created Successfully!</h2>
                            <p className="text-gray-600">Your counter badge is ready to use</p>
                        </div>

                        <div className="bg-gray-50 mb-6 p-6 rounded-xl">
                            <h3 className="mb-3 font-semibold text-gray-700 text-sm">Preview</h3>
                            <div className="flex justify-center">
                                <img
                                    src={`${API_BASE}/counters/${result.slug}/badge`}
                                    alt="Counter badge preview"
                                    className="shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="bg-gray-50 mb-6 p-6 rounded-xl">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-semibold text-gray-700 text-sm">Markdown Code</h3>
                                <button
                                    onClick={copyToClipboard}
                                    className="inline-flex items-center space-x-1 font-medium text-indigo-600 hover:text-indigo-700 text-sm"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            <span>Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4" />
                                            <span>Copy URL</span>
                                        </>
                                    )}
                                </button>
                            </div>
                            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto font-mono text-green-400 text-sm">
                                {result.badgeMarkdown.match(/\((.*?)\)/)?.[1] || result.badgeMarkdown}
                            </pre>
                        </div>

                        <div className="flex sm:flex-row flex-col gap-3">
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold text-white transition-colors"
                            >
                                Create Another Badge
                            </button>
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-1 justify-center items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-xl font-semibold text-gray-700 transition-colors"
                            >
                                <ExternalLink className="w-4 h-4" />
                                <span>Visit Target URL</span>
                            </a>
                        </div>
                    </div>
                )}

                <div className="mt-8 text-gray-500 text-sm text-center">
                    <p>Copy the badge URL and paste it into your README.md file or anywhere you like</p>
                </div>
            </div>
        </div>
    );
}