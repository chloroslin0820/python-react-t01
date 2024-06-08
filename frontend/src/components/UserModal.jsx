import { Button, Modal, ModalBody, Flex, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, FormControl, FormLabel, Input, Textarea, RadioGroup, Radio, ModalFooter, IconButton } from "@chakra-ui/react";
import { BiAddToQueue, BiEditAlt } from "react-icons/bi";

const UserModal = ({ state }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {
        state === "create" &&
        <Button onClick={onOpen}>
          <BiAddToQueue size={20} />
        </Button>
      }
      {
        state === "edit" &&
        <IconButton
          onClick={onOpen}
          variant='ghost'
          colorScheme='blue'
          aria-label='See menu'
          size={"sm"}
          icon={<BiEditAlt size={20} />}
        />
      }

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            My new BFF 😍
          </ModalHeader>
          <ModalCloseButton />
            <ModalBody pb={6}>
              <Flex alignItems={"center"} gap={4}>

                <FormControl>
                  <FormLabel>Full Name</FormLabel>
                  <Input placeholder="John Doe" />
                </FormControl>

                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input placeholder="Software Engineer" />
                </FormControl>

              </Flex>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  resize={"none"}
                  overflow={"hidden"}
                  placeholder="He's a software engineer who loves to code and build things."
                />
              </FormControl>

              {
                state === "create" &&
                <RadioGroup mt={4}>
                  <Flex gap={5}>
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
                  </Flex>
                </RadioGroup>
              }

            </ModalBody>
            
            <ModalFooter>
              <Button colorScheme="blue" mr={3}>
                Add
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UserModal;
