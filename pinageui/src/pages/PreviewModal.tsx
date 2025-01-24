import React from 'react';
import { X } from 'lucide-react';
import { Asset } from '../types/assets';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: Asset;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, asset }) => {
  if (!isOpen) return null;

  const formatFileSize = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  const formatDate = (date: Date | string) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const renderPreview = () => {
    // Debug the URL construction
    console.log('Content URL:', asset.contentUrl);
    console.log('File type:', asset.fileType);
    // Use the same port as your API
    const baseUrl = 'https://localhost:7069';
    const url = asset.contentUrl.startsWith('http') 
      ? asset.contentUrl 
      : `${baseUrl}${asset.contentUrl}`;

    console.log('Trying to load image from:', url);
    
    switch (asset.fileType.toLowerCase()) {
      case 'image':
        return (
          <div className="flex justify-center items-center w-full h-full">
            <img
              src={url}
              alt={asset.fileName}
              className="max-w-full max-h-[60vh] object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = ''; // You could set a placeholder image here
                console.error('Error loading image:', url);
              }}
            />
          </div>
        );
      case 'video':
        return (
          <div className="flex justify-center items-center w-full h-full">
            <video
              controls
              className="max-w-full max-h-[60vh]"
              autoPlay
            >
              <source src={url} type={`video/${asset.fileFormat}`} />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      default:
        return (
          <div className="text-gray-500 text-center p-8">
            Preview not available for this file type
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800 truncate max-w-2xl">
            {asset.fileName}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            type="button"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="bg-gray-50 p-4">
          {renderPreview()}
        </div>
        
        <div className="p-4 border-t">
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p><span className="font-medium">Type:</span> {asset.fileType}</p>
              <p><span className="font-medium">Format:</span> {asset.fileFormat.toUpperCase()}</p>
            </div>
            <div>
              <p><span className="font-medium">Size:</span> {formatFileSize(asset.fileSize)}</p>
              <p><span className="font-medium">Uploaded:</span> {formatDate(asset.uploadDateTime)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;