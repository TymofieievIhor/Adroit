import { RideClientDto } from './ride-client.dto';
import { RidePlaceDto } from './ride-place.dto';
import { RideBlueprintDto } from './ride-blueprint.dto';
export declare class CreateRideRouteDto {
    clients: RideClientDto[];
    places: RidePlaceDto[];
    blueprints: RideBlueprintDto[];
}
