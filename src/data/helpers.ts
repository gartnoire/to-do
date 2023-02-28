type GenerateString = () => string;

export const generateId: GenerateString = () => {
  return (
    Math.random().toString(16).slice(2) + new Date().getTime().toString(36)
  );
};
