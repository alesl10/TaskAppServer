import dotenv from 'dotenv';

dotenv.config();

export default {
	MONGO_URI: process.env.MONGO_URI,
	MONGO_SESSION_SECRET: process.env.MONGO_SESSION_SECRET,
	PORT: process.env.PORT,
    SECRETJWT:process.env.SECRETJWT
};