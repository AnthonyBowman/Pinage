export interface Asset {
  assetId: number;
  fileName: string;
  fileType: string;
  fileFormat: string;
  fileSize: number;
  fileHash: string;
  uploadedBy: number;
  uploadDateTime: Date;
  duration?: number;
  active?: boolean;
  contentUrl: string;
}

export interface AssetStats {
  totalPlaylists: number;
  totalViews: number;
  averageViewDuration: number;
  lastPlayed?: Date;
}