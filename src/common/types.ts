export interface ILatLon {
  lat: number;
  lon: number;
}

export interface IRecordedPoint {
  timestamp: Date;
  latlon: ILatLon;
}

export class LatLon implements ILatLon {
  lat;
  lon;
}

export class RecordedPoint implements IRecordedPoint {
  timestamp;
  latlon;
}
