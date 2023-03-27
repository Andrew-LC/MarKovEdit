import { Box, HStack } from '@chakra-ui/react';

export default function TitleBar() {
    const handleMinimize = () => {
        window.electron.ipcRenderer.sendMessage('minimizeApp', '');
    }
    const handleMaximize = () => {
        window.electron.ipcRenderer.sendMessage('maximizeApp', '');
    }
    const handleClose = () => {
        window.electron.ipcRenderer.sendMessage('closeApp', '');
    }
    return (
        <Box fontSize="1.5rem" color="#fbf1c7" p="3" pr="5" display="flex" alignItems="flex-end" justifyContent="flex-end">
            <HStack gap="5">
                <Box
                    _hover={{ cursor: 'pointer' }}
                    onClick={() => handleMinimize()}>
                    <i className=a-minus"></i>
                </Box>
                <Box
                    _hover={{ cursor: 'pointer' }}
                    onClick={() => handleMaximize()}>
                    <i className="fa-solid fa-maximize"></i>
                </Box>
                <Box _hover={{ cursor: 'pointer' }} onClick={() => handleClose()}>
                    <i className="fa-solid fa-xmark"></i>
                </Box>
            </HStack >
        </Box >
    );
}
