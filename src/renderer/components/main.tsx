import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { textEditorState } from '../state/global';
import { useState } from 'react';
import TextEditor from './textEditor';
import RenderedView from './renderedView';

function Main() {
    const [file, setFile] = useRecoilState(textEditorState)
    useEffect(() => {
        try {
            window.fileAPI.openFileData((_event, data) => {
                setFile(data)
            })
        } catch (err) {
            console.log(err)
        }

    }, [])
    return (
        <Box h="100%" w="100%" display="flex">
            <TextEditor />
            <RenderedView />
        </Box>
    );
}

export default Main;
