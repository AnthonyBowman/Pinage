import React, { useState, useEffect } from 'react';
import { Plus, RefreshCw, Upload, MoreVertical, Film, Image, FileText, Clock, PlayCircle } from 'lucide-react';
import { assetsApi } from '../services/assetsApi';
import { Asset } from '../types/assets';
import UploadModal from './UploadModal';  // Adjust the path based on your file structure
import PreviewModal from './PreviewModal';  // Adjust the import path as needed

const Assets: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const handlePreviewClick = (asset: Asset) => {
    setSelectedAsset(asset);
    setShowPreviewModal(true);
  };

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const data = await assetsApi.getAllAssets();
      setAssets(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch assets');
      console.error('Error fetching assets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const formatFileSize = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return 'N/A';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getAssetIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'video':
        return <Film className="w-8 h-8 text-blue-500" />;
      case 'image':
        return <Image className="w-8 h-8 text-green-500" />;
      default:
        return <FileText className="w-8 h-8 text-gray-500" />;
    }
  };

  const filteredAssets = filter === 'all' 
    ? assets 
    : assets.filter(asset => asset.fileType.toLowerCase() === filter);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Assets</h1>
          <p className="text-gray-600">Manage your media assets</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchAssets}
            className="flex items-center px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <Upload className="w-4 h-4 mr-2" />
            Upload Asset
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'all' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('video')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'video' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Videos
          </button>
          <button
            onClick={() => setFilter('image')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'image' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Images
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 mb-6 text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            Loading assets...
          </div>
        ) : filteredAssets.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No assets found
          </div>
        ) : (
          filteredAssets.map((asset) => (
            <div key={asset.assetId} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-4">
                    {getAssetIcon(asset.fileType)}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 truncate" style={{ maxWidth: '200px' }}>
                        {asset.fileName}
                      </h3>
                      <p className="text-sm text-gray-500">{asset.fileFormat.toUpperCase()}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-500">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Duration: {formatDuration(asset.duration)}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-500">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    <span>File size: {formatFileSize(asset.fileSize)}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Uploaded {new Date(asset.uploadDateTime).toLocaleDateString()}
                    </span>
                    <button 
                      onClick={() => handlePreviewClick(asset)}
                      className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <UploadModal 
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUploadComplete={fetchAssets}
      />
      
      {selectedAsset && (
        <PreviewModal
          isOpen={showPreviewModal}
          onClose={() => setShowPreviewModal(false)}
          asset={selectedAsset}
        />
      )}

    </div>
  );
};

export default Assets;