import dotenv from 'dotenv';
dotenv.config()


export default {
    mongoURL: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_NAME}.joeky3o.mongodb.net/${process.env.MONGO_DB_NAME}`,
    privateKey: process.env.PRIVATE_KEY,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD
} 

