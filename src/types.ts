export interface IRegion {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
}

export interface ILocation {
    lat: number;
    lng: number;
}
export interface IUserLocation {
    latitude: number,
    longitude: number
}
interface IGeometryLocation {
    lat: number;
    lng: number;
}
interface IGeometry {
    location: IGeometryLocation;
    viewport: object
}
export interface IOption {
    geometry: IGeometry;
    name: string;
}

