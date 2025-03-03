"use client";

import React from "react";
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  Icon,
  useColorModeValue,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { IoMenuOutline } from "react-icons/io5";
import Content from "./Content";
import { isWindowAvailable } from "../utils/navigation";

type SidebarProps = {
  engine?: string;
  setChildData?: (data: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ engine, setChildData }) => {
  let variantChange = "0.2s linear";
  let sidebarBg = useColorModeValue("#FFFFFF", "#FFFFFF");
  let sidebarRadius = "24px";
  let sidebarMargins = "0px";
  let sidebarBgBoxShadow = "0px 4px 15px 0px rgba(0, 0, 0, 0.08)";

  return (
    <Box
      display={{ base: "none", xl: "block" }}
      position="fixed"
      minH="100%"
      zIndex={"3"}
    >
      <Box
        bg={sidebarBg}
        transition={variantChange}
        w="285px"
        ms={{
          sm: "16px",
        }}
        my={{
          sm: "16px",
        }}
        h="calc(100vh - 32px)"
        m={sidebarMargins}
        border={"1px solid"}
        borderColor={"#E0E0E0"}
        boxShadow={sidebarBgBoxShadow}
        borderRadius={sidebarRadius}
        minH="100%"
        overflowX="hidden"
      >
        <Content engine={engine} setChildData={setChildData} />
      </Box>
    </Box>
  );
};

export const SidebarResponsive: React.FC<SidebarProps> = ({
  engine,
  setChildData,
}) => {
  let sidebarBackgroundColor = useColorModeValue("white", "white");
  let menuColor = useColorModeValue("gray.400", "gray.400");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex display={{ sm: "flex", xl: "none" }} alignItems="center">
      <Flex w="max-content" h="max-content" onClick={onOpen}>
        <Icon
          as={IoMenuOutline}
          color={menuColor}
          my="auto"
          w="20px"
          h="20px"
          me="10px"
          _hover={{ cursor: "pointer" }}
        />
      </Flex>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={
          isWindowAvailable() && document.documentElement.dir === "rtl"
            ? "right"
            : "left"
        }
      >
        <DrawerOverlay />
        <DrawerContent
          w="285px"
          maxW="285px"
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          borderRadius="16px"
          bg={sidebarBackgroundColor}
        >
          <DrawerCloseButton
            zIndex="3"
            onClick={onClose}
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW="285px" px="0rem" pb="0">
            <Content engine={engine} setChildData={setChildData} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Sidebar;
