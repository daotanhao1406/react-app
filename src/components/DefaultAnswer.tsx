import {
  Box,
  Flex,
  Highlight,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface DefultAnserProps {
  name: string | null;
  disabledDefaultQuestion?: boolean;
}

const DefultAnser: React.FC<DefultAnserProps> = ({
  name = "abc",
  disabledDefaultQuestion,
}) => {
  const aiQuestion = [
    {
      id: "1",
      heading: "Plan a trip",
      subHeading: "to see the northern lights in Norway",
    },
    {
      id: "2",
      heading: "Give me ideas",
      subHeading: "about how to plan my new yearsresolutions",
    },
    {
      id: "3",
      heading: "Write a text",
      subHeading: "inviting my neighbours to a barbecue",
    },
    {
      id: "4",
      heading: "Recommend a dish",
      subHeading: "to bring to apotluck",
    },
  ];

  return (
    <>
      <Flex
        w={{
          base: "100%",
          md: "100%",
          xl: "100%",
          "2xl": "calc(100% - 120px)",
        }}
        m={"auto"}
        h={"100%"}
        direction={"column"}
        justifyContent={"space-between"}
      >
        <Box>
          <Flex
            direction={"column"}
            justify={"center"}
            align={"center"}
            gap={"90px"}
          >
            <Image boxSize="140px" objectFit="cover" alt="Dan Abramov" />
            <Box>
              <Text
                fontWeight="normal"
                fontSize={"34px"}
                color={"#0E205C"}
                textAlign={"center"}
              >
                <Highlight
                  query={`${name || "Loading.."}!`}
                  styles={{
                    py: "1",
                    fontWeight: "bold",
                    color: "#0E205C",
                  }}
                >
                  {`Hey, ${name || "Loading.."}!`}
                </Highlight>
              </Text>
              <Text
                fontWeight="normal"
                fontSize={"34px"}
                color={"#0E205C"}
                textAlign={"center"}
              >
                What's on your mind?
              </Text>
            </Box>
          </Flex>
        </Box>
        <SimpleGrid
          columns={{ sm: 1, md: 1, lg: 2 }}
          spacingX="24px"
          spacingY="24px"
        >
          {!disabledDefaultQuestion &&
            aiQuestion.map((message) => (
              <Box
                key={message?.id}
                bg={"rgba(255, 255, 255, 0.5)"}
                cursor={"pointer"}
                border={"1px solid"}
                borderColor={"#FFFFFF"}
                boxShadow={"0px 0px 2px 0px #00000014"}
                borderRadius={"8px"}
                p={"16px"}
              >
                <Flex align={"center"} justify={"space-between"}>
                  <Box>
                    <Text
                      fontSize="16px"
                      fontWeight={"500"}
                      lineHeight="19.36px"
                      textColor={"#282828"}
                      textAlign="left"
                    >
                      {message.heading}
                    </Text>
                    <Text
                      mt={"8px"}
                      fontSize="12px"
                      fontWeight={"400"}
                      lineHeight="15.62px"
                      textColor={"#282828"}
                      textAlign="left"
                    >
                      {message.subHeading}
                    </Text>
                  </Box>
                  <Image boxSize="30px" objectFit="cover" alt="Dan Abramov" />
                </Flex>
              </Box>
            ))}
        </SimpleGrid>
      </Flex>
    </>
  );
};

export default DefultAnser;
