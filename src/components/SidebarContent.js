import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  Button,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { RoomInfo } from "./RoomInfo";
import { memo } from "react";

export const SidebarContent = memo(
  ({ onClose, users, room, password, onLeave, ...rest }) => {
    return (
      <Box
        transition="3s ease"
        bg={useColorModeValue("white", "gray.900")}
        borderRight="1px"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
        w={{ base: "full", md: 60 }}
        pos="fixed"
        h="full"
        {...rest}
      >
        <Flex h="20" alignItems="center" mx="4" justifyContent="space-between">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Code Collab
          </Text>
          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
        </Flex>
        <Box
          px={4}
          h="85%"
          display={"flex"}
          flexDirection={"column"}
          overflowY={"auto"}
          justifyContent={"space-between"}
        >
          <Flex
            alignItems="start"
            justifyContent="center"
            flexDirection="column"
            gap={4}
          >
            <RoomInfo text={"Room"} value={room} />
            <RoomInfo text={"Password"} value={password} />
            <Text fontSize="lg" fontFamily="monospace" fontWeight="bold">
              Users
            </Text>
            <Flex width={"100%"} justifyContent="flex-start" gap={2}>
              {users?.map((user, index) => (
                <Text
                  key={index}
                  fontFamily="monospace"
                  bg={"gray.200"}
                  w={"fit-content"}
                  p={2}
                  borderRadius={5}
                >
                  {user.username}
                </Text>
              ))}
            </Flex>
          </Flex>
          <Button onClick={onLeave} colorScheme="red">
            Leave Room
          </Button>
        </Box>
      </Box>
    );
  }
);

export const MobileNav = memo(({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Code Collab
      </Text>
    </Flex>
  );
});
