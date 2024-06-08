import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text, useToast } from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import UserModal from "./UserModal";
import { BASE_URL } from "../App";
import { useState } from "react";

const UserCard = ({user, setUsers}) => {
  const toast = useToast();

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(BASE_URL + "/friends/" + user.id, {
        method: "DELETE",
      });
      const data = await res.json();
      if(!res.ok) {
        throw new Error(data.error);
      }
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      toast({
        status: "success",
        title: "Success",
        description: "User deleted successfully",
        duration: 2000,
        position: "top-center",
      });
    } catch (error) {
      toast({
        status: "error",
        title: "An error occured",
        description: error.message,
        duration: 4000,
        position: "top-center",
        isClosable: true,
      });
    }
  }

  return (
    <Card>
        <CardHeader>
            <Flex>
                <Flex flex={1} gap={4} alignItems={"center"}>
                    <Avatar src={user.imgUrl} />
                    <Box>
                        <Heading size="sm">{user.name}</Heading>
                        <Text>{user.role}</Text>
                    </Box>
                </Flex>

                <Flex>
                    {
                      user ? (
                        <UserModal 
                          state={"edit"} 
                          user={user}
                          setUsers={setUsers}
                        />
                      ) : null
                    }
                    <IconButton 
                      variant="ghost"
                      colorScheme="red"
                      size="sm"
                      aria-label="See menu"
                      icon={<BiTrash size={20} />}
                      onClick={handleDeleteUser}
                    />
                </Flex>
            </Flex>
        </CardHeader>

        <CardBody>
          <Text>
            {user.description}
          </Text>
        </CardBody>
    </Card>
  );
}

export default UserCard;
