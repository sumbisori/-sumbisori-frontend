import reactDom from 'react-dom';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const ModalPortal = ({ children }: Props) => {
  const el = document.getElementById('modal') as HTMLElement;
  return reactDom.createPortal(children, el);
};

export default ModalPortal;
