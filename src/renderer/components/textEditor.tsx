import { Box } from '@chakra-ui/react';
import { EditorView } from '@codemirror/view';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { gruvboxDark } from '@uiw/codemirror-theme-gruvbox-dark';
import { useCallback, useEffect } from 'react';
import { IpcRendererEvent } from 'electron';
import { useRecoilState } from 'recoil';
import { textEditorState, fileExtensionState } from '../state/global'
import CodeMirror from '@uiw/react-codemirror';
import path from 'path';

let currentdata = "";
let file = "";

export default function TextEditor() {
    const [textState, setTextState] = useRecoilState(textEditorState)
    const [fileExtension, setFileExtension] = useRecoilState(fileExtensionState)

    const onChange = useCallback((value: string) => {
        setTextState(value)
        currentdata = value;
    }, [])

    useEffect(() => {
        window.fileAPI.openFileData((event: IpcRendererEvent, data: object) => {
            try {
                setTextState(data.data)
                currentdata = data.data
                file = data.filename
                setFileExtension(data.extension)
            } catch (err) {
                console.log(err)
            }
        })

        window.fileAPI.saveFileCommand(() => {
            const data = { 'filename': file, 'data': currentdata }
            window.fileAPI.saveFileData(data)
        })

        window.fileAPI.saveAsFileCommand(() => {
            const data = { 'filename': '', 'data': currentdata }
            window.fileAPI.saveFileData(data)
        })

        window.fileAPI.fileFormat((_event: IpcRendererEvent, data: string) => {
            setFileExtension(data)
        })

        window.fileAPI.newFile((_event: IpcRendererEvent, data: string) => {
            file = ""
            currentdata = ""
            setTextState("")
        })
    }, [])


    return (
        <Box overflow="scroll" h="100%" w="50%" fontSize="1.2rem" >
            <CodeMirror
                height="100%"
                value={textState}
                theme={gruvboxDark}
                onChange={onChange}
                extensions={[
                    markdown({ base: markdownLanguage }),
                    EditorView.lineWrapping,
                ]}
                basicSetup={{
                    lineNumbers: false,
                    autocompletion: true,
                    drawSelection: true
                }}
            />
        </Box>
    );
}
