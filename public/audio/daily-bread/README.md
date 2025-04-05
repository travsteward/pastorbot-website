# Daily Bread Audio Files

This directory contains the TTS (Text-to-Speech) audio files for the Daily Bread feature.

## File Naming Convention

Use a consistent naming convention for the audio files:

- `verse-[date].mp3` - Audio of the scripture verse
- `context-[date].mp3` - Audio of the historical context
- `exegesis-[date].mp3` - Audio of the scholarly exegesis

For example:
- `verse-2023-04-05.mp3`
- `context-2023-04-05.mp3`
- `exegesis-2023-04-05.mp3`

## Usage in Website

These files will be accessible in the website at:
```
/audio/daily-bread/filename.mp3
```

To add audio players to the Daily Bread section, update the Home.tsx file to include audio elements pointing to these files.