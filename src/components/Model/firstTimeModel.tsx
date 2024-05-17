import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, Button } from 'react-bootstrap';

const FirstTimeModal = () => {
  const [modal, setModal] = useState(false);

  // Check if it's the first time visiting the site
  useEffect(() => {
    const visitedBefore = localStorage.getItem('visitedBefore');
    if (!visitedBefore) {
      setModal(true);
      localStorage.setItem('visitedBefore', 'true');
    }
  }, []);

  const toggle = () => setModal(!modal);

  const handleProceed = () => {
    setModal(false);
  };

  return (
    <Modal isOpen={modal} toggle={toggle} centered>
      <ModalBody>
        <h3>Attention</h3>
        <p>
          It would be better to try this on a desktop for a better immersive experience.
        </p>
        <p>Please consider starring the project on GitHub!</p>
        <Button color='primary' onClick={handleProceed}>Proceed</Button>
      </ModalBody>
    </Modal>
  );
};

export default FirstTimeModal;
