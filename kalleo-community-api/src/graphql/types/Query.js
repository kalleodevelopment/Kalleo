export const AppQuery = `
  type Query {
    carrier(id: ID!): Carrier

    lookup(_id: ID, phoneNumber: String): PublicListing
  }
`;

export const PublicQuery = `
  type Query {
    lookup(_id: ID, phoneNumber: String): PublicListing
  }
`;
