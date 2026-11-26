import { describe, expect, it } from "vitest";

import { SignEvmTypedDataFieldCriterionSchema } from "./evmSchema.js";

const criterion = {
  type: "evmTypedDataField" as const,
  types: {
    types: {
      Permit: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
      ],
    },
    primaryType: "Permit",
  },
  conditions: [{ path: "owner", operator: "in" as const, addresses: [`0x${"1".repeat(40)}`] }],
};

describe("SignEvmTypedDataFieldCriterionSchema", () => {
  it("accepts EIP-712 type definitions", () => {
    expect(SignEvmTypedDataFieldCriterionSchema.parse(criterion)).toEqual(criterion);
  });

  it("rejects invalid EIP-712 type definitions", () => {
    expect(
      SignEvmTypedDataFieldCriterionSchema.safeParse({
        ...criterion,
        types: {
          ...criterion.types,
          types: {
            Permit: [{ name: "owner" }],
          },
        },
      }).success,
    ).toBe(false);
  });
});
