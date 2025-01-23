export interface LocationType {
  locationTypeId: number;
  typeName: string;
  description: string;
  active?: boolean;
}

export interface Location {
  locationId: number;
  locationTypeId?: number;
  locationName: string;
  address: string;
  city: string;
  postCode: string;
  contactPerson: string;
  contactPhone: string;
  active?: boolean;
  locationType?: LocationType;
  devices?: Array<{
    deviceId: number;
    deviceName: string;
    status: string;
  }>;
}