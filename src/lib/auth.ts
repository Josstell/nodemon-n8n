import { checkout, polar, portal } from "@polar-sh/better-auth";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db";
import { polarClient } from "./polar";
// If your Prisma file is located elsewhere, you can change the path

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "1db3ad9f-3db9-43ea-90a2-74cea31e19ac",
              slug: "Mariachon-Pro",
            },
          ],
          successUrl: process.env.POLAR_SUCCES_URL,
          authenticatedUsersOnly: true,
        }),
        portal()
      ],
    }),
  ],
});
