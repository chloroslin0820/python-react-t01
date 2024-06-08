import { Box, Container, Flex, Text, Button, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import UserModal from "./UserModal";

const Navbar = ({ setUsers }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"900px"}>
      <Box
        px={4}
        my={4}
        borderRadius={5}
        bg={useColorModeValue("gray.200", "gray.700")}
      >
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              gap={3}
              display={{base:"none", sm:"flex"}}
            >
              <Flex>
                <img 
                  src="/python.png" 
                  alt="python logo"
                  width={50}
                  height={50}
                />
              </Flex>
              <Flex display={{base:"none", md:"flex"}} gap={3}>
                <Text fontSize={"40px"}>+</Text>
                <img 
                  src="/flask.png" 
                  alt="flask logo"
                  width={60}
                  height={60}
                />
              </Flex>
              <Flex gap={3}>
                <Text fontSize={"40px"}>+</Text>
                <img 
                  src="/javascript.png" 
                  alt="javascript logo"
                  width={55}
                  height={55}
                />
              </Flex>
              <Flex display={{base:"none", md:"flex"}} gap={3}>
                <Text fontSize={"40px"}>+</Text>
                <img 
                  src="/react.png" 
                  alt="react logo"
                  width={50}
                  height={40}
                />
              </Flex>
              <Flex gap={3}>
                <Text fontSize={"40px"}>=</Text>
                <img 
                  src="/explode.png" 
                  alt="explode head"
                  width={50}
                  height={50}
                />
              </Flex>
            </Flex>
            <Flex
              gap={3}
              alignItems={"center"}
            >
              <Text
                fontSize={"lg"}
                fontWeight={500}
                display={{base:"none", md:"block"}}
              >
                BFFShip🔥
              </Text>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <IoMoon size={20} /> : <LuSun size={20} />}
              </Button>
              <UserModal state={"create"} setUsers={setUsers} />
            </Flex>
        </Flex>
      </Box>
    </Container>
  );
}

export default Navbar;
