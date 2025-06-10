"use client";

import { useState, useEffect } from "react";
import { Download, Github, RefreshCw, Package } from "lucide-react";
import Image from "next/image";

interface Release {
  tag_name: string;
  name: string;
  published_at: string;
  body: string;
  assets: {
    name: string;
    browser_download_url: string;
    size: number;
    download_count: number;
  }[];
}

export default function Home() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const GITHUB_REPO =
    process.env.NEXT_PUBLIC_GITHUB_REPO ||
    "PaperBoardOfficial/cursor-linux-packages";

  useEffect(() => {
    fetchReleases();
  }, []);

  const fetchReleases = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/releases`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch releases");
      }
      const data = await response.json();
      setReleases(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ["Bytes", "KB", "MB", "GB"];
    if (bytes === 0) return "0 Bytes";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getLatestRelease = () => (releases.length > 0 ? releases[0] : null);
  const latestRelease = getLatestRelease();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <Image
                  src="/cursor.jpeg"
                  alt="Cursor"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <span className="text-xl font-bold text-white tracking-wide">
                  CURSOR
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href={`https://github.com/${GITHUB_REPO}`}
                className="text-gray-300 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(120, 40, 200, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(120, 40, 200, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(120, 40, 200, 0.2) 0%, transparent 50%)
            `,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            Linux Packages for
            <br />
            <span
              className="text-white"
              style={{
                background: "linear-gradient(90deg, #60A5FA, #A78BFA, #F472B6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              The AI Code Editor
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Get Cursor with native DEB and RPM packages.
            <br />
            Automatically updated daily from official releases.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() =>
                document
                  .getElementById("downloads")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-white text-black px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2 text-lg"
            >
              <Package className="w-5 h-5" />
              <span>Download for Linux</span>
            </button>
          </div>
        </div>
      </div>

      {/* Downloads Section */}
      <div
        id="downloads"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Download Cursor</h2>
          <p className="text-xl text-gray-400">
            Choose your package format to download the latest version of Cursor
          </p>
        </div>

        {loading && (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading releases...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-8 max-w-md mx-auto">
              <p className="text-red-300 mb-4">
                Failed to load releases: {error}
              </p>
              <button
                onClick={fetchReleases}
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-white font-medium transition-colors flex items-center space-x-2 mx-auto"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {latestRelease && (
              <div className="mb-16">
                <h3 className="text-2xl font-semibold mb-8">
                  Latest Version ({latestRelease.tag_name.replace("v", "")})
                </h3>
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {latestRelease.assets.map((asset) => (
                    <div
                      key={asset.name}
                      className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                asset.name.endsWith(".deb")
                                  ? "bg-orange-500"
                                  : "bg-red-500"
                              }`}
                            ></div>
                            <h4 className="text-lg font-medium">
                              {asset.name.endsWith(".deb")
                                ? "Debian/Ubuntu"
                                : "RHEL/Fedora/CentOS"}
                            </h4>
                          </div>
                          <p className="text-gray-400 text-sm mb-1">
                            {asset.name.endsWith(".deb")
                              ? "DEB Package"
                              : "RPM Package"}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {formatFileSize(asset.size)} •{" "}
                            {asset.download_count} downloads
                          </p>
                        </div>
                        <a
                          href={asset.browser_download_url}
                          className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2 group-hover:scale-105 transform transition-transform"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {releases.length > 1 && (
              <div>
                <h3 className="text-2xl font-semibold mb-8">
                  Previous Versions
                </h3>
                <div className="space-y-4">
                  {releases.slice(1, 6).map((release) => (
                    <div
                      key={release.tag_name}
                      className="bg-gray-900 border border-gray-700 rounded-lg p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-medium">
                            {release.name}
                          </h4>
                          <p className="text-gray-400 text-sm">
                            Released on {formatDate(release.published_at)}
                          </p>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        {release.assets.map((asset) => (
                          <div
                            key={asset.name}
                            className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  asset.name.endsWith(".deb")
                                    ? "bg-orange-500"
                                    : "bg-red-500"
                                }`}
                              ></div>
                              <div>
                                <p className="text-sm font-medium">
                                  {asset.name.endsWith(".deb") ? "DEB" : "RPM"}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {formatFileSize(asset.size)}
                                </p>
                              </div>
                            </div>
                            <a
                              href={asset.browser_download_url}
                              className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-colors"
                            >
                              <Download className="w-4 h-4" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {releases.length === 0 && (
              <div className="text-center py-16">
                <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-xl text-gray-400 mb-2">
                  No releases available yet
                </p>
                <p className="text-gray-500">
                  Packages will appear here once the automation runs
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 mb-6">
            This is an unofficial packaging project. Cursor is developed by{" "}
            <a
              href="https://cursor.com"
              className="text-purple-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Anysphere Inc
            </a>
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm">
            <a
              href="https://cursor.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Official Website
            </a>
            <a
              href={`https://github.com/${GITHUB_REPO}`}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Source Code
            </a>
            <a
              href={`https://github.com/${GITHUB_REPO}/issues`}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Report Issues
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
