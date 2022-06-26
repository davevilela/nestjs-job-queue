export const mailerConfig = {
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
};

export const redisConfig = {
  port: Number(process.env.REDISPORT),
  host: process.env.REDISHOST,
  password: process.env.REDISPASSWORD,
  tls: { rejectUnauthorized: false },
};

export default () => ({
  redisConfig,
  mailerConfig,
});
