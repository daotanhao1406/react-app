import { Box } from "@chakra-ui/react";
import DefaultAnswer from "../components/DefaultAnswer";

export default function Page1() {
  return (
    <Box h={"100%"}>
      <DefaultAnswer name={"abc"} />
      <Box maxW="8xl" margin={"auto"}>
        <Box
          position={"fixed"}
          bottom={"52px"}
          className="history-search-box"
          w={{ base: "100%", md: "100%", xl: "100%" }}
          maxW={{
            base: "80%",
            lg: "calc(100% - 320px)",
            xl: "calc(100% - 660px)",
            "2xl": "calc(100% - 720px)",
          }}
          m={"auto"}
          ms={{ base: "0", lg: "40px", xl: "60px" }}
        >
          <Box
            bg={"rgba(255, 255, 255, 1)"}
            h={"auto"}
            border={"1px solid"}
            borderColor={"#E0E0E0"}
            borderRadius={"18px"}
            color={"#828282"}
          ></Box>
        </Box>
      </Box>
    </Box>
  );
}
