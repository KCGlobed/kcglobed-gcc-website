import { Storage } from '@google-cloud/storage'

export const storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID
})

export const bucket = storage.bucket(process.env.GCP_BUCKET_NAME || 'asd')

export async function generateSignedUrl(filePath: string) {
    const [url] = await bucket.file(filePath).getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: Date.now() + 15 * 60 * 1000 // 15 minutes
    })

    return url
}