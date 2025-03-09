/**
 * Returns a promise that rejects after a specified number of seconds.
 * @param {number} second - The number of seconds to wait before rejecting the promise.
 * @returns {Promise<never>} A promise that rejects after the specified time.
 */
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

/**
 * Fetches JSON data from a specified URL with a timeout.
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<any>} A promise that resolves with the fetched data.
 * @throws Will throw an error if the request fails or times out.
 */
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
