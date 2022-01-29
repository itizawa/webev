// eslint-disable-next-line @typescript-eslint/no-var-requires
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

// In production mode, it's best to not use a global variable.
const client = new MongoClient(uri, options);
const clientPromise = client.connect();

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
