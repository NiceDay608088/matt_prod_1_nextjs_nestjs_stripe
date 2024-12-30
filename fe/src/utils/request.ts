export const graphql_request = async (query: any, variables: any) => {
  return await graphql_request_all(
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
    query,
    variables
  );
};

export const graphql_request_all = async (
  graphqlUrl: string,
  query: any,
  variables: any
) => {
  return await fetch(graphqlUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
};
