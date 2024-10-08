import axios from 'axios';
class YoutubeService {
  static async searchVideos(keyword, sortBy = 'relevance', maxResults = 10) {
    const apiKey =import.meta.env.VITE_YOUTUBE_API_KEY;  
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet,id&order=${sortBy}&maxResults=${maxResults}&q=${keyword}&key=${apiKey}`;

    try {
      const response = await axios.get(url);

      const videos = response.data.items.map((item) => ({
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.default.url,
        description: item.snippet.description,
        videoId: item.id.videoId,
      }));

      const videoIds = videos.map((video) => video.videoId).join(',');
      const videoStatisticsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${apiKey}`;
      const videoStatisticsResponse = await axios.get(videoStatisticsUrl);

      const videoStatistics = videoStatisticsResponse.data.items;

      const videosWithStatistics = videos.map((video) => {
        const videoStatistic = videoStatistics.find((statistic) => statistic.id === video.videoId);

        return {
          ...video,
          commentCount: videoStatistic.statistics.commentCount,
        };
      });

      return {
        videos: videosWithStatistics,
        totalResults: response.data.pageInfo.totalResults,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default YoutubeService;