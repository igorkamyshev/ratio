<script>
  import {
    gramOnLiterView$,
    ratioTopView$,
    ratioBottomView$,
    coffeeInGramsView$,
    waterInGramsView$,
    onChangeGramOnLiter,
    onChangeRatioTop,
    onChangeRatioBottom,
    onChangeCoffeeInGrams,
    onChangeWaterInGrams,
  } from "./view-model";

  import { Input, Label, Heading, Hr } from "flowbite-svelte";
</script>

<main>
  <Heading class="mb-10">Coffee Ratio</Heading>

  <div class="grid gap-6 md:grid-cols-2 mb-10">
    <div>
      <Label for="coffeeInGrams" class="mb-2">Грамм зерен</Label>
      <Input
        type="number"
        id="coffeeInGrams"
        value={$coffeeInGramsView$}
        on:input={onChangeCoffeeInGrams}
      />
    </div>
    <div>
      <Label for="waterInGrams" class="mb-2">Грамм воды</Label>
      <Input
        type="number"
        id="waterInGrams"
        value={$waterInGramsView$}
        on:input={onChangeWaterInGrams}
      />
    </div>
  </div>

  <Hr />

  <div class="grid gap-6 md:grid-cols-2">
    <div>
      <Label for="gramOnLiter" class="mb-2">Грамм зерен на литр воды</Label>
      <Input
        type="number"
        id="gramOnLiter"
        value={$gramOnLiterView$}
        on:input={onChangeGramOnLiter}
      />
    </div>
    <div>
      <Label class="mb-2">Соотношение</Label>
      <div class="flex gap-2 items-center">
        <Input
          type="number"
          id="ratioTop"
          value={$ratioTopView$}
          on:input={onChangeRatioTop}
          disabled
        />
        <span> / </span>
        <Input
          type="number"
          id="rationBottom"
          value={$ratioBottomView$}
          on:input={onChangeRatioBottom}
        />
      </div>
    </div>
  </div>
</main>
