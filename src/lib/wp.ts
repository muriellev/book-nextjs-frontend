export async function wpFetch<T>(query: string, variables?: Record<string, any>) {
  const res = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    // SSG with ISR:
    next: { revalidate: 60 }, // revalidate every 60s
  });
  //console.log(`query: ${query}`);
  //console.log(`variables: ${variables}`);
  if (!res.ok) throw new Error(`WPGraphQL error: ${res.status}`);
  const json = await res.json();
  //console.log(`json: ${JSON.stringify(json.errors)}`);
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data as T;
}