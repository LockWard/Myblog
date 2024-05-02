import { config } from 'dotenv';
config();

export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'admin';
export const DB_NAME = process.env.DB_NAME || 'myblog_db';
export const JWT_SECRET = process.env.JWT_SECRET || 'thisisthesecret.';

// Admin user
export const ADMIN_HANDLE = process.env.ADMIN_HANDLE || 'administrator';
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'roger1210@admin.com';
export const ADMIN_FIRST_NAME = process.env.ADMIN_FIRST_NAME || 'admin';
export const ADMIN_LAST_NAME = process.env.ADMIN_LAST_NAME || 'admin';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin1234';
