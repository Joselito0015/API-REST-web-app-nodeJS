const { API_KEY } = require("./config");
const {AssemblyAI} = require("assemblyai");

const client = new AssemblyAI({
    apiKey: API_KEY
});

const run = async (file) => {
    //Audio file URL
    const audioUrl = file;
    const config = {
        audio_url: audioUrl,
        speaker_labels: true,
    };

    try {
        const transcript = await client.transcripts.create(config);
        let dialogues = '';
        let lastSpeaker = null;
        for (const utterance of transcript.utterances) {
            if (lastSpeaker !== null && utterance.speaker !== lastSpeaker) {
                dialogues += '\n';
            }
            dialogues += `Speaker ${utterance.speaker}:  ${utterance.text}` + ' ';
            lastSpeaker = utterance.speaker;
        }
        console.log(dialogues);
        return dialogues;
    } catch (error) {
        console.error(error);
    }
};

module.exports = run;
