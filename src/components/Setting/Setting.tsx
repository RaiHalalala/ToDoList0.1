import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, AppState } from 'reducers/appSlice';
import { RootState } from 'store';
//Components
import Switch from 'ui-kit/Switch';
import Time from 'ui-kit/Time';
import { Wrapper, Name, Block, Title } from './styled';

interface SettingProps {
  className?: string;
}

const Setting: FC<SettingProps> = ({ className }: SettingProps) => {
  const dispatch = useDispatch();
  const { mode } = useSelector<RootState, AppState>(({ app }) => app);
  const onSwitch = (value: boolean) => {
    dispatch(setMode(value ? 'dark' : 'light'));
  };
  return (
    <Wrapper className={className}>
      <Name>Time</Name>
      <Block>
        <Time />
      </Block>
      <Name>Setting View</Name>
      <Block>
        <Switch onClick={onSwitch} checked={mode === 'dark'} />
        <Title>dark mode</Title>
      </Block>
    </Wrapper>
  );
};

export default Setting;
