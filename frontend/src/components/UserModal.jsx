import { Button, Modal, ModalBody, Flex, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, FormControl, FormLabel, Input, Textarea, RadioGroup, Radio, ModalFooter, IconButton, useToast, Spinner } from "@chakra-ui/react";
import { BiAddToQueue, BiEditAlt } from "react-icons/bi";
import { BASE_URL } from "../App";
import { useEffect, useState } from "react";

const UserModal = ({ state, user, setUsers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    role: "",
    description: "",
    gender: "male",
  });
  const toast =useToast();
  const [createInputs, setCreateInputs] = useState(inputs);
  const [editInputs, setEditInputs] = useState(inputs);

  useEffect(() => {

    if (state === "edit" && inputs.name === "") {
      setInputs({
        name: user.name,
        role: user.role,
        description: user.description,
      });
    }

    if(state === "create"){
      setCreateInputs(inputs);
    } else {
      setEditInputs(inputs);
    }
  }, [inputs])

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    if (!createInputs.name || !createInputs.role || !createInputs.description) {
      toast({
        status: "error",
        title: "Validation Error",
        description: "All fields are required.",
        duration: 4000,
        position: "top-center",
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(BASE_URL + "/friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createInputs),
      })

      const data = await res.json();
      if(!res.ok) {
        throw new Error(data.error);
      }

      toast({
        status: "success",
        title: "Yayy! 🥳",
        description: `Friend ${state === "create" ? "created" : "edited"} successfully.`,
        duration: 2000,
        position: "top-center",
      });

      onClose();
      setUsers((prev) => [...prev, data]);

    } catch (error) {
      toast({
        status: "error",
        title: "An error occured",
        description: error.message,
        duration: 4000,
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
      setInputs({
        name: "",
        role: "",
        description: "",
        gender: "male",
      });
    }
  };

  const handleEditSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const res = await fetch(BASE_URL + "/friends/" + user.id, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(editInputs),
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error);
			}
			setUsers((prev) => prev.map((u) => (u.id === user.id ? data : u)));
			toast({
				status: "success",
				title: "Yayy! 🎉",
				description: "Friend updated successfully.",
				duration: 2000,
				position: "top-center",
			});
			onClose();
		} catch (error) {
			toast({
				status: "error",
				title: "An error occurred.",
				description: error.message,
				duration: 4000,
				position: "top-center",
			});
		} finally {
			setIsLoading(false);
		}
	};

  return (
    <>
      {
        state === "create" && (
          <Button onClick={onOpen}>
            <BiAddToQueue size={20} />
          </Button>
        )
      }
      {
        state === "edit" && (
          <IconButton
            onClick={onOpen}
            variant='ghost'
            colorScheme='blue'
            aria-label='See menu'
            size={"sm"}
            icon={<BiEditAlt size={20} />}
          />
        )
      }

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <form 
          onSubmit={
            state === "create" 
            ? handleAddSubmit 
            : handleEditSubmit
          }
        >
          <ModalContent>
            <ModalHeader>
              My new BFF 😍
            </ModalHeader>
            <ModalCloseButton />
              <ModalBody pb={6}>
                <Flex alignItems={"center"} gap={4}>

                  <FormControl>
                    <FormLabel>Full Name</FormLabel>
                    <Input 
                      placeholder="What's your name?"
                      value={inputs.name}
                      onChange={
                        (e) => setInputs({
                        ...inputs, 
                        name: e.target.value})}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Role</FormLabel>
                    <Input 
                      placeholder="What's your role" 
                      value={inputs.role}
                      onChange={
                        (e) => setInputs({
                        ...inputs, 
                        role: e.target.value})}
                    />
                  </FormControl>

                </Flex>

                <FormControl mt={4}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    resize={"none"}
                    overflow={"hidden"}
                    placeholder="Tell us more about you."
                    value={inputs.description}
                    onChange={
                      (e) => setInputs({
                      ...inputs, 
                      description: e.target.value})}
                  />
                </FormControl>

                {
                  state === "create" && (
                    <RadioGroup 
                      mt={4}
                      value={inputs.gender}
                      onChange={(value) =>
                        setInputs({
                          ...inputs,
                          gender: value,
                        })
                      }
                    >
                      <Flex gap={5}>
                        <Radio 
                          value="male"
                          onChange={
                            (e) => setInputs({
                            ...inputs, 
                            gender: e.target.value})}
                        >
                          Male
                        </Radio>
                        <Radio 
                          value="female"
                          onChange={
                            (e) => setInputs({
                            ...inputs, 
                            gender: e.target.value})}
                        >
                          Female
                        </Radio>
                      </Flex>
                    </RadioGroup>
                  )
                }

              </ModalBody>
              
              <ModalFooter>
                <Button 
                  colorScheme="blue" 
                  mr={3} 
                  type="submit" 
                  isLoading={isLoading}
                >
                  {state === "create" ? "Add" : "Update"}
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

export default UserModal;
