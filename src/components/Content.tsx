import { Box, Flex, Image, Text } from "@chakra-ui/react";

type SidebarProps = {
  engine?: string | undefined;
  setChildData?: (data: string) => void | undefined;
};

const SidebarContent: React.FC<SidebarProps> = ({ engine, setChildData }) => {
  return (
    <Flex
      direction="column"
      height="100%"
      p="26px"
      borderRadius="30px"
      justify={"space-between"}
    >
      <Flex
        direction="column"
        height="100%"
        justify={"flex-start"}
        maxH={"calc(100% - 100px)"}
        overflowY={"hidden"}
      >
        <Box
          borderBottom={"1px"}
          borderStyle={"solid"}
          borderColor={"#E0E0E0"}
          pb={"32px"}
        >
          <Image boxSize="100%" objectFit="cover" alt="New Logo" />
        </Box>
        {!history ? (
          <Flex
            direction="column"
            alignItems="flex-start"
            justifyContent="flex-start"
            gap="8px"
            mt="16px"
            overflowY={"auto"}
          >
            abc
          </Flex>
        ) : (
          <>
            <Box overflowY={"auto"}>abc</Box>
          </>
        )}
      </Flex>
      <Box
        borderTop={"1px"}
        borderStyle={"solid"}
        borderColor={"#E0E0E0"}
        pb={"16px"}
        cursor="pointer"
      >
        <Box
          py="12px"
          px="16px"
          h="auto"
          w="100%"
          justifyContent="flex-start"
          backdropFilter="blur(10px)"
          borderRadius={"16px"}
          mt={"16px"}
        >
          <Flex
            alignItems="center"
            justifyContent="space-between"
            gap="16px"
            w={"100%"}
          >
            <Flex alignItems="center" justifyContent="flex-start" gap="16px">
              <Image boxSize="24px" objectFit="cover" alt={"bell"} />
              <Text fontSize="16px" lineHeight="19.36px" textAlign="left">
                History
              </Text>
            </Flex>
            {history && (
              <Image
                boxSize="18px"
                objectFit="cover"
                alt={"bell"}
                cursor={"pointer"}
              />
            )}
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default SidebarContent;
