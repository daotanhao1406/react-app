import React, { ReactNode, useState } from "react";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import AppWrappers from "./components/AppWrapper";
import Footer from "./components/Footer";
import AdminNavbar from "./components/NavbarAdmin";
import Sidebar from "./components/Sidebar";
import Page1 from "./page/Page1";

export default function RootLayout({ children }: { children: ReactNode }) {
  const { onOpen } = useDisclosure();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  return (
    <html lang="en">
      <body id={"root"}>
        <AppWrappers>
          <Flex direction="row">
            <Sidebar
              onCollapse={(collapsed) => setIsSidebarCollapsed(collapsed)}
            />

            <Box
              float="right"
              minHeight="100vh"
              height="100vh"
              overflow="auto"
              bgGradient={"linear(to-l, #FFFFFF , #CDEEFE)"}
              bgSize="cover"
              bgPosition="center"
              bgRepeat="no-repeat"
              maxHeight="100%"
              // w={{ base: '100%', xl: 'calc( 100% - 0px )' }}
              // maxWidth={{ base: '100%', xl: 'calc( 100% - 0px )' }}
              // transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
              // transitionDuration=".2s, .2s, .35s"
              // transitionProperty="top, bottom, width"
              // transitionTimingFunction="linear, linear, ease"
              flex="1"
              transition="margin-left 0.3s ease-in-out"
              ml={isSidebarCollapsed ? "60px" : "285px"}
              p="4"
            >
              <Box
                pt={{ base: "60px", md: "40px" }}
                mx={"auto"}
                display={"flex"}
                justifyContent={"center"}
              >
                <AdminNavbar
                  onOpen={onOpen}
                  logoText={"InsightsDigital UI Dashboard PRO"}
                />
              </Box>
              <Box mx="auto" position={"relative"} zIndex={"1"}>
                <Page1 />
              </Box>
              <Box>
                <Footer />
              </Box>
            </Box>
          </Flex>
        </AppWrappers>
      </body>
    </html>
  );
}
