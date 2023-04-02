import { Box } from '@chakra-ui/react';
import TextEditor from './textEditor';
import RenderedView from './renderedView';

function Main() {
    return (
        <Box h="100%" w="100%" display="flex">
            <TextEditor />
            <RenderedView />
        </Box>
    );
}

export default Main;
