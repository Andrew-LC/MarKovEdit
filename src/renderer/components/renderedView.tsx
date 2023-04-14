import { Box } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { textEditorState, fileExtensionState } from '../state/global';
import { useState, useEffect } from 'react';
import { convertMDtoHTML, convertORGtoHTML } from '../utils/converter';
import parse from "html-react-parser";
import "../editor.css"
//import "../../../node_modules/highlight.js/styles/stackoverflow-dark.css"
import "../gruvbox-hljs.css"


export default function RenderedView() {
    const textState = useRecoilValue(textEditorState)
    const fileState = useRecoilValue(fileExtensionState)
    const [currentValue, setCurrentValue] = useState("");

    // By default it will render Markdown
    useEffect(() => {
        try {
            if (textState && fileState == '.md') {
                setCurrentValue("")
                convertMDtoHTML(textState).then(response => {
                    setCurrentValue(response)
                })
            } else if (textState && fileState == '.org') {
                setCurrentValue("")
                convertORGtoHTML(textState).then(response => {
                    setCurrentValue(response)
                })
            } else {
                setCurrentValue("")
                convertMDtoHTML(textState).then(response => {
                    setCurrentValue(response)
                })
            }
        } catch (err) {
            console.log(err)
        }
    }, [textState, fileState])

    return (
        <Box className="markdown-body left" w="50%" h="100%" resize="horizontal" p="2" ml="2" pl="3" pr="3" pt="0" color="white" overflow="scroll" >
            {parse(currentValue)}
        </Box>
    );
}
