
export function createDeepCopy(arr: any[], type: any) {
  return arr.reduce((acc, item) => {
    acc.push(new type(item));
    return acc;
  }, [])
}
