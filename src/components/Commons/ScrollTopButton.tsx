import { VFC } from 'react';

export const ScrollTopButton: VFC = () => {
  return (
    <a id="scroll-to-top" className="btn btn-light btn-lg" role="button">
      <i className="fas fa-chevron-up"></i>
    </a>
  );
};
