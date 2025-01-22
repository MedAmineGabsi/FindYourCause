import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "event" model, go to https://volunteering.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "J4-PWmiw0D_R",
  fields: {
    address: { type: "string", storageKey: "tYt05ShfKaIQ" },
    date: {
      type: "dateTime",
      includeTime: true,
      storageKey: "ye1-fmlUIwks",
    },
    description: { type: "string", storageKey: "VNXizOGhKWr8" },
    email: {
      type: "email",
      validations: { required: true },
      storageKey: "jnSXw7jQyHvg",
    },
    eventName: {
      type: "string",
      validations: { required: true },
      storageKey: "2jsmRAfD2qnU",
    },
    latitude: { type: "number", storageKey: "qmZZ82y0QUG2" },
    longitude: { type: "number", storageKey: "Pi_y8Mxkpg0G" },
    organizationName: {
      type: "string",
      validations: { required: true },
      storageKey: "IQcmIpAZQ2KM",
    },
    url: { type: "url", storageKey: "2Gdix4jk01-L" },
  },
};
