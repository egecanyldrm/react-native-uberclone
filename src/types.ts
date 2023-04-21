export interface IRegion {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
}

export interface ILocation {
    geometry: IGeometry;
    name: string;
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

interface JourneyDistance {
    text: string;
    value: number;
}
interface JourneyDuration {
    text: string;
    value: number
}

export interface IJourneyInfo {
    distance: JourneyDistance;
    duration: JourneyDuration;
}