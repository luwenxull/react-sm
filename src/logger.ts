// import { FunctionComponent } from "./creatElement";
import { isProduction } from './env';

interface Logger {
  funtionComponentCallStack: string[];
  log(msg: unknown): void;
  warn(msg: unknown): void;
  error(msg: unknown): void;
}

const logger: Logger = {
  funtionComponentCallStack: [],
  log(msg: unknown) {
    if (!isProduction) {
      console.log(msg);
    }
  },
  warn(msg: unknown) {
    if (!isProduction) {
      console.warn(msg);
    }
  },
  error(msg: unknown) {
    if (!isProduction) {
      console.error(msg);
    }
  },
};

if (!isProduction && typeof window === 'object') {
  (window as any).__react_sm_logger = logger;
}

export default logger;
