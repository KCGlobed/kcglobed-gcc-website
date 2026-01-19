import { Storage } from '@google-cloud/storage';
import { defineEventHandler, readMultipartFormData, createError } from 'h3';
import { promises as fs } from 'fs';

// Initialize storage
const storage = new Storage();
const bucketName = process.env.GCS_BUCKET_NAME || 'kcglobed-gcc-assets'; // Default or from env

export const uploadToGCS = async (fileBuffer: Buffer, fileName: string, mimeType: string): Promise<string> => {
    try {
        const bucket = storage.bucket(bucketName);
        const file = bucket.file(fileName);

        await file.save(fileBuffer, {
            metadata: {
                contentType: mimeType,
            },
            resumable: false
        });

        // Make the file public (optional, depending on requirements, usually better to use signed URLs or make bucket public)
        // For this task we assume public read or specific access
        // await file.makePublic(); 

        return `https://storage.googleapis.com/${bucketName}/${fileName}`;
    } catch (error) {
        console.error('Error uploading to GCS:', error);
        throw new Error('Failed to upload file to storage');
    }
};
