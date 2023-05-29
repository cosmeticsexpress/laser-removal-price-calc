import { useRecoilState, RecoilState } from 'recoil';

interface ISliderProps {
  min: number;
  max: number;
  state: RecoilState<number>;
  className?: string;
}

export default function Slider({ min, max, state, className }: ISliderProps) {
  const [value, setValue] = useRecoilState(state);
  return (
    <>
      <input
        className={[className, 'accent-gold-500 z-10'].join(' ').trim()}
        type='range'
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
      />
      <output className='absolute left-0 -top-3.5 text-sm select-none'>
        {value}
      </output>
    </>
  );
}
