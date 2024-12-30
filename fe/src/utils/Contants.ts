export const GQL_GET_RENTAL_PROPERTY_QUERY = `
  query GetRentalProperty($id: String!) {
    getRentalProperty(id: $id) {
      id
      name
      price
      type
      address
      imageUrl
    }
  }
`;

export const GQL_GET_RENTAL_PROPERTY_FEE = `
  query GetRentFee($rentalPropertyId: String!, $cardType: String!) {
    getRentFee(stripQueryeRentFeeRequest: { rentalPropertyId: $rentalPropertyId, cardType: $cardType }) {
      price
      fee
      total
      description
    }
  }
`;
