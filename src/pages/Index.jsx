import { Container, Text, VStack } from "@chakra-ui/react";
import CSVUploadEditTool from "../components/CSVUploadEditTool";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">CSV Upload and Edit Tool</Text>
        <CSVUploadEditTool />
      </VStack>
    </Container>
  );
};

export default Index;