import React, { useState, useEffect } from 'react';
import { Plus, MoreVertical, RefreshCw, MapPin, Phone, Mail } from 'lucide-react';
import { locationsApi } from '../services/locationsApi';
import { Location, LocationType } from '../types/locations';

const Locations: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [locationTypes, setLocationTypes] = useState<LocationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [locationsData, typesData] = await Promise.all([
        locationsApi.getAllLocations(),
        locationsApi.getLocationTypes()
      ]);
      setLocations(locationsData);
      setLocationTypes(typesData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch locations');
      console.error('Error fetching locations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getLocationTypeName = (typeId?: number) => {
    if (!typeId) return 'Unassigned';
    const locationType = locationTypes.find(type => type.locationTypeId === typeId);
    return locationType?.typeName || 'Unknown';
  };

  const getDeviceStatusSummary = (location: Location) => {
    if (!location.devices?.length) return { total: 0, online: 0 };
    
    const online = location.devices.filter(device => 
      device.status.toLowerCase() === 'online'
    ).length;
    
    return {
      total: location.devices.length,
      online
    };
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Locations</h1>
          <p className="text-gray-600">Manage your display locations and assignments</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchData}
            className="flex items-center px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Location
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 mb-6 text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            Loading locations...
          </div>
        ) : locations.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No locations found
          </div>
        ) : (
          locations.map((location) => {
            const deviceStats = getDeviceStatusSummary(location);
            return (
              <div key={location.locationId} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{location.locationName}</h3>
                      <p className="text-sm text-gray-500">{getLocationTypeName(location.locationTypeId)}</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-start text-sm">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 mr-2" />
                      <div>
                        <p className="text-gray-600">{location.address}</p>
                        <p className="text-gray-600">{location.city}, {location.postCode}</p>
                      </div>
                    </div>

                    <div className="flex items-center text-sm">
                      <Phone className="w-4 h-4 text-gray-400 mr-2" />
                      <p className="text-gray-600">{location.contactPhone}</p>
                    </div>

                    <div className="flex items-center text-sm">
                      <Mail className="w-4 h-4 text-gray-400 mr-2" />
                      <p className="text-gray-600">{location.contactPerson}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Devices</span>
                      <div className="text-sm">
                        <span className="text-green-600">{deviceStats.online} online</span>
                        <span className="text-gray-400 mx-1">/</span>
                        <span className="text-gray-600">{deviceStats.total} total</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Locations;