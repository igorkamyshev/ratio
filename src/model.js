import { createEvent, restore, sample } from "effector";
import { spread } from "patronum";

export const appStarted = createEvent();

/* -- Настройки -- */

/* Сколько грамм кофе используется на литр воды */
export const changeGramOnLiter = createEvent();
export const gramOnLiter$ = restore(changeGramOnLiter, 60);

/* Соотношение кофе к воде, верхняя цифра */
export const changeRatioTop = createEvent();
export const ratioTop$ = restore(changeRatioTop, 1);

/* Соотношение кофе к воде, нижняя цифра */
export const changeRatioBottom = createEvent();
export const ratioBottom$ = restore(changeRatioBottom, 16);

/* Сколько кофе будет использновано в рецепте */
export const changeCoffeeInGrams = createEvent();
export const coffeeInGrams$ = restore(changeCoffeeInGrams, 18);

/* Сколько воды будет использовано в рецепте */
export const changeWaterInGrams = createEvent();
export const waterInGrams$ = restore(changeWaterInGrams, 300);

/* -- Расчеты -- */

sample({
  clock: [
    changeGramOnLiter,
    sample({ clock: appStarted, source: gramOnLiter$ }),
  ],
  fn: (gramOnLitter) => ({ top: 1, bottom: 1000 / gramOnLitter }),
  target: spread({ top: ratioTop$, bottom: ratioBottom$ }),
});

sample({
  clock: [
    sample({
      clock: changeRatioTop,
      source: ratioBottom$,
      fn: (ratioBottom, ratioTop) => ({ ratioBottom, ratioTop }),
    }),
    sample({
      clock: changeRatioBottom,
      source: ratioTop$,
      fn: (ratioTop, ratioBottom) => ({ ratioBottom, ratioTop }),
    }),
  ],
  fn: ({ ratioBottom, ratioTop }) => (ratioTop / ratioBottom) * 1000,
  target: gramOnLiter$,
});

sample({
  clock: [
    changeCoffeeInGrams,
    sample({
      clock: [gramOnLiter$.updates, appStarted],
      source: coffeeInGrams$,
    }),
  ],
  source: gramOnLiter$,
  fn: (gramOnLiter, coffeeInGrams) => (coffeeInGrams / gramOnLiter) * 1000,
  target: waterInGrams$,
});

sample({
  clock: changeWaterInGrams,
  source: gramOnLiter$,
  fn: (gramOnLiter, waterInGrams) => (waterInGrams / 1000) * gramOnLiter,
  target: coffeeInGrams$,
});
