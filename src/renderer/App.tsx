import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { RecoilRoot } from 'recoil';
import Main from './components/main';

export default function App() {
    return (
        <RecoilRoot>
            <ChakraProvider>
                <Main />
            </ChakraProvider>
        </RecoilRoot>
    );
}
