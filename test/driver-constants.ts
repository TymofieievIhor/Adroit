
export const JEST_NEW_LOCATION_PARTNER = {
    latitude: 123,
    longitude: 32,
    street1: 'Sumska',
    street2: 'Pushkinska',
    city: 'Kyiv',
    state: 'CA',
    zipcode: 32400,
    country: 'USA',
    type: 'home',
};

export const JEST_NEW_LOCATION_DRIVER_LICENCE = {
    latitude: 133,
    longitude: 32,
    street1: 'Sumska',
    street2: 'Pushkinska',
    city: 'Kyiv',
    state: 'CA',
    zipcode: 32400,
    country: 'USA',
    type: 'home',
};

export const JEST_LOCATION_NEW_CLIENT = {
    latitude: 143,
    longitude: 32,
    street1: 'Sumska',
    street2: 'Pushkinska',
    city: 'Kyiv',
    state: 'CA',
    zipcode: 32400,
    country: 'USA',
    type: 'home',
};

export const JEST_NEW_BANK_ACCOUNT_PARTNER = {
    owner_first_name: 'Tom',
    owner_last_name: 'Riddle',
    bank_account_type: 'checking',
    account_number: '478374699811',
    routing_number: '4873627463333',
};

export const JEST_NEW_PARTNER = {
    partner: {
        name: 'Dambldor',
        tin: 2341233,
    },
    location: JEST_NEW_LOCATION_PARTNER,
    owner_account: {
        first_name: 'Harry',
        last_name: 'Potter',
        email: 'Harry2007@hogwards.com',
        phone_number: '0000000008',
        is_beta_tester: false,
    },
    bank_account: JEST_NEW_BANK_ACCOUNT_PARTNER,
    files: [],
};

export const JEST_NEW_TEST_DRIVER = {

    bank_account: {
        owner_first_name: 'John',
        owner_last_name: 'Doe',
        bank_account_type: 'checking',
        account_number: '478374699811',
        routing_number: '4873627463333',
    },
    driver: {
        partner_id: 3,
        ssn: 123123123,
        gender: 'male',
        date_of_birth: '2019-02-05T14:26:20.650Z',
        has_services_trips: false,
        is_suspended: false,
        suspended_at: '2019-02-05T14:26:20.650Z',
    },
    account: {
        first_name: 'Ron',
        last_name: 'Driver',
        email: 'Visli@taxi.com',
        phone_number: '0000000010',
        is_beta_tester: false,
    },
    driver_license: {
        driver_license: {
            number: 'KL2311',
            date_of_expiration: '2019-02-05T14:26:20.664Z',
            issued_by_state: 'NY',
            weight_in_pounds: 100,
            height_in_feet: 100,
            height_in_inches: 100,
            hair_color: 'black',
            eye_color: 'brown',
        },
        location: JEST_NEW_LOCATION_DRIVER_LICENCE,
    },
    vehicle: {
        vehicle: {
            make: 'Nissan',
            model: 'Leaf',
            type: 'Sedan',
            year: 2018,
            color: 'black',
            license_plate: 'F43K435',
            registration_expiry_date: '2019-02-05T14:26:20.655Z',
            vin: 123234345,
            picture_url: 'https://cdn.goadroit.com/example.jpg',
        },
        vehicle_insurance: {
            insurance_company_name: 'Insurance company 1',
            policy_number: 123,
            effective_date: '2019-02-05T14:26:20.658Z',
            expiration_date: '2019-02-05T14:26:20.658Z',
        },
    },
    files: [],
};

export const JEST_NEW_CLIENT = {
    client: {
        name: 'Nikitos_2019',
        phone_number: '+7456456312',
        phone_extension: '1235678901',
        client_type_id: 1,
    },
    bank_account: {
        owner_first_name: 'Die',
        owner_last_name: 'Jack',
        bank_account_type: 'checking',
        account_number: '478374699811',
        routing_number: '4873627463333',
    },
    location: JEST_LOCATION_NEW_CLIENT,
    owner_account: {
        first_name: 'Vita',
        last_name: 'Victory',
        email: 'Victory2007@hogwards.com',
        phone_number: '9999999999',
        is_beta_tester: false,
    },
    contacts: [],
    files: [],
    admins: [],
    contracts: [
        {
            contract: {
                service_start_date: '2019-02-05',
                service_end_date: '2019-02-05',
                no_show_minimum_required_wait_in_mins: 1,
                no_show_invoiced_percentage: 1,
                no_show_payout_percentage: 1,
                advance_cancel_cutoff_in_mins: 1,
                monitor_fee_invoiced_in_increments_of_hrs: 1,
                miles_included_in_invoiced_base_fee: 1,
                miles_included_in_payout_base_fee: 1,
                extra_wait_invoiced_in_increments_of_mins: 1,
                extra_wait_payout_in_increments_of_mins: 1,
            },
            pricing: {
                invoiced_additional_mile_fee: 1,
                payout_additional_mile_fee: 1,
                invoiced_base_fee: 1,
                payout_base_fee: 1,
                invoiced_minivan_fee: 1,
                payout_minivan_fee: 1,
                invoiced_large_vehicle_fee: 1,
                payout_large_vehicle_fee: 1,
                invoiced_wheelchair_vehicle_fee: 1,
                payout_wheelchair_vehicle_fee: 1,
                invoiced_camera_fee: 1,
                payout_camera_fee: 1,
                invoiced_seating_equipment_fee: 1,
                payout_seating_equipment_fee: 1,
                invoiced_waiting_time_fee: 1,
                payout_waiting_time_fee: 1,
                invoiced_monitor_fee: 1,
                payout_monitor_fee: 1,
            },
        },
    ],
};

export const JEST_NEW_RIDE = {
    clients: [
        {
            client_id: 1,
            invoice_responsibility_percentage: 100,
        },
    ],
    places: [
        {
            place_id: 1,
            passengers: [
                {
                    passenger_id: 1,
                    location_id: 1,
                },
            ],
        },
    ],
    blueprints: [
        {
            type: 'am',
            days_of_service: {
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
            },
            type_of_service: 'minivan_vehicle',
            camera_service_required: true,
            estimated_mileage: 100,
            estimated_duration_in_minutes: 200,
            map_picture_url: 'https://cdn.goadroit.com/example.jpg',
            client_adjustments: [
                {
                    client_id: 1,
                    discount_amount: 0,
                    other_service_amount: 0,
                    estimated_ride_fare: 0,
                },
            ],
            ride_map: [
                {
                    type: 'pick_up',
                    place_id: 1,
                    distance_in_miles: 100,
                    distance_in_mins: 100,
                    eta: '2019-02-11T12:31:07.855Z',
                    sta: '2019-02-11T12:31:07.855Z',
                    am_start: 'string',
                    location_id: 1,
                    waypoint_passengers: [{
                        passenger_id: 1,
                    }],
                },
                {
                    type: 'drop_off',
                    place_id: 1,
                    distance_in_miles: 100,
                    distance_in_mins: 100,
                    eta: '2019-02-11T12:31:07.855Z',
                    sta: '2019-02-11T12:31:07.855Z',
                    am_start: 'string',
                    location_id: 1,
                    waypoint_passengers: [{
                        passenger_id: 1,
                    }],
                },
            ],
        },
    ],
};

export const JEST_NEW_PLACE = {
    place: {
        name: 'Burlingame Highschool',
        time_zone_id: 1,
        phone_number: '+7123234353',
        phone_extension: '1234567890',
        default_start_time: '2019-02-11T12:31:06.824Z',
        default_end_time: '2019-02-11T12:31:06.824Z',
        default_late_start_time: '2019-02-11T12:31:06.824Z',
        default_early_end_time: '2019-02-11T12:31:06.824Z',
    },
    location: {
        latitude: 37.5798,
        longitude: -122.353,
        street1: '601 Ansel Road',
        city: 'Burlingame',
        state: 'California',
        zipcode: 94010,
        country: 'United States',
        type: 'home',
    },
};

export const JEST_NEW_PASSENGER = {
    passenger: {
        first_name: 'Bob',
        last_name: 'Nilson',
        picture_url: 'https://cdn.goadroit.com/example.jpg',
        date_of_birth: '2019-02-11T12:31:04.179Z',
        client_id: 1,
        needs_booster_seat: false,
        needs_car_seat: false,
        needs_safety_vest: false,
        needs_monitor: false,
        needs_wheelchair_assistance: false,
        instructions_note: 'instruction',
        has_been_on_trip: false,
    },
    locations: [
        {
            latitude: 37.5235,
            longitude: -122.28,
            street1: '600 El Camino Real',
            city: 'Belmont',
            state: 'California',
            zipcode: 94002,
            country: 'United States',
            type: 'business',
        },
    ],
};

export const JEST_BLUEPRINT_ASSIGNMENT = {
    service_start_date: '2019-02-11',
    service_end_date: '2019-02-20',
    recurring_days_drivers: [
        {
            day: 'monday',
            driver_id: 1,
            add_pay: 100,
            deduct_pay: 100,
            estimated_driver_payout: 1000,
        },
        {
            day: 'tuesday',
            driver_id: 1,
            add_pay: 100,
            deduct_pay: 100,
            estimated_driver_payout: 1000,
        },
        {
            day: 'wednesday',
            driver_id: 1,
            add_pay: 100,
            deduct_pay: 100,
            estimated_driver_payout: 1000,
        },
        {
            day: 'thursday',
            driver_id: 1,
            add_pay: 100,
            deduct_pay: 100,
            estimated_driver_payout: 1000,
        },
        {
            day: 'friday',
            driver_id: 1,
            add_pay: 100,
            deduct_pay: 100,
            estimated_driver_payout: 1000,
        },
    ],
};

export const JEST_DRIVER_SIGN_IN = {
    login: 'Visli@taxi.com',
    password: 'ChangeMe!',
    api_client_id: 2,
    firebase_token: 'firebase_token',
};
