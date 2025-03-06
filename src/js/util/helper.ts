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
