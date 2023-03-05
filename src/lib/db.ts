import mongoose, { ConnectOptions } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cachedConnection: typeof mongoose | null = null;

const connect = async (uri: string, options?: ConnectOptions) => {
  if (cachedConnection) {
    return cachedConnection;
  }

  const connection = await mongoose.connect(uri, {
    ...options,
  });

  cachedConnection = connection;

  return connection;
};

async function connectDB() {
  return connect(MONGODB_URI);
}

export default connectDB;
