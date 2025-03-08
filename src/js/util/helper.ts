const timeout = function (second: number): Promise<never> {
  return new Promise<never>(function (_, reject) {
    setTimeout(() => {
      reject(
        new Error(
          `request took too long. Request timeout after ${second} seconds.`
        )
      );
    }, second * 1000);
  });
};

export const getJSON = async function (url: string): Promise<any> {
  try {
    const res = await Promise.race([fetch(url), timeout(7)]);
    const data = await res.json();
    if (!res.ok)
      throw new Error("Failed to fetch recipe. Please try again later.");
    return data;
  } catch (err) {
    throw err;
  }
};
