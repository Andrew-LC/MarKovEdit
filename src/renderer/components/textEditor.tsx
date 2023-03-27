import { Box } from '@chakra-ui/react';
import { EditorView } from '@codemirror/view';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { gruvboxDark } from '@uiw/codemirror-theme-gruvbox-dark';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { textEditorState } from '../state/global'
import { useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';


export default function TextEditor() {
    const [textState, setTextState] = useRecoilState(textEditorState)

    const onChange = useCallback((value, viewUpdate) => {
        setTextState(value)
    }, [])

    return (
        <Box overflow="scroll" h="100%" w="50%" fontSize="1.2rem" >
            <CodeMirror
                height="100%"
                value={textState}
                theme={gruvboxDark}
                onChange={onChange}
                extensions={[markdown({ base: markdownLanguage }), EditorView.lineWrapping]}
            />
        </Box>
    );
}
