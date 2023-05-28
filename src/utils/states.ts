import { RecoilState, RecoilValueReadOnly, atom, selector } from 'recoil';
import { RANGES } from '@utils/values';

export const monthWorkdays = 25;

export const monthWorkdaysState = selector({
  key: 'monthWorkdays',
  get: () => monthWorkdays,
});

class CalculatorStates {
  private stateKey: string = '';

  appointmentDurationState: RecoilState<number>;
  appointmentPriceState: RecoilState<number>;
  workingHoursState: RecoilState<number>;

  dayEarningsState: RecoilValueReadOnly<number>;
  monthEarningsState: RecoilValueReadOnly<number>;

  constructor(
    stateKey: string = '',
    appointmentDuration: number,
    appointmentPrice: number
  ) {
    this.stateKey = stateKey;

    this.appointmentDurationState = atom({
      key: `${this.stateKey}_appointmentDurationState`,
      default: appointmentDuration,
    });

    this.appointmentPriceState = atom({
      key: `${this.stateKey}_appointmentPriceState`,
      default: appointmentPrice,
    });

    this.workingHoursState = atom({
      key: `${this.stateKey}_workingHoursState`,
      default: 2,
    });

    this.dayEarningsState = selector({
      key: `${this.stateKey}_dayEarningsState`,
      get: ({ get }) =>
        getDayEarnings(
          get(this.appointmentDurationState),
          get(this.appointmentPriceState),
          get(this.workingHoursState)
        ),
    });

    this.monthEarningsState = selector({
      key: `${this.stateKey}_monthEarningsState`,
      get: ({ get }) => get(this.dayEarningsState) * monthWorkdays,
    });
  }
}

const getDayEarnings = (
  appointmentDuration: number,
  appointmentPrice: number,
  workingHours: number
) => (60 / appointmentDuration) * appointmentPrice * workingHours;

export const smallAreasStates = new CalculatorStates(
  'smallAreas',
  RANGES.SMALL_AREAS.appointmentDuration.min,
  RANGES.SMALL_AREAS.appointmentPrice.min
);

export const largeAreasStates = new CalculatorStates(
  'largeAreas',
  RANGES.LARGE_AREAS.appointmentDuration.min,
  RANGES.LARGE_AREAS.appointmentPrice.min
);

export const allBodyStates = new CalculatorStates(
  'allBody',
  RANGES.ALL_BODY.appointmentDuration.min,
  RANGES.ALL_BODY.appointmentPrice.min
);

export const totalMonthEarningsState = selector({
  key: 'totalMonthEarnings',
  get: ({ get }) =>
    get(smallAreasStates.monthEarningsState) +
    get(largeAreasStates.monthEarningsState) +
    get(allBodyStates.monthEarningsState),
});
