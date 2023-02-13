export interface IRegion {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
}
export interface ILocation {
    country: string,
    is_capital: boolean,
    latitude: number,
    longitude: number,
    name: string,
    population: number
}
export interface IConfigSheet {
    // index: number,
    // setIndex: (props:number) => void
    origin: ILocation | undefined,
    destination: ILocation | undefined,
    setOrigin: (prop: ILocation) => void,
    setDestination: (prop: ILocation) => void
}

export interface IUserLocation {
    latitude: number,
    longitude: number
}