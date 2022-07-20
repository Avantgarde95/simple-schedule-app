/**
 * Run job after `delay` milliseconds.
 * Promise version of setTimeout().
 */
export function runAfterDelay<Result>(job: () => Result, delay: number): Promise<Result> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(job());
      } catch (error) {
        reject(error);
      }
    }, delay);
  });
}
