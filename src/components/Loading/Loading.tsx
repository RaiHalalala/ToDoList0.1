import { Wrapper, LoadingStyle } from './styled';

const Loading = () => (
  <Wrapper>
    <LoadingStyle>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="item" />
      ))}
    </LoadingStyle>
  </Wrapper>
);

export default Loading;
