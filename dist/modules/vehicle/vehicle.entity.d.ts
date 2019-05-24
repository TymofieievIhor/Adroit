import { EntityBase } from '../../common/helpers/entity.base';
import { VehicleInsurance } from '../vehicle-insurance/vehicle-insurance.entity';
export declare class Vehicle extends EntityBase {
    make: string;
    model: string;
    type: string;
    year: number;
    color: string;
    license_plate: string;
    registration_expiry_date: string;
    vin: number;
    driver_id: number;
    vehicle_insurance_id: number;
    picture_url: string;
    vehicle_insurance: VehicleInsurance;
}
