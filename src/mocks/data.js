import { convertToFirebasePayload } from "services/helpers";

export const userData = {
  documents: [
    {
      name: "1",
      ...convertToFirebasePayload({
        first_name: "Jayesh",
        last_name: "poyil",
        contact_number: "999999999",
        address_1: "Adr 1",
        address_2: "Adr 2",
        post_code: "990099",
        country: "UK",
        region: "Greater London",
        town: "Leyton",
      }),
    },
    {
      name: "2",
      ...convertToFirebasePayload({
        first_name: "Suresh",
        last_name: "kumar",
        contact_number: "999999999",
        address_1: "Adr 1",
        address_2: "Adr 2",
        post_code: "990099",
        country: "UK",
        region: "Greater London",
        town: "Leyton",
      }),
    },
  ],
};

export const singleUserData = {
  documents: {
    name: "1",
    ...convertToFirebasePayload({
      first_name: "Jayesh",
      last_name: "poyil",
      contact_number: "999999999",
      address_1: "Adr 1",
      address_2: "Adr 2",
      post_code: "990099",
      country: "UK",
      region: "Greater London",
      town: "Leyton",
    }),
  },
};
