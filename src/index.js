import app from './app.js'
import { dbConnect } from './db.js'
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT

dbConnect()
app.listen(PORT)
console.log('server on port', PORT)