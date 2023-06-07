import middy from "middy";

export const main = middy(async (event: any) => {
  console.log('invalid', event);
});