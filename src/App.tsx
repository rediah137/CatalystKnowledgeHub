import React, { useState } from 'react';
import { Search, FileText, Play, ExternalLink, Loader2, Download, MessageSquare, Filter, BookOpen, Film, Globe } from 'lucide-react';

type SearchType = 'both' | 'documents' | 'media';
type SearchMode = 'search' | 'ask';

interface Result {
  id: string;
  type: 'document' | 'media';
  title: string;
  fileType?: string;
  mediaType?: 'image' | 'video';
  preview: string;
  link: string;
  thumbnail?: string;
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('documents');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [searchMode, setSearchMode] = useState<SearchMode>('search');
  const [question, setQuestion] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setSelectedDocument(null);
    
    setTimeout(() => {
      const documentResults = [
        {
          id: '1',
          type: 'document',
          title: 'Impact Assessment Report 2023',
          fileType: 'PDF',
          preview: 'Comprehensive analysis of our microfinance program reaching 50,000 women entrepreneurs across rural India.',
          link: '#'
        },
        {
          id: '2',
          type: 'document',
          title: 'Sustainable Agriculture Program',
          fileType: 'PPTX',
          preview: 'Overview of regenerative farming practices implemented across 100 acres in Maharashtra.',
          link: '#'
        },
        {
          id: '3',
          type: 'document',
          title: 'Education Access Initiative',
          fileType: 'DOCX',
          preview: 'Evaluation of digital literacy program reaching 10,000 students in rural communities.',
          link: '#'
        },
        {
          id: '4',
          type: 'document',
          title: 'Healthcare Outreach Summary',
          fileType: 'PDF',
          preview: 'Analysis of mobile healthcare clinics serving 25,000 patients in remote areas.',
          link: '#'
        }
      ];

      const mediaResults = [
        {
          id: '5',
          type: 'media',
          mediaType: 'image',
          title: 'Indian Farmer in Field',
          preview: 'Farmer working in a lush green paddy field using sustainable methods',
          link: '#',
          thumbnail: 'https://images.unsplash.com/photo-1687201364205-6ec23f194c9d?w=800&auto=format&fit=crop&q=60'
        },
        {
          id: '6',
          type: 'media',
          mediaType: 'image',
          title: 'Rural Community Gathering',
          preview: 'Community members discussing local development initiatives',
          link: '#',
          thumbnail: 'https://images.unsplash.com/photo-1541421940766-104c9efc2478?w=800&auto=format&fit=crop&q=60'
        },
        {
          id: '7',
          type: 'media',
          mediaType: 'video',
          title: 'Impact Stories: Rural Education',
          preview: 'Documentary on digital literacy impact in villages',
          link: '#',
          thumbnail: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=60'
        },
        {
          id: '8',
          type: 'media',
          mediaType: 'video',
          title: 'Healthcare Initiative Launch',
          preview: 'Coverage of mobile clinic launch event',
          link: '#',
          thumbnail: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&auto=format&fit=crop&q=60'
        }
      ];

      let filteredResults = [];
      if (searchType === 'documents') {
        filteredResults = documentResults;
      } else if (searchType === 'media') {
        filteredResults = mediaResults;
      } else {
        filteredResults = [...documentResults, ...mediaResults];
      }

      setResults(filteredResults);
      setIsSearching(false);
    }, 1000);
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    setQuestion('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Platform Header */}
      <div className="bg-cms-teal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Catalyst Knowledge Hub</h1>
          <p className="text-lg text-white/90">Discover and explore our comprehensive repository of documents and media from across the Catalyst Group's global initiatives</p>
        </div>
      </div>

      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Search Type Buttons */}
          <div className="flex justify-center mb-6 space-x-4">
            <button
              onClick={() => setSearchType('documents')}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
                searchType === 'documents'
                  ? 'bg-cms-purple text-white shadow-lg'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              Search Documents
            </button>
            <button
              onClick={() => setSearchType('media')}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
                searchType === 'media'
                  ? 'bg-cms-purple text-white shadow-lg'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Film className="w-5 h-5" />
              Search Media
            </button>
            <button
              onClick={() => setSearchType('both')}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
                searchType === 'both'
                  ? 'bg-cms-purple text-white shadow-lg'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Globe className="w-5 h-5" />
              Search It All
            </button>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search knowledge base..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cms-purple focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-cms-purple text-white rounded-lg hover:bg-cms-purple/90 transition-colors flex items-center gap-2 shadow-md"
              disabled={isSearching}
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Search
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`grid gap-8 ${searchType === 'both' ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {/* Documents Section */}
          {(searchType === 'documents' || searchType === 'both') && (
            <div className={`space-y-6 ${searchType === 'both' ? 'border-r pr-8' : ''}`}>
              {searchType === 'both' && <h2 className="text-2xl font-semibold text-cms-purple mb-6">Documents</h2>}
              {results.filter(r => r.type === 'document').map((result) => (
                <div
                  key={result.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-cms-purple/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-7 h-7 text-cms-purple" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{result.title}</h3>
                          <span className="inline-block px-2 py-1 text-xs font-medium text-cms-purple bg-cms-purple/10 rounded-full mt-1">
                            {result.fileType}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              setSelectedDocument(result.id);
                              setSearchMode('ask');
                            }}
                            className="text-cms-purple hover:text-cms-purple/80 flex items-center gap-1 text-sm font-medium"
                          >
                            <MessageSquare className="w-4 h-4" />
                            Ask
                          </button>
                          <a
                            href={result.link}
                            className="text-cms-purple hover:text-cms-purple/80 flex items-center gap-1 text-sm font-medium"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Open
                          </a>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <p className="text-gray-600 text-sm leading-relaxed">{result.preview}</p>
                      </div>
                      {selectedDocument === result.id && searchMode === 'ask' && (
                        <form onSubmit={handleAskQuestion} className="mt-4">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={question}
                              onChange={(e) => setQuestion(e.target.value)}
                              placeholder="Ask a question about this document..."
                              className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-cms-purple focus:border-transparent outline-none"
                            />
                            <button
                              type="submit"
                              className="px-4 py-2 bg-cms-purple text-white rounded-md hover:bg-cms-purple/90 transition-colors"
                            >
                              Ask
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Media Section */}
          {(searchType === 'media' || searchType === 'both') && (
            <div className="space-y-6">
              {searchType === 'both' && <h2 className="text-2xl font-semibold text-cms-purple mb-6">Media</h2>}
              <div className="grid grid-cols-2 gap-6">
                {results.filter(r => r.type === 'media').map((result) => (
                  <div
                    key={result.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-video relative">
                      <img
                        src={result.thumbnail}
                        alt={result.title}
                        className="w-full h-full object-cover"
                      />
                      {result.mediaType === 'video' && (
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-1">{result.title}</h3>
                      <p className="text-sm text-gray-600">{result.preview}</p>
                      <div className="mt-3 flex justify-end">
                        <a
                          href={result.link}
                          className="text-cms-purple hover:text-cms-purple/80 flex items-center gap-1 text-sm font-medium"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;