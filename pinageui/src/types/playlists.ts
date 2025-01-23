export interface Asset {
  assetId: number;
  fileName: string;
  fileType: string;
  duration?: number;
}

export interface PlaylistItem {
  playlistItemId: number;
  playlistId?: number;
  assetId?: number;
  displayOrder: number;
  displayDuration?: number;
  startDateTime?: Date;
  endDateTime?: Date;
  active?: boolean;
  asset?: Asset;
}

export interface Playlist {
  playlistId: number;
  playlistName: string;
  createdBy: number;
  createdDateTime: Date;
  active?: boolean;
  playlistItems?: PlaylistItem[];
  deviceCount?: number;
}