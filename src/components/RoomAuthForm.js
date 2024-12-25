import {
  Stack,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  Heading,
  Card,
  Flex,
} from "@chakra-ui/react";

const FormField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  isDisabled = false,
}) => (
  <Stack spacing={1}>
    <FormLabel htmlFor={label.toLowerCase()}>{label}</FormLabel>
    <Input
      id={label.toLowerCase()}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={isDisabled}
    />
  </Stack>
);

const RoomAuthForm = ({
  username,
  password,
  currentRoom,
  error,
  handleUsernameChange,
  handlePasswordChange,
  handleRoomChange,
  createRoom,
  joinRoom,
  isJoined,
}) => (
  <Flex
    minH="100vh"
    align="center"
    justify="center"
    bgGradient="linear(to-br, whiteAlpha.800, gray.200)"
  >
    <Stack spacing={8} mx="auto" maxW="lg" minW="sm" py={12} px={6}>
      <Stack align="center">
        <Heading fontSize="4xl">Code Collab</Heading>
        <Heading fontSize="lg" color="gray.600">
          Create or Join a Room
        </Heading>
      </Stack>

      <Card rounded="xl" p={8} bg="whiteAlpha.300">
        <Stack spacing={4}>
          <FormField
            label="Username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter your username"
          />

          {/* Password Field */}
          <FormField
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter room password"
          />

          {/* Create Room Button */}
          <Button
            onClick={createRoom}
            isDisabled={isJoined || !password || !username}
            bg="blue.400"
            color="white"
            _hover={{ bg: "blue.500" }}
          >
            Create Room
          </Button>

          {/* Room ID Field */}
          <FormField
            label="Room ID"
            value={currentRoom}
            onChange={handleRoomChange}
            placeholder="Enter room name"
            isDisabled={isJoined}
          />

          {/* Join Room Button */}
          <Button
            onClick={joinRoom}
            isDisabled={!currentRoom || isJoined || !password || !username}
            bg="blue.400"
            color="white"
            _hover={{ bg: "blue.500" }}
          >
            Join Room
          </Button>
        </Stack>

        {/* Error Message */}
        {error && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
      </Card>
    </Stack>
  </Flex>
);

export default RoomAuthForm;
