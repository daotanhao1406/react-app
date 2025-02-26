"use client";

import React, { useState } from "react";
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
  IconButton,
} from "@chakra-ui/react";
import { IoMenuOutline } from "react-icons/io5";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { isWindowAvailable } from "../utils/navigation";
import Content from "./Content";

type SidebarProps = {
  engine?: string;
  setChildData?: (data: string) => void;
  onCollapse?: (collapsed: boolean) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  engine,
  setChildData,
  onCollapse,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  let sidebarBg = useColorModeValue("#FFFFFF", "#FFFFFF");
  let sidebarRadius = "24px";
  let sidebarMargins = "0px";
  let sidebarBgBoxShadow = "0px 4px 15px 0px rgba(0, 0, 0, 0.08)";

  const handleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    onCollapse?.(newCollapsedState);
  };

  return (
    <>
      <Box
        position="fixed"
        minH="100%"
        zIndex={"3"}
        transform={isCollapsed ? "translateX(-225px)" : "translateX(0)"}
        transition="transform 0.3s ease-in-out"
      >
        <Box
          bg={sidebarBg}
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

      <IconButton
        aria-label="Toggle Sidebar"
        icon={isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        position="fixed"
        left={isCollapsed ? "16px" : "301px"}
        top="20px"
        backgroundColor="white"
        borderRadius="50%"
        boxShadow="md"
        size="sm"
        onClick={handleCollapse}
        zIndex={4}
        transition="left 0.3s ease-in-out"
      />
    </>
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
