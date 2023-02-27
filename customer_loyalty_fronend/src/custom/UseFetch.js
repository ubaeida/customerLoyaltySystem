
const UseFetch = async (
  url,
  method,
  body,
  content
) => {
  var connect;
  if (body != null ) {
    connect = await fetch(`${url}`, {
      method: `${method}`,
      body: JSON.stringify(body),
      headers: content
    });
  } else {
    connect = await fetch(`${url}`, {
      method: `${method}`,
      headers: content
    });
  }
  const response = await connect.json();
  return response;
};

export default UseFetch;