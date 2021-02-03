# TextToSpeechChat

Demonstration app of Azure's text-to-speech API allowing you to select different voices with a click to select graphical UI using React.  Also implements sentiment analysis using Azure's Text Analytics on the entered text using a stop light indicator logging each text input in a chat UI.

You will need to configure the following environment variables in your local environment (and configure the necessary subscriptions and endpoints in your Azure portal).
REACT_APP_TEXT_ANALYTICS_KEY=your_key_for_text_analytics
REACT_APP_TEXT_ANALYTICS_ENDPOINT=your_subscription_endpoint_for_text_analytics
REACT_APP_TEXT_TO_SPEECH_KEY=your_key_for_text_to_speech
REACT_APP_TEXT_TO_SPEECH_REGION=your_region_endpoint_for_text_to_speech
