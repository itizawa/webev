import style from 'styled-components';

export const StyledButton = style.button`
position: fixed;
right: 20px;
bottom: 20px;
opacity: 0;
transition: opacity 0.4s;
transition-duration: 200ms;
transition-property: all;

&.show{
  opacity: 0.5;
  &:hover{
    opacity: 0.7;
  }
}
`;
