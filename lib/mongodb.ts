import { MongoClient, type Db } from "mongodb"

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

function getMongoUri() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable.")
  }

  return uri
}

function getMongoDbName() {
  return process.env.MONGODB_DB || "cryptogalaxy"
}

function getMongoClientPromise() {
  if (global._mongoClientPromise) {
    return global._mongoClientPromise
  }

  const client = new MongoClient(getMongoUri())
  const clientPromise = client.connect()

  if (process.env.NODE_ENV !== "production") {
    global._mongoClientPromise = clientPromise
  }

  return clientPromise
}

export async function getDb(): Promise<Db> {
  const client = await getMongoClientPromise()
  return client.db(getMongoDbName())
}
