const SERVICE_URL = "https://bsky.social";

function constructResolveUrl(handle: string): URL {
    const url = new URL(`${SERVICE_URL}/xrpc/com.atproto.identity.resolveHandle`);
    url.searchParams.set("handle", handle);
    return url;
}

export async function resolveHandle(handle: string): Promise<string> {
    const response = await fetch(constructResolveUrl(handle), {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    });
    if (!response.ok) {
        throw new Error(`Failed to resolve handle ${handle}: Received status ${response.status} - ${response.statusText}`);
    }
    const json = await response.json();
    if (!json.did) {
        throw new Error(`Failed to resolve handle ${handle}: Received invalid response`);
    }
    return json.did;
}
