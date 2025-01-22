import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "user" model, go to https://volunteering.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "kCn0W3H5wRuN",
  fields: {
    email: {
      type: "email",
      validations: { required: true, unique: true },
      storageKey: "1hEkW3JM75VK",
    },
    emailVerificationToken: {
      type: "string",
      storageKey: "8QzBy86k-Ru4",
    },
    emailVerificationTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "NxMxvqjVQbof",
    },
    emailVerified: {
      type: "boolean",
      default: false,
      storageKey: "m8ij6EB1rqp9",
    },
    firstName: { type: "string", storageKey: "cf7IhLRRk_76" },
    googleImageUrl: { type: "url", storageKey: "jVfYxu7JMs7K" },
    googleProfileId: { type: "string", storageKey: "L-mSyzQcv42g" },
    lastName: { type: "string", storageKey: "YWHJhfk5_3kr" },
    lastSignedIn: {
      type: "dateTime",
      includeTime: true,
      storageKey: "6IPKEPBHJIjG",
    },
    password: {
      type: "password",
      validations: { strongPassword: true },
      storageKey: "7CgUJafOHc_j",
    },
    resetPasswordToken: {
      type: "string",
      storageKey: "q635dZYfhQs4",
    },
    resetPasswordTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "UBivDSjFPUpT",
    },
    roles: {
      type: "roleList",
      default: ["unauthenticated"],
      storageKey: "BBMyMWB2UJ7I",
    },
  },
};
