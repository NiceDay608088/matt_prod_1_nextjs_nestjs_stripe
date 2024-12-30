import { notFound } from "next/navigation";
import ClientComponent from "./ClientComponent";
import { GQL_GET_RENTAL_PROPERTY_QUERY } from "@/utils/Contants";
import { graphql_request } from "@/utils/request";

async function fetchServerData(id: string) {
  const res = await graphql_request(GQL_GET_RENTAL_PROPERTY_QUERY, {
    id,
  });

  const result = await res.json();

  if (result.errors) {
    throw new Error("Error fetching data");
  }

  return result.data.getRentalProperty;
}

// SSR
const MyPage = async ({ searchParams }: { searchParams: { id: string } }) => {
  const params = await searchParams;
  const { id } = params;

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
