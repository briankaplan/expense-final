export class PhotosAPI {
    constructor() {
        this.token = null;
        this.baseUrl = 'https://photoslibrary.googleapis.com/v1';
    }

    async authenticate() {
        try {
            // For web app, we'll use OAuth flow instead of chrome.identity
            // You'll need to set up OAuth credentials in Google Cloud Console
            const response = await fetch('/api/auth/google-photos');
            const { token } = await response.json();
            this.token = token;
            return true;
        } catch (error) {
            console.error('Authentication failed:', error);
            return false;
        }
    }

    async searchPhotos(query = 'receipt', maxResults = 50) {
        if (!this.token) {
            await this.authenticate();
        }

        try {
            const response = await fetch(
                `${this.baseUrl}/mediaItems:search`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        pageSize: maxResults,
                        filters: {
                            contentFilter: {
                                includedContentCategories: ['RECEIPTS']
                            },
                            mediaTypeFilter: {
                                mediaTypes: ['PHOTO']
                            },
                            dateFilter: this.buildDateFilter()
                        }
                    })
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return this.processMediaItems(data.mediaItems || []);
        } catch (error) {
            console.error('Error searching photos:', error);
            return [];
        }
    }

    async processMediaItems(mediaItems) {
        return Promise.all(mediaItems.map(async item => {
            const metadata = await this.getPhotoMetadata(item.id);
            return {
                id: item.id,
                filename: item.filename,
                mimeType: item.mimeType,
                description: item.description || '',
                createTime: item.mediaMetadata.creationTime,
                width: item.mediaMetadata.width,
                height: item.mediaMetadata.height,
                url: this.getDownloadUrl(item.baseUrl, item.mediaMetadata),
                thumbnailUrl: `${item.baseUrl}=w200-h200`,
                metadata: metadata
            };
        }));
    }

    getDownloadUrl(baseUrl, metadata) {
        return `${baseUrl}=w${metadata.width}-h${metadata.height}`;
    }

    async downloadPhoto(url) {
        if (!this.token) {
            await this.authenticate();
        }

        try {
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.blob();
        } catch (error) {
            console.error('Error downloading photo:', error);
            return null;
        }
    }

    buildDateFilter(days = 365) {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        
        return {
            ranges: [{
                startDate: {
                    year: startDate.getFullYear(),
                    month: startDate.getMonth() + 1,
                    day: startDate.getDate()
                },
                endDate: {
                    year: endDate.getFullYear(),
                    month: endDate.getMonth() + 1,
                    day: endDate.getDate()
                }
            }]
        };
    }
} 