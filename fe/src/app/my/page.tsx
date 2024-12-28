import { notFound } from "next/navigation";
import ClientComponent from "./ClientComponent";

// Define the GraphQL query
const GET_RENTAL_PROPERTY_QUERY = `
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

// Fetch data from the server using GraphQL request
async function fetchServerData(id: string) {
  const graphqlUrl = "http://localhost:3001/graphql"; // NestJS GraphQL endpoint

  // Perform the GraphQL request using native fetch
  const res = await fetch(graphqlUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GET_RENTAL_PROPERTY_QUERY,
      variables: { id },
    }),
  });

  const result = await res.json();

  if (result.errors) {
    throw new Error("Error fetching data");
  }

  return result.data.getRentalProperty;
}

// SSR page component
const MyPage = async ({ searchParams }: { searchParams: { id: string } }) => {
  const { id } = searchParams;

  if (!id) {
    notFound(); // Trigger a 404 page if the ID is not available
  }

  const serverData = await fetchServerData(id); // Fetch server data using the ID

  return (
    <div>
      <h1>Mixed Rendering Example</h1>
      <div>
        <h2>Server-Side Rendered Content:</h2>
        {serverData ? (
          <>
            <p>ID: {serverData.id}</p>
            <p>Name: {serverData.name}</p>
            <p>Price: ${serverData.price}</p>
            <p>Type: {serverData.type}</p>
            <p>Address: {serverData.address}</p>
            <p>Image URL: {serverData.imageUrl}</p>
          </>
        ) : (
          <p>Loading server-side content...</p>
        )}
      </div>
      <ClientComponent />
    </div>
  );
};

export default MyPage;
