// import { FunctionComponent } from "./creatElement";
import { isProduction } from './env';

interface Logger {
  funtionComponentCallStack: string[];
}

const logger: Logger = {
  funtionComponentCallStack: [],
};

if (!isProduction && typeof window === 'object') {
  (window as any).__react_sm_logger = logger;
}

export default logger;
