export const isStorageDefined = (type: "sessionStorage" | "localStorage") =>
  !!(typeof window !== "undefined" && window[type]);

export const parseIfJson = (value: string) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(value);
  } catch {
    // JSON 파싱에 실패하면 원래 값을 그대로 반환
    return value;
  }
};
