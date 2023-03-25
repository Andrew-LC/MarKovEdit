import './App.css';
import {
    ChakraProvider, Box,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Heading
} from '@chakra-ui/react'
import { RecoilRoot } from 'recoil';
import TextEditor from './components/textEditor';
import RenderedView from './components/renderedView';


export default function App() {
    return (
        <RecoilRoot>
            <ChakraProvider>
                <Box h="100vh" w="100%" display="flex">
                    <TextEditor />
                    <RenderedView />
                </Box>
            </ChakraProvider>
        </RecoilRoot>
    );
}
