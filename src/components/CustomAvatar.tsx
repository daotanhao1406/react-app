import { Avatar, Box } from "@chakra-ui/react";
interface AvatarProps {
  name: string;
  backgroundColor: string;
}

const CustomAvatar: React.FC<AvatarProps> = ({ name, backgroundColor }) => {
  return (
    <Box position="relative" display="inline-block">
      <Avatar
        className="avatar-box"
        name={name}
        w={"44px"}
        h={"44px"}
        bg={backgroundColor}
        fontSize={"14px"}
        color="white"
        fontWeight="bold"
        textAlign="center"
      />
    </Box>
  );
};

export default CustomAvatar;
