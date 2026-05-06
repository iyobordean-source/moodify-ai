const express = require('express');
const router = express.Router();
const { generateSearchQuery } = require('../services/claude');
const { searchSongs, getStreamingUrl } = require('../services/audiomac');

// POST /api/mood/find-vibe
router.post('/find-vibe', async (req, res) => {
  try {
    const { mood, activity, energy, genre } = req.body;

    // Validate input
    if (!mood || !activity || !energy || !genre) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate optimized search query using Claude
    const searchQuery = await generateSearchQuery(mood, activity, energy, genre);
    console.log(`Generated search query: ${searchQuery}`);

    // Search AudioMack for songs
    const songs = await searchSongs(searchQuery);

    res.json({
      success: true,
      query: searchQuery,
      songs: songs
    });
  } catch (error) {
    console.error('Error in find-vibe:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/mood/stream/:trackId
router.get('/stream/:trackId', async (req, res) => {
  try {
    const { trackId } = req.params;

    if (!trackId) {
      return res.status(400).json({ error: 'Track ID is required' });
    }

    const streamingUrl = await getStreamingUrl(trackId);

    res.json({
      success: true,
      url: streamingUrl
    });
  } catch (error) {
    console.error('Error getting stream URL:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
