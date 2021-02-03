import React, { useState } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ContactCard from './components/ContactCard';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import xmlbuilder from 'xmlbuilder';
import { TextAnalyticsClient, AzureKeyCredential } from "@azure/ai-text-analytics";
var sdk = require('microsoft-cognitiveservices-speech-sdk');


export default function App() {
    const [state, setState] = useState({ id: 0, name: "Alice", src: "/images/avatar/alice.jpg", voice: "en-AU-NatashaNeural", text: "", translation: "", messages: [] });
    
    let avatars = [];
    let avatar = { id: 0, name: "Alice", src: "/images/avatar/alice.jpg", voice: "en-AU-NatashaNeural" };
    avatars.push(avatar);
    avatar = { id: 1, name: "Carl", src: "/images/avatar/carl.jpg", voice: "en-GB-RyanNeural" };
    avatars.push(avatar);
    avatar = { id: 2, name: "Henderson", src: "/images/avatar/henderson.jpg", voice: "en-AU-WilliamNeural" };
    avatars.push(avatar);
    avatar = { id: 3, name: "Nora", src: "/images/avatar/nora.jpg", voice: "en-CA-ClaraNeural" };
    avatars.push(avatar);
    avatar = { id: 4, name: "Vincent", src: "/images/avatar/vincent.jpg", voice: "en-CA-LiamNeural" };
    avatars.push(avatar);
    avatar = { id: 5, name: "Joyce", src: "/images/avatar/joyce.jpg", voice: "en-GB-MiaNeural" };
    avatars.push(avatar);
    avatar = { id: 6, name: "Estes", src: "/images/avatar/estes.jpg", voice: "en-GB-LibbyNeural" };
    avatars.push(avatar);
    avatar = { id: 7, name: "James", src: "/images/avatar/james.jpg", voice: "en-IE-ConnorNeural" };
    avatars.push(avatar);


    var audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
    var speechConfig = sdk.SpeechConfig.fromSubscription(process.env.REACT_APP_TEXT_TO_SPEECH_KEY, process.env.REACT_APP_TEXT_TO_SPEECH_REGION);
    var textAnalyticsClient = new TextAnalyticsClient(process.env.REACT_APP_TEXT_ANALYTICS_ENDPOINT, new AzureKeyCredential(process.env.REACT_APP_TEXT_ANALYTICS_KEY));


    const constructSsml = (text, voice) => {
        
        const ssml = xmlbuilder.create("speak")
            .att("version", "1.0")
            .att("xml:lang", "en-us")
            .ele("voice")
            .att("xml:lang", "en-us")
            .att("name", voice) 
            .txt(text)
            .end();

        return ssml.toString();

    }

    const handleSelect = (id) => {
        avatars.find((item) => {
            if (item.id === id) {
                setState({ ...state, id: id, voice: item.voice, src: item.src, name: item.name });
            }
        })
    };

    const handleTextChanged = (e) => {
        setState({ ...state, text: e });
    };
    const handleTranslation = (e) => { };
 
    async function sentimentAnalysis(client, text) {

        const sentimentInput = [text];
        const sentimentResult = await client.analyzeSentiment(sentimentInput);
        let result;

        sentimentResult.forEach(document => {
            document.sentences.forEach(sentence => {
                result = { sentiment: sentence.sentiment, positive: sentence.confidenceScores.positive.toFixed(2), negative: sentence.confidenceScores.negative.toFixed(2), neutral: sentence.confidenceScores.neutral.toFixed(2) }
            });
        });
        return result;
    }


    const handleSpeak = async () => {


        var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
        synthesizer.speakSsmlAsync(constructSsml(state.text, state.voice),
            async function (result) {
                if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {

                    let sentiment = await sentimentAnalysis(textAnalyticsClient, state.text);
                    let messages = state.messages;
                    messages.push({ id: state.id, message: state.text, voice: state.voice, src: state.src, name: state.name, sentiment: sentiment });
                    setState({ ...state, messages: messages });
                } else {
                    console.error("Speech synthesis canceled, " + result.errorDetails +
                        "\nDid you update the subscription info?");
                }
                synthesizer.close();
                synthesizer = undefined;
            },
            async function (err) {
                console.trace("err - " + err);
                synthesizer.close();
                synthesizer = undefined;
            });
    }
    return (
        <React.Fragment>
            <ResponsiveDrawer onTextChanged={handleTextChanged} onSpeak={handleSpeak} onTranslation={handleTranslation} messages={state.messages}>
                <Container component="main" maxWidth="lg">
                    <CssBaseline />
                    <Box paddingTop={3} paddingBottom={3}>
                        <Grid container spacing={3}>
                            {avatars.map((item, index) => {
                                return <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                                    <ContactCard {...item} onSelect={handleSelect} active={(state.id === item.id)?true:false} />
                                </Grid>
                            })}
                           
                        </Grid>

                    </Box>
                </Container>
            </ResponsiveDrawer>
            
        </React.Fragment>
    );
}
