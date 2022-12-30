import { useSelector } from 'react-redux';

import Modal from "@/components/Modal";

export default function ModalContainer() {
  const alertModal = useSelector(({alertModal}) => alertModal);

  return (
    <>
      {
        alertModal.show && 
        <Modal  
            show={alertModal.show}
            title={alertModal.title} 
            contents={alertModal.contents} 
            /> 
      }
    </>

  )
}
//px.animaapp.com
