import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { services } from './';
import { beforeEach, describe, expect, it } from 'vitest';
import { userData, singleUserData } from 'mocks/data';

describe('services', () => {
  const mockAxiosInstance = new MockAdapter(axios);
  
  beforeEach(() => {
    mockAxiosInstance.reset();
  });

  it('getUserDetails should fetch user details', async () => {
    const responseData = {status: 200, data: userData};
    mockAxiosInstance.onGet('/users').reply(200, responseData);

    const result = await services.getUserDetails();

    expect(result).toEqual(responseData);
  });

  it('getUserDetailsById should fetch user details by id', async () => {
    const userId = 1;
    const responseData = {status: 200, data: singleUserData};
    mockAxiosInstance.onGet(`/users/${userId}`).reply(200, responseData);

    const result = await services.getUserDetailsById(userId);

    expect(result).toEqual(responseData);
  });

  it('addUser should add a new user', async () => {
    const responseData = {status: 200, data: singleUserData};
    mockAxiosInstance.onPost('/users').reply(201, responseData);

    const result = await services.addUser();

    expect(result).toEqual(responseData);
  });

  it('should delete a user', async () => {
    const userId = 2;

    mockAxiosInstance.onDelete(`/users/${userId}`).reply(204, userId);

    const result = await services.deleteUser(userId);
    expect(result).toEqual({status: 200, data: userId});
  });

  it('should update a user', async () => {
    const userId = 1;
    const payload = { name: 'Updated User' };
    const responseData = {status: 200, data: {id: userId, ...singleUserData}};

    mockAxiosInstance.onPatch(`/users/${userId}`).reply(200, responseData);

    const result = await services.updateUser(payload, userId);

    expect(result).toEqual(responseData);
  });
});
