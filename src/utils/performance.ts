// utils/performance.ts
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
};

// Use Web Workers for heavy tasks
export const processInWorker = (data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const worker = new Worker('/workers/dataProcessor.js');
    worker.postMessage(data);
    worker.onmessage = (e) => {
      resolve(e.data);
      worker.terminate();
    };
    worker.onerror = reject;
  });
};
