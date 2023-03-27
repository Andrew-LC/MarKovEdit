import { Box } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { textEditorState } from '../state/global';
import { useState, useEffect } from 'react';
import { convertToHTML } from '../utils/converter';
import parse from "html-react-parser";
import "../editor.css"

export default function RenderedView() {
    const textState = useRecoilValue(textEditorState)
    const [currentValue, setCurrentValue] = useState("");

    useEffect(() => {
        console.log(textState)
        try {
            if (textState) {
                convertToHTML(textState).then(response => {
                    setCurrentValue(response)
                })
            }
        } catch (err) {
            console.log(err)
        }
    }, [textState])

    return (
        <Box className="markdown-body" w="50%" h="100%" resize="horizontal" p="2" pt="0" color="white" overflow="scroll" >
            {parse(currentValue)}
        </Box>
    );
}
