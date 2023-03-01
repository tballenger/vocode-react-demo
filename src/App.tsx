import "@fontsource/inter";
import "./App.css";

import {
  Box,
  ChakraProvider,
  Flex,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import Conversation from "./components/Conversation";

import { isIE, isMobile, isSafari } from "react-device-detect";
import { WarningIcon } from "@chakra-ui/icons";
import {
  DeepgramTranscriberConfig,
  LLMAgentConfig,
  AzureSynthesizerConfig,
  VocodeConfig,
  EchoAgentConfig,
  ChatGPTAgentConfig,
} from "./vocode";

const App = () => {
  const transcriberConfig: Omit<
    DeepgramTranscriberConfig,
    "samplingRate" | "audioEncoding"
  > = {
    type: "deepgram",
    model: "conversationalai",
    chunkSize: 2048,
  };
  const agentConfig: ChatGPTAgentConfig = {
    type: "chat_gpt",
    initialMessage: "Hello!",
    promptPreamble:
      "Vocode is an SDK that allows developers to create voice bots like this one in less than 10 lines of code. The AI is explaining to the human what Vocode is.",
  };
  const synthesizerConfig: Omit<
    AzureSynthesizerConfig,
    "samplingRate" | "audioEncoding"
  > = {
    type: "azure",
    shouldEncodeAsWav: true,
  };
  const vocodeConfig: VocodeConfig = {
    apiKey: process.env.REACT_APP_VOCODE_API_KEY || "",
  };

  return (
    <ChakraProvider>
      <Flex height={"100vh"} align={"center"} direction="column">
        <Spacer />
        {isIE || (isMobile && !isSafari) ? (
          <VStack position="absolute" top="35%" left="33%">
            <WarningIcon boxSize={100} />
            <Text paddingTop={4}>
              This demo works on: Chrome (desktop) and Safari (desktop, mobile)
              only!
            </Text>
          </VStack>
        ) : (
          <Conversation
            config={{
              transcriberConfig,
              agentConfig,
              synthesizerConfig,
              vocodeConfig,
            }}
          />
        )}
      </Flex>
    </ChakraProvider>
  );
};

export default App;
