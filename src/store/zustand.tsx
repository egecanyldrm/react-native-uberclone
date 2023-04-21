import { create } from 'zustand'
import { ILocation, IRegion } from '../types';

interface StoreState {
  origin: ILocation | undefined
  destination: ILocation | undefined
  initalRegion: IRegion | undefined
  setInitalRegion: (location: IRegion) => void
  setOrigin: (location: ILocation | undefined) => void
  setDestination: (location: ILocation | undefined) => void
}

const useZustandStore = create<StoreState>()((set) => ({
  origin: undefined,
  destination: undefined,
  initalRegion: undefined,
  setInitalRegion: (location) => set(() => ({ initalRegion: location })),
  setOrigin: (location) => set(() => ({ origin: location })),
  setDestination: (location) => set(() => ({ destination: location })),
}))

export { useZustandStore }