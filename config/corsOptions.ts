const allowedOrigins = ["https://www.google.com"];

const corsOptions = {
  origin: (origin: string, callback: (arg: any, arg2?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
module.exports = { corsOptions };
