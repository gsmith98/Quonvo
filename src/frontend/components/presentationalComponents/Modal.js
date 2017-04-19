import Modal from 'react-modal';

const customStyles = {
  overlay: {
    zIndex: '10'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '12px'
  }
};

const newModal = {
  overlay: Object.assign({}, Modal.defaultStyles.overlay, customStyles.overlay),
  content: Object.assign({}, Modal.defaultStyles.content, customStyles.content)
};

Modal.defaultStyles = newModal;

export default Modal;
