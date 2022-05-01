interface ILogger {
  error: Function;
  warn: Function;
  log: Function;
}

const logger: ILogger = {
  error: (params?: any, message?: string): void => console.error(`💩 ${message || 'error'}`, params),
  warn: (params?: any, message?: string): void => console.warn(`🤔 ${message || 'warning:'}`, params),
  log: (params?: any, message?: string): void => console.log(`🧪 ${message || 'log:'}`, params),
};

export default logger;
