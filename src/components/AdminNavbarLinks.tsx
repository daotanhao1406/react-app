"use client";

import {
  Box,
  Center,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import CustomAvatar from "./CustomAvatar";
import { SidebarResponsive } from "./Sidebar";

export default function HeaderLinks(props: { secondary: boolean }) {
  const [avatar, setAvatar] = useState<string | undefined>("");
  const { secondary } = props;
  const menuBg = useColorModeValue("white", "white");
  const textColor = useColorModeValue("#282828", "#282828");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "0px 41px 75px rgba(112, 144, 176, 0.18)"
  );

  const [email, setEmail] = useState("");
  const [isUserName, setIsUserName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filedata, setFile] = useState<File | null>(null);

  return (
    <Flex
      zIndex="100"
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
      flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
    >
      <SidebarResponsive />
      <Menu>
        <MenuList
          boxShadow={shadow}
          p="20px"
          me={{ base: "30px", md: "unset" }}
          borderRadius="20px"
          bg={menuBg}
          border="none"
          mt="22px"
          minW={{ base: "unset" }}
          maxW={{ base: "360px", md: "unset" }}
        >
          {/* Menu content */}
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton p="0px" style={{ position: "relative" }}>
          <Box>
            {avatar ? (
              <Image
                boxSize="44px"
                borderRadius={"50%"}
                objectFit="cover"
                src={avatar || "/placeholder.svg"}
                alt="Avatar"
                border={"1px solid"}
                borderColor={"#FFFFFF"}
                boxShadow={"0px 0px 4px 0px rgba(0, 0, 0, 0.08)"}
              />
            ) : (
              <CustomAvatar backgroundColor="#11047A" />
            )}
          </Box>
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="0px"
          mt="10px"
          borderRadius="20px"
          bg={menuBg}
          _hover={{ bg: "#ffffff", color: "#000000", textColor: "#000000" }}
          border="none"
        >
          <Flex
            alignItems={"flex-end"}
            borderBottom="1px solid"
            borderColor={"#eeeeee"}
            ps="20px"
            pt="16px"
            pb="10px"
          >
            <Box>
              {avatar ? (
                <Image
                  boxSize="44px"
                  borderRadius={"50%"}
                  objectFit="cover"
                  src={avatar || "/placeholder.svg"}
                  alt="Avatar"
                  border={"1px solid"}
                  borderColor={"#FFFFFF"}
                  boxShadow={"0px 0px 4px 0px rgba(0, 0, 0, 0.08)"}
                />
              ) : (
                <CustomAvatar backgroundColor="#11047A" />
              )}
            </Box>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: "none" }}
            />
            <Box
              onClick={() => fileInputRef.current?.click()}
              cursor={"pointer"}
              ms={"-22px"}
              bg={"#fafafae6"}
              zIndex={"1"}
              boxSize="32px"
              borderRadius={"50%"}
            >
              <Center h="100%">
                <Image boxSize="20px" objectFit="cover" alt="Pen" />
              </Center>
            </Box>
          </Flex>
          <Flex flexDirection="column" p="10px">
            <MenuItem
              _hover={{ bg: "#ffffff", color: "#000000", textColor: "#000000" }}
              _focus={{ bg: "none" }}
              borderRadius="8px"
              px="14px"
              cursor={"default"}
            >
              <Text fontWeight="700" fontSize="sm" color={textColor}>
                👋&nbsp; Hey, {isUserName}
              </Text>
            </MenuItem>
            <MenuItem
              _hover={{ bg: "#ffffff", color: "#000000", textColor: "#000000" }}
              _focus={{ bg: "none" }}
              borderRadius="8px"
              cursor={"default"}
              px="14px"
            >
              <Text fontWeight="500" fontSize="sm">
                {email}
              </Text>
            </MenuItem>
            <MenuItem
              _hover={{ bg: "#ffffff" }}
              _focus={{ bg: "none" }}
              color="red.400"
              borderRadius="8px"
              px="14px"
            >
              <Text fontWeight="500" fontSize="sm">
                Log out
              </Text>
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}
