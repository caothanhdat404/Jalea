import { MongoClient, Db, Collection } from 'mongodb'
import dotenv from 'dotenv'
import User from 'src/models/schemas/User.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schemas'
dotenv.config()

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@azureopenai.pf9fafc.mongodb.net/`

class DatabaseService {
	private client: MongoClient
	private db: Db
	constructor() {
		this.client = new MongoClient(uri)
		this.db = this.client.db(process.env.DB_NAME)
	}

	async connect() {
		try {
			// Send a ping to confirm a successful connection
			await this.db.command({ ping: 1 })
			console.log('Pinged your deployment. You successfully connected to MongoDB!')
		} catch (error) {
			console.log('Error:', error)
			throw error
		}
	}

	get users(): Collection<User> {
		return this.db.collection(process.env.DB_USERS_COLLECTION as string)
	}

	get refreshTokens(): Collection<RefreshToken> {
		return this.db.collection(process.env.DB_REFRESH_TOKEN_COLLECTION as string)
	}
}

const databaseService = new DatabaseService()
export default databaseService
