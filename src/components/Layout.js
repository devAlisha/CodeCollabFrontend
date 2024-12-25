import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import { MobileNav, SidebarContent } from "./SidebarContent";
import { memo } from "react";

export const Layout = memo(({ children, users, password, room, onLeave }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        users={users}
        room={room}
        onLeave={onLeave}
        password={password}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent
            onClose={onClose}
            users={users}
            room={room}
            onLeave={onLeave}
            password={password}
          />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} display={{ base: "flex", md: "none" }} />
      <Box ml={{ base: 0, md: 60 }} p="1">
        {children}
      </Box>
    </Box>
  );
});
