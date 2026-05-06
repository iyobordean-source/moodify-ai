// 1. User selects mood + activity + energy + genre
// 2. User clicks "Find My Vibe"
// 3. Frontend sends data to YOUR Express backend
// 4. Backend builds Claude prompt from the data
// 5. Claude returns an optimised AudioMack search query
// 6. Backend searches AudioMack with that query
// 7. AudioMack returns list of songs
// 8. Backend sends songs to frontend
// 9. Frontend updates the track list section
// 10. User clicks song → frontend requests streaming
//     URL from backend → backend calls AudioMack
//     play endpoint → returns URL → frontend plays
