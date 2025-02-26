"use client";

import { Box, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { isWindowAvailable } from "../utils/navigation";
import AdminNavbarLinks from "./AdminNavbarLinks";

export default function AdminNavbar(props: {
  secondary?: boolean;
  brandText?: string;
  logoText: string;
  onOpen: (...args: any[]) => any;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    isWindowAvailable() && window.addEventListener("scroll", changeNavbar);

    return () => {
      isWindowAvailable() && window.removeEventListener("scroll", changeNavbar);
    };
  });

  const { secondary } = props;
  let secondaryMargin = "0px";
  let gap = "0px";

  const changeNavbar = () => {
    if (isWindowAvailable() && window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  return (
    <Box
      zIndex="100"
      position={"fixed"}
      top={"10px"}
      borderColor={"transparent"}
      backgroundPosition="center"
      backgroundSize="cover"
      borderRadius="16px"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      alignItems={{ xl: "center" }}
      display={secondary ? "block" : "flex"}
      minH="75px"
      justifyContent={"center"}
      lineHeight="25.6px"
      mx="auto"
      mt={secondaryMargin}
      pb="8px"
      px={{
        base: "8px",
        md: "10px",
      }}
      ps={{
        base: "8px",
        md: "12px",
      }}
      w={{
        base: "calc(100vw - 8%)",
        md: "calc(100vw - 8%)",
        lg: "calc(100vw - 6%)",
        xl: "calc(100vw - 610px)",
        "2xl": "calc(100vw - 610px)",
      }}
      ms={{
        base: "0px",
        xl: "465px",
        "2xl": "465px",
      }}
    >
      <Flex
        w="100%"
        flexDirection={{
          base: "column",
          md: "row",
        }}
        alignItems={{ xl: "center" }}
        mb={gap}
      >
        <Box ms="auto" w={{ sm: "100%", md: "unset" }}>
          <AdminNavbarLinks secondary={props.secondary} />
        </Box>
      </Flex>
    </Box>
  );
}
