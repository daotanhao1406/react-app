/*eslint-disable*/
import { Flex, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex
      position={"fixed"}
      w={"100%"}
      mx={"auto"}
      bottom={"15px"}
      zIndex="3"
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems="center"
      justifyContent="center"
      px={{ base: "30px", md: "50px" }}
    >
      <Text
        color={"gray.500"}
        fontSize={{ base: "xs", md: "sm" }}
        textAlign={{
          base: "center",
          xl: "start",
        }}
        fontWeight="500"
        mb={{ base: "10px", xl: "0px" }}
      >
        &copy; {new Date().getFullYear()}
        <Text as="span" fontWeight="500" ms="4px" color={"gray.500"}>
          Insightsdigital.ai
        </Text>
      </Text>
    </Flex>
  );
}
