type ParamsObject = Record<string, string>;

export const parseStartappParam = (param: string): ParamsObject => {
  const paramsObj: ParamsObject = {};
  const keyValuePairs = param.split('+');

  keyValuePairs.forEach((pair) => {
    const [key, value] = pair.split('=');
    if (key && value) {
      paramsObj[key] = decodeURIComponent(value);
    }
  });

  return paramsObj;
};
