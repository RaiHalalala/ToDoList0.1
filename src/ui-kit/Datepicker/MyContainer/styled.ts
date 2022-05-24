import styled from '@emotion/styled';

export const Wrapper = styled.div`
  & > .react-datepicker {
    border: none;
    border-radius: 10px;
    & > .react-datepicker__month-container {
      border-radius: inherit;
      background-color: ${({ theme }) => theme.colors.bgLight}e8;
      color: ${({ theme }) => theme.colors.secondary};

      & > .react-datepicker__header {
        border: none;
        background: ${({ theme }) => theme.colors.bgLight};

        & > .react-datepicker__current-month {
          color: ${({ theme }) => theme.colors.secondary};
        }
      }
      &
        > .react-datepicker__month
        > .react-datepicker__week
        > .react-datepicker__day {
        color: ${({ theme }) => theme.colors.secondary};
        &--disabled {
          opacity: 0.5;
        }
        &--selected,
        &--today {
          background-color: ${({ theme }) => theme.colors.background};
          border-radius: 5px;
          opacity: 1;
        }
        &:hover {
          background-color: ${({ theme }) => theme.colors.background}e8;
        }
      }
    }
  }
`;
