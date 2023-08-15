import { rest } from "msw";
import {singleUserData, userData} from "./data";

export const MSW_BASE_URL = `https://firestore.googleapis.com/v1/projects/user-details-e00a0/databases`

export const handlers = [
  rest.get(`${MSW_BASE_URL}/\\(default\\)/documents/users`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userData));
  }),

  rest.get(`${MSW_BASE_URL}/\\(default\\)/documents/users/:id`, async (req, res, ctx) => {
    return res(ctx.json(singleUserData));
  }),

  rest.post(`${MSW_BASE_URL}/\\(default\\)/documents/users`, async (req, res, ctx) => {
    return res(ctx.json(singleUserData));
  }),

  rest.delete(`${MSW_BASE_URL}/\\(default\\)/documents/users/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    return res(ctx.status(id));
  }),

  rest.patch(`${MSW_BASE_URL}/\\(default\\)/documents/users/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    return res(ctx.json({id, singleUserData}));
  }),
];