export interface DeviceSchedule {
  scheduleId: number;
  deviceId?: number;
  playlistId?: number;
  startTime?: string;
  endTime?: string;
  daysOfWeek: string;
  priority: number;
  active?: boolean;
  device?: {
    deviceName: string;
    status: string;
  };
  playlist?: {
    playlistName: string;
  };
}

export type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';