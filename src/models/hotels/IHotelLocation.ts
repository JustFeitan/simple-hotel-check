import {ILocationGeo} from "./ILocationGeo";

export interface IHotelLocation {
    country: string;
    geo: ILocationGeo;
    name: string;
    state: null;
}
