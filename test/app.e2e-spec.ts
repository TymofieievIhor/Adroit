import { TypedEnv } from '../src/common/env/constant';
import { localVariables } from '../src/common/env/local-variables';

{
  (Object as any).assign(TypedEnv, localVariables);
}
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {
  JEST_DEFAULT_ADMIN_SIGN_IN,
  JEST_NEW_TEST_ADMIN,
  JEST_TEST_ADMIN_SIGN_IN, JEST_TEST_ADMIN_UPDATE, JEST_TEST_ADMIN_UPDATE_BY_ID, JEST_TEST_ADMIN_UPDATE_PASSWORD,
} from './../test/admin-body-constans';
import {
    JEST_BLUEPRINT_ASSIGNMENT, JEST_DRIVER_SIGN_IN,
    JEST_LOCATION_NEW_CLIENT,
    JEST_NEW_CLIENT,
    JEST_NEW_LOCATION_DRIVER_LICENCE,
    JEST_NEW_LOCATION_PARTNER,
    JEST_NEW_PARTNER, JEST_NEW_PASSENGER, JEST_NEW_PLACE, JEST_NEW_RIDE,
    JEST_NEW_TEST_DRIVER
} from './driver-constants';
import * as applicate from './../test/TestApplicate';
import { JEST_PAGINATION } from './constants';
import * as jwt from 'jsonwebtoken';

describe('Test running', () => {

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        applicate.setApp(moduleFixture.createNestApplication());
        await applicate.getApp().init();
    });

    it('Test running server', async (done) => {
        const response = await request(applicate.getApp().getHttpServer())
            .get('/');
        expect(response.status).toEqual(200);
        done();
    });
});

describe('Test admin application', () => {

let admin;

test('sign in default admin', async (done) => {
    const response = await request(applicate.getApp().getHttpServer())
        .post('/auth/sign-in')
        .send(JEST_DEFAULT_ADMIN_SIGN_IN);
    expect(response.status).toEqual(201);
    applicate.setAuth(response.body);
    done();
  });

test('create new admin for test', async (done) => {
    const response = await request(applicate.getApp().getHttpServer())
        .post('/private/account')
        .set('account-id', applicate.getAuthId().toString())
        .set('token', applicate.getAuthToken())
        .send(JEST_NEW_TEST_ADMIN);
    expect(response.status).toEqual(201);
    done();
  });

test('sign in jest admin', async (done) => {
    const response = await request(applicate.getApp().getHttpServer())
        .post('/auth/sign-in')
        .send(JEST_TEST_ADMIN_SIGN_IN);
    expect(response.status).toEqual(201);
    applicate.setAuth(response.body);
    done();
  });

test('update jest admin account', async (done) => {
    const response = await request(applicate.getApp().getHttpServer())
        .patch('/private/account')
        .set('account-id', applicate.getAuthId().toString())
        .set('token', applicate.getAuthToken())
        .send(JEST_TEST_ADMIN_UPDATE);
    expect(response.status).toEqual(200);
    admin = response.body;
    done();
  });

test('find all account', async (done) => {
    const response = await request(applicate.getApp().getHttpServer())
        .get(`/private/account${JEST_PAGINATION}`)
        .set('account-id', applicate.getAuthId().toString())
        .set('token', applicate.getAuthToken());
    expect(response.status).toEqual(200);
    done();
  });

test('update jest admin password', async (done) => {
    const response = await request(applicate.getApp().getHttpServer())
        .patch('/private/account/update-my-password')
        .set('account-id', applicate.getAuthId().toString())
        .set('token', applicate.getAuthToken())
        .send(JEST_TEST_ADMIN_UPDATE_PASSWORD);
    expect(response.status).toEqual(200);
    done();
  });

test('update jest admin by id', async (done) => {
    const response = await request(applicate.getApp().getHttpServer())
        .patch(`/private/account/${admin.id}`)
        .set('account-id', applicate.getAuthId().toString())
        .set('token', applicate.getAuthToken())
        .send(JEST_TEST_ADMIN_UPDATE_BY_ID);
    expect(response.status).toEqual(200);
    admin = response.body;
    done();
  });

test('get jest admin account by id', async (done) => {
    const response = await request(applicate.getApp().getHttpServer())
        .get(`/private/account/${admin.id}`)
        .set('account-id', applicate.getAuthId().toString())
        .set('token', applicate.getAuthToken());
    expect(response.status).toEqual(200);
    done();
  });

test('get jest admin account', async (done) => {
    const response = await request(applicate.getApp().getHttpServer())
        .get(`/private/account/me`)
        .set('account-id', applicate.getAuthId().toString())
        .set('token', applicate.getAuthToken());
    expect(response.status).toEqual(200);
    done();
  });

});

describe('Create driver end points', () => {
    const driver = JEST_NEW_TEST_DRIVER;

    test('create location for partner', async (done) => {
        const response = await request(applicate.getApp().getHttpServer())
            .post('/private/location')
            .set('account-id', applicate.getAuthId().toString())
            .set('token', applicate.getAuthToken())
            .send(JEST_NEW_LOCATION_PARTNER);
        expect(response.status).toEqual(201);
        done();
    });

    test('create location for driver licence', async (done) => {
        const response = await request(applicate.getApp().getHttpServer())
            .post('/private/location')
            .set('account-id', applicate.getAuthId().toString())
            .set('token', applicate.getAuthToken())
            .send(JEST_NEW_LOCATION_DRIVER_LICENCE);
        expect(response.status).toEqual(201);
        done();
    });

    test('create location for client', async (done) => {
        const response = await request(applicate.getApp().getHttpServer())
            .post('/private/location')
            .set('account-id', applicate.getAuthId().toString())
            .set('token', applicate.getAuthToken())
            .send(JEST_LOCATION_NEW_CLIENT);
        expect(response.status).toEqual(201);
        done();
    });

    test('create partner', async (done) => {
        const response = await request(applicate.getApp().getHttpServer())
            .post('/private/partners')
            .set('account-id', applicate.getAuthId().toString())
            .set('token', applicate.getAuthToken())
            .send(JEST_NEW_PARTNER);
        expect(response.status).toEqual(201);
        driver.driver.partner_id = response.body.id;
        done();
    });

    test('create driver', async (done) => {
    const response = await request(applicate.getApp().getHttpServer())
        .post('/private/drivers')
        .set('account-id', applicate.getAuthId().toString())
        .set('token', applicate.getAuthToken())
        .send(driver);
    expect(response.status).toEqual(201);
    done();
  });
});
describe('Create ride', () => {
    const ride = JEST_NEW_RIDE;
    let route;
    let driverId;
    let driverAccID;
    let driverToken;
    const date = new Date();
    const datePattern = {
        provided_date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-',
    };
    let route2;
    let route3;

    test('create client', async (done) => {
        const response = await request(applicate.getApp().getHttpServer())
            .post('/private/clients')
            .set('account-id', applicate.getAuthId().toString())
            .set('token', applicate.getAuthToken())
            .send(JEST_NEW_CLIENT);
        expect(response.status).toEqual(201);
        ride.clients[0].client_id = response.body.id;
        ride.blueprints[0].client_adjustments[0].client_id = response.body.id;
        done();
    });

    test('create place', async (done) => {
        const response = await request(applicate.getApp().getHttpServer())
            .post('/private/place')
            .set('account-id', applicate.getAuthId().toString())
            .set('token', applicate.getAuthToken())
            .send(JEST_NEW_PLACE);
        expect(response.status).toEqual(201);
        ride.places[0].place_id = response.body.id;
        ride.blueprints[0].ride_map[0].place_id = response.body.id;
        ride.blueprints[0].ride_map[1].place_id = response.body.id;
        ride.blueprints[0].ride_map[1].location_id = response.body.location.id;
        done();
    });

    test('create passenger', async (done) => {
        let response = await request(applicate.getApp().getHttpServer())
            .post('/private/passenger')
            .set('account-id', applicate.getAuthId().toString())
            .set('token', applicate.getAuthToken())
            .send(JEST_NEW_PASSENGER);
        expect(response.status).toEqual(201);
        ride.places[0].passengers[0].passenger_id = response.body.id;
        ride.blueprints[0].ride_map[0].waypoint_passengers[0] = {passenger_id: response.body.id};
        ride.blueprints[0].ride_map[1].waypoint_passengers[0] = {passenger_id: response.body.id};
        response = await request(applicate.getApp().getHttpServer())
            .get(`/private/passenger/${ride.places[0].passengers[0].passenger_id}`)
            .set('account-id', applicate.getAuthId().toString())
            .set('token', applicate.getAuthToken());
        expect(response.status).toEqual(200);
        ride.places[0].passengers[0].location_id = response.body.passengerAddressLink[0].location.id;
        ride.blueprints[0].ride_map[0].location_id = response.body.passengerAddressLink[0].location.id;
        done();
    });

    test('create ride', async (done) => {
        let response = await request(applicate.getApp().getHttpServer())
            .post('/private/ride-management')
            .set('account-id', applicate.getAuthId().toString())
            .set('token', applicate.getAuthToken())
            .send(ride);
        expect(response.status).toEqual(201);
        route = response.body;
        ride.blueprints[0].type = 'pm';
        response = await request(applicate.getApp().getHttpServer())
            .post('/private/ride-management')
            .set('account-id', applicate.getAuthId().toString())
            .set('token', applicate.getAuthToken())
            .send(ride);
        expect(response.status).toEqual(201);
        route2 = response.body;
        ride.blueprints[0].type = 'am_late_start';
        response = await request(applicate.getApp().getHttpServer())
            .post('/private/ride-management')
            .set('account-id', applicate.getAuthId().toString())
            .set('token', applicate.getAuthToken())
            .send(ride);
        expect(response.status).toEqual(201);
        route3 = response.body;
        done();
    });

    test('get driver id and auth info', async (done) => {
        const response = await request(applicate.getApp().getHttpServer())
            .post('/auth/sign-in')
            .send(JEST_DRIVER_SIGN_IN);
        expect(response.status).toEqual(201);
        const tokenPayload: any = jwt.decode(response.body.token);
        driverId = tokenPayload.driver.id;
        driverAccID = response.body.account_id;
        driverToken = response.body.token;
        done();
    });

    test('assignment driver', async (done) => {
        let response = await request(applicate.getApp().getHttpServer())
            .get(`/private/ride-management/route/${route.id}`)
            .set('account-id', applicate.getAuthId().toString())
            .set('token', applicate.getAuthToken());
        expect(response.status).toEqual(200);
        let blueprint = response.body.blueprints[0].id;
        JEST_BLUEPRINT_ASSIGNMENT.recurring_days_drivers.map(
            (day) => {
                day.driver_id = driverId;
            });
        JEST_BLUEPRINT_ASSIGNMENT.service_start_date = datePattern.provided_date + '1';
        JEST_BLUEPRINT_ASSIGNMENT.service_end_date = datePattern.provided_date + '28';
        response = await request(applicate.getApp().getHttpServer())
            .post(`/private/ride-management/routes/${route.id}/blueprints/${blueprint}/assignment`)
            .set('account-id', applicate.getAuthId().toString())
            .set('token', applicate.getAuthToken())
            .send(JEST_BLUEPRINT_ASSIGNMENT);
        expect(response.status).toEqual(201);

        response = await request(applicate.getApp().getHttpServer())
            .get(`/private/ride-management/route/${route.id}`)
            .set('account-id', applicate.getAuthId().toString())
            .set('token', applicate.getAuthToken());
        expect(response.status).toEqual(200);
        blueprint = response.body.blueprints[0].id;
        JEST_BLUEPRINT_ASSIGNMENT.recurring_days_drivers.map(
            (day) => {
                day.driver_id = driverId;
            });
        response = await request(applicate.getApp().getHttpServer())
            .get(`/private/ride-management/route/${route2.id}`)
            .set('account-id', applicate.getAuthId().toString())
            .set('token', applicate.getAuthToken());
        expect(response.status).toEqual(200);
        blueprint = response.body.blueprints[0].id;
        response = await request(applicate.getApp().getHttpServer())
            .post(`/private/ride-management/routes/${route2.id}/blueprints/${blueprint}/assignment`)
            .set('account-id', applicate.getAuthId().toString())
            .set('token', applicate.getAuthToken())
            .send(JEST_BLUEPRINT_ASSIGNMENT);
        expect(response.status).toEqual(201);

        response = await request(applicate.getApp().getHttpServer())
            .get(`/private/ride-management/route/${route.id}`)
            .set('account-id', applicate.getAuthId().toString())
            .set('token', applicate.getAuthToken());
        expect(response.status).toEqual(200);
        blueprint = response.body.blueprints[0].id;
        JEST_BLUEPRINT_ASSIGNMENT.recurring_days_drivers.map(
            (day) => {
                day.driver_id = driverId;
            });
        response = await request(applicate.getApp().getHttpServer())
            .get(`/private/ride-management/route/${route3.id}`)
            .set('account-id', applicate.getAuthId().toString())
            .set('token', applicate.getAuthToken());
        expect(response.status).toEqual(200);
        blueprint = response.body.blueprints[0].id;
        response = await request(applicate.getApp().getHttpServer())
            .post(`/private/ride-management/routes/${route3.id}/blueprints/${blueprint}/assignment`)
            .set('account-id', applicate.getAuthId().toString())
            .set('token', applicate.getAuthToken())
            .send(JEST_BLUEPRINT_ASSIGNMENT);
        expect(response.status).toEqual(201);
        done();
    });

    test('create trip on this and next day', async (done) => {
        let response = await request(applicate.getApp().getHttpServer())
            .post('/private/trip-orchestrator')
            .set('account-id', driverAccID)
            .set('token', driverToken)
            .send({provided_date: datePattern.provided_date + (date.getDate() - 2)});
        expect(response.status).toEqual(201);
        response = await request(applicate.getApp().getHttpServer())
            .post('/private/trip-orchestrator')
            .set('account-id', driverAccID)
            .set('token', driverToken)
            .send({provided_date: datePattern.provided_date + (date.getDate() - 1)});
        expect(response.status).toEqual(201);
        response = await request(applicate.getApp().getHttpServer())
            .post('/private/trip-orchestrator')
            .set('account-id', driverAccID)
            .set('token', driverToken)
            .send({provided_date: datePattern.provided_date + date.getDate()});
        expect(response.status).toEqual(201);
        done();
    });

    afterAll(async () => await applicate.getApp().close());

});
//
// describe('KILL SERVER', () => {
//
//
// });
