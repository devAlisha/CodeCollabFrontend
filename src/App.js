import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from 'react-icons/fi'
import Editor from '@monaco-editor/react';
const socket = io('https://codecollabbackend.azurewebsites.net/');
function App() {
  const [text, setText] = useState('');
  const [currentRoom, setCurrentRoom] = useState('');
  const [joined, setJoined] = useState(false);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const LinkItems = [
    { name: 'Home', icon: FiHome },
    { name: 'Trending', icon: FiTrendingUp },
    { name: 'Explore', icon: FiCompass },
    { name: 'Favourites', icon: FiStar },
    { name: 'Settings', icon: FiSettings },
  ];
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    socket.on('update', (data) => {
      setText(data);
    });

    socket.on('roomJoined', ({ roomName, username }) => {
      setCurrentRoom(roomName);
      setJoined(true);
      setUsername(username);
    });

    socket.on('roomCreated', ({ roomName, username }) => {
      setCurrentRoom(roomName);
      setJoined(true);
      setUsername(username);
    });

    socket.on('roomLeft', () => {
      setCurrentRoom('');
      setJoined(false);
      setUsername('');
    });

    socket.on('updateUsers', (users) => {
      setUsersInRoom(users);
    });

    socket.on('joinRoomError', (errorMessage) => {
      setError(errorMessage);
    });

    socket.on('createRoomError', (errorMessage) => {
      setError(errorMessage);
    });

    socket.on('leaveRoomError', (errorMessage) => {
      setError(errorMessage);
    });

    socket.on('invalidPassword', () => {
      setError('Invalid password. Please try again.');
    });

  }, []);

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    socket.emit('update', { room: currentRoom, text: newText });
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const createRoom = () => {
    setError(''); // Reset error state
    socket.emit('createRoom', { username, password });
  };

  const joinRoom = () => {
    setError(''); // Reset error state
    if (currentRoom && !joined) {
      socket.emit('joinRoom', { roomName: currentRoom, username, password });
    }
  };

  const leaveRoom = () => {
    socket.emit('leaveRoom', { roomName: currentRoom, username });
  };


  const SidebarContent = ({ onClose, ...rest }) => {
    return (
      <Box
        bg={useColorModeValue('gray.100', 'gray.900')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 60 }}
        pos="fixed"
        h="full"
        {...rest}>
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Code Collab
          </Text>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
        <Stack align={'flex-start'} mx={8}>
          <Box>
            Room Id: {currentRoom}
          </Box>
          <Box>
            Password: {password}
          </Box>
          <Box cursor={'pointer'} onClick={leaveRoom}>
            Leave Room
          </Box>

        </Stack>
        <Text fontWeight={'500'} fontSize={'lg'} mx={8} mb={1} mt={8}>
          Users in room
        </Text>
        <Flex flexWrap={'wrap'} gap={2} mx={8} >

          {
            usersInRoom.map((user) => (
              <Box
                key={user.id}
                as="a"
                href="#"
                mt={2}
                style={{ textDecoration: 'none' }}
                _focus={{ boxShadow: 'none' }}>
                <Flex
                  align="center"
                  p="3"
                  borderRadius="md"
                  role="group"
                  cursor="pointer"
                  bg={'gray.800'}
                  color={'white'}
                >
                  {user.username}
                </Flex>
              </Box>
            ))
          }
        </Flex>


      </Box>
    )
  }




  const MobileNav = ({ onOpen, ...rest }) => {
    return (
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 24 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue('white', 'gray.900')}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent="flex-start"
        {...rest}>
        <IconButton
          variant="outline"
          onClick={onOpen}
          aria-label="open menu"
          icon={<FiMenu />}
        />

        <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
          Code Collab
        </Text>
      </Flex>
    )
  }

  function handleEditorChange(value, event) {
    setText(value);
    socket.emit('update', { room: currentRoom, text: value });
  }

  return (
    <div>

      {
        (!currentRoom || !joined) && (<Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bgGradient='linear(to-br, whiteAlpha.800, gray.200)'
        >
          <Stack spacing={8} mx={'auto'} maxW={'lg'} minW={'sm'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Code Collab</Heading>
              <Heading fontSize={'lg'}>Create Room or Join Room</Heading>
            </Stack>
            <Box
              rounded={'lg'}
              boxShadow={'lg'}
              p={8}
              bg={'whiteAlpha.100'}
            >
              <Stack spacing={2}>
                <FormLabel >Username</FormLabel>
                <Input type="text" value={username} onChange={handleUsernameChange} placeholder="Enter your username" />
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={handlePasswordChange} placeholder="Enter room password" />
                <Stack mt={2}>
                  <Button
                    onClick={createRoom}
                    isDisabled={joined || !password || !username}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Create Room
                  </Button>
                </Stack>
                <br />

                <FormLabel>Room ID</FormLabel>
                <Input value={currentRoom} onChange={(e) => setCurrentRoom(e.target.value)} placeholder="Enter room name" disabled={joined} />
                <Stack mt={2}>

                  <Button
                    onClick={joinRoom}
                    isDisabled={!currentRoom || joined || !password || !username}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Join Room
                  </Button>
                </Stack>
              </Stack>
              {error && <Alert status='error' mt={2}>
                <AlertIcon />
                {error}
              </Alert>}

            </Box>
          </Stack>
        </Flex>)
      }
      {
        currentRoom && joined && (
          <Box minH="100vh" bg={'gray.100'}>
            <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
            <Drawer
              isOpen={isOpen}
              placement="left"
              onClose={onClose}
              returnFocusOnClose={false}
              onOverlayClick={onClose}
              size="full">
              <DrawerContent>
                <SidebarContent onClose={onClose} />
              </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} height={'full'}>
              <Editor
                width="100%"
                height="100vh"
                defaultLanguage="javascript"
                onChange={handleEditorChange}
                value={text}
                theme='vs-dark'
                options={
                  {
                    minimap: {
                      enabled: false
                    }
                  }
                }
              />
            </Box>
          </Box>
        )
      }
    </div>
  );
}

export default App;
