import { combine, createEvent, sample } from "effector";

import {
  coffeeInGrams$,
  gramOnLiter$,
  ratioBottom$,
  ratioTop$,
  waterInGrams$,
  changeGramOnLiter,
  changeRatioTop,
  changeRatioBottom,
  changeCoffeeInGrams,
  changeWaterInGrams,
} from "./model";

export const gramOnLiterView$ = combine(gramOnLiter$, Math.round);
export const ratioTopView$ = combine(ratioTop$, Math.round);
export const ratioBottomView$ = combine(ratioBottom$, Math.round);
export const coffeeInGramsView$ = combine(coffeeInGrams$, Math.round);
export const waterInGramsView$ = combine(waterInGrams$, Math.round);

export const onChangeGramOnLiter = createEventHandler(changeGramOnLiter);
export const onChangeRatioTop = createEventHandler(changeRatioTop);
export const onChangeRatioBottom = createEventHandler(changeRatioBottom);
export const onChangeCoffeeInGrams = createEventHandler(changeCoffeeInGrams);
export const onChangeWaterInGrams = createEventHandler(changeWaterInGrams);

function createEventHandler(target) {
  const result = createEvent();

  sample({
    clock: result,
    fn: (e) => e.target.value,
    target,
  });

  return result;
}
