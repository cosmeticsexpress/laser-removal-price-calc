import { ReactNode } from 'react';
import { useRecoilState, RecoilState } from 'recoil';
import { Range, getTrackBackground, Direction } from 'react-range';

interface ISliderProps {
  min: number;
  max: number;
  state: RecoilState<number>;
  className?: string;
  outputRenderer?: (value: number) => ReactNode;
}

export default function Slider({
  min,
  max,
  state,
  className = '',
  outputRenderer = (value) => value,
}: ISliderProps) {
  const [value, setValue] = useRecoilState(state);
  const output = outputRenderer(value);
  return (
    <>
      <Range
        rtl
        values={[value]}
        min={min}
        max={max}
        onChange={([value]) => setValue(value)}
        renderTrack={({ props, children }) => (
          <div
            className='flex w-full'
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{ ...props.style }}
          >
            <div
              dir='rtl'
              ref={props.ref}
              className='border-2 rounded-full h-3 w-full self-center'
              style={{
                background: getTrackBackground({
                  direction: Direction.Left,
                  values: [value],
                  colors: ['#e6c462, #876628', '#fff'],
                  min,
                  max,
                }),
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div {...props} style={props.style} className='relative'>
            <div className='absolute bottom-3 w-28'>{output}</div>
            <div className='bg-gold-900 w-4 aspect-square rounded-full' />
          </div>
        )}
      />
      {/* <input
        className={[className, 'accent-gold-500 z-10'].join(' ').trim()}
        type='range'
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
      />
      <output className='absolute left-0 -top-3.5 text-sm select-none'>
        {outputRenderer(value)}
      </output> */}
    </>
  );
}
