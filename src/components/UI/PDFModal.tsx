import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { handleUserTestReportPdf } from "@/utils/PdfPrint"; // Import the PDF generation function
import { useState } from "react";

const PDFModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [age, setAge] = useState(0); // State for dog's age
  const [weight, setWeight] = useState(0); // State for dog's weight

  // Generate PDF
  const handlePDF = () => {
    handleUserTestReportPdf({ age, weight });
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Nutrition For Pet
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Generate Feeding Chart
              </ModalHeader>
              <ModalBody>
                <Input
                  type="number"
                  label="Age (in years)"
                  placeholder="Enter pet's age"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))} // Update age state
                  variant="bordered"
                />
                <Input
                  type="number"
                  label="Weight (in lbs)"
                  placeholder="Enter pet's weight"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))} // Update weight state
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handlePDF();
                    onClose();
                  }}
                >
                  Generate PDF
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PDFModal;
