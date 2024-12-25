import {
  IconButton,
  Flex,
  useColorModeValue,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FiClipboard } from "react-icons/fi";

export const RoomInfo = ({ text, value }) => {
  const toast = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      toast({
        title: "Copied to clipboard",
        description: `${text} value has been copied.`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    });
  };

  return (
    <Flex
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      gap={4}
    >
      <Text>{text}</Text>
      <Text
        fontFamily="monospace"
        fontSize="sm"
        color={useColorModeValue("gray.600", "gray.400")}
      >
        {value}
      </Text>
      <IconButton icon={<FiClipboard />} onClick={handleCopy} />
    </Flex>
  );
};
