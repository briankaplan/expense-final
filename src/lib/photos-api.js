export class PhotosAPI {
  constructor() {
    this.accessToken = null;
    this.baseUrl = 'https://photoslibrary.googleapis.com/v1';
  }

  async authenticate() {
    try {
      const response = await fetch('/api/auth/google-photos', {
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('Failed to authenticate with Google Photos');
      }

      const { accessToken } = await response.json();
      this.accessToken = accessToken;
    } catch (error) {
      console.error('Authentication error:', error);
      throw new Error('Failed to authenticate with Google Photos');
    }
  }

  buildDateFilter(startDate, endDate) {
    return {
      filters: {
        dateFilter: {
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
        }
      }
    };
  }

  async searchPhotos(query = '', options = {}) {
    if (!this.accessToken) {
      throw new Error('Not authenticated');
    }

    try {
      // First, search for photos using the provided query
      const searchBody = {
        pageSize: 100,
        filters: {}
      };

      // Add date filter if provided
      if (options.startDate && options.endDate) {
        searchBody.filters = {
          ...searchBody.filters,
          ...this.buildDateFilter(options.startDate, options.endDate)
        };
      }

      // Add content filter for receipts
      if (query) {
        searchBody.filters.contentFilter = {
          includedContentCategories: ['RECEIPTS'],
          includedFeatures: ['RECEIPTS']
        };
      }

      const searchResponse = await fetch(`${this.baseUrl}/mediaItems:search`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchBody)
      });

      if (!searchResponse.ok) {
        throw new Error('Failed to search Google Photos');
      }

      const { mediaItems = [] } = await searchResponse.json();

      // Process and filter the results
      const receipts = await Promise.all(
        mediaItems.map(async (item) => {
          try {
            // Get metadata for the photo
            const metadataResponse = await fetch(`${this.baseUrl}/mediaItems/${item.id}`, {
              headers: {
                'Authorization': `Bearer ${this.accessToken}`
              }
            });

            if (!metadataResponse.ok) {
              console.warn(`Failed to get metadata for item ${item.id}`);
              return null;
            }

            const metadata = await metadataResponse.json();

            // Process the metadata to extract relevant information
            const receiptData = {
              id: item.id,
              source: 'Google Photos',
              url: item.baseUrl,
              date: metadata.mediaMetadata.creationTime,
              description: metadata.description || 'Receipt from Google Photos',
              confidence: this.calculateConfidence(metadata)
            };

            return receiptData;
          } catch (error) {
            console.warn(`Error processing media item ${item.id}:`, error);
            return null;
          }
        })
      );

      // Filter out null results and sort by date
      return receipts
        .filter(Boolean)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    } catch (error) {
      console.error('Google Photos search error:', error);
      throw new Error('Failed to search Google Photos');
    }
  }

  calculateConfidence(metadata) {
    let confidence = 0;

    // Check if the image has been identified as a receipt
    if (metadata.mediaMetadata.photo?.receiptConfidence) {
      confidence += 0.5;
    }

    // Check if there's a description
    if (metadata.description) {
      confidence += 0.2;
    }

    // Check if there are relevant labels
    if (metadata.mediaMetadata.photo?.labels) {
      const relevantLabels = ['receipt', 'document', 'text'];
      const hasRelevantLabel = relevantLabels.some(label => 
        metadata.mediaMetadata.photo.labels.includes(label)
      );
      if (hasRelevantLabel) {
        confidence += 0.3;
      }
    }

    return Math.min(confidence, 1);
  }
} 