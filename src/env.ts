declare const process: any;

export const isProduction = process && process.env && process.env.production;
