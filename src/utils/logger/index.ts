interface ILogger {
  error: Function;
  warn: Function;
  log: Function;
}

const logger: ILogger = {
  error: (params?: any, message?: string): void => console.error(`๐ฉ ${message || 'error'}`, params),
  warn: (params?: any, message?: string): void => console.warn(`๐ค ${message || 'warning:'}`, params),
  log: (params?: any, message?: string): void => console.log(`๐งช ${message || 'log:'}`, params),
};

export default logger;
